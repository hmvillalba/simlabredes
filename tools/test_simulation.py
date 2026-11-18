#!/usr/bin/env python3
"""
Prueba de la lógica de simulación (necesita un navegador: pip install playwright && playwright install chromium).

    python3 tools/test_simulation.py

Qué comprueba, abriendo index.html con file:// y sin internet:
  1. Coherencia: para TODOS los pares de equipos de varias redes y de las actividades integradas,
     el resultado de la simulación (modo simple y avanzado) coincide con diagnose().
  2. Atribución: la falla se le marca al equipo que está mal, no al que origina el ping
     (caso del PC con IP fija en otra red que la del router WiFi).
  3. Actividades de fallas físicas (cable dañado, adaptador WiFi, contraseña): empiezan fallando, el diagnóstico
     dice la causa correcta, se resuelven con el arreglo indicado y después la simulación funciona.
  4. Sin errores de JavaScript.
Sale con código distinto de 0 si algo falla.
"""
import json, pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
FAST = """() => { window.animateFor = (ms, token, fn) => new Promise(r => { if (token !== trafficRunToken) return r(false); try { fn(1) } catch (e) {} r(true); });
  window.__red = []; const o = window.pulseDevice; window.pulseDevice = function (d, c, ms, t) { if (c === '#f43f5e') window.__red.push(d.name); return o(d, c, ms, t); }; }"""
WIFI_LAN = """([ip, gw]) => { state.devices = []; state.connections = []; state.nextDeviceId = 1;
  const r = createDevice('router', 300, 80); r.name = 'Router_WiFi_1'; const pc = createDevice('pc', 100, 300); pc.name = 'PC_Alumno_3';
  const nb = createDevice('laptop', 500, 250); nb.name = 'Notebook_2';
  state.connections.push({ from: r.id, to: pc.id, type: 'ethernet' }, { from: r.id, to: nb.id, type: 'wifi' });
  nb.connectedWifiSsid = r.wifiSsid; nb.wifiAuthenticated = true; pc.ipMode = 'static'; pc.ip = ip; pc.gateway = gw; reevaluateNetworkState(); }"""
RUN = """async ([s, d, proto]) => { window.__red.length = 0;
  document.getElementById('traffic-source').value = s; document.getElementById('traffic-destination').value = d; document.getElementById('traffic-protocol').value = proto;
  await startTrafficSimulation(); const S = state.devices.find(x => x.id === s), D = state.devices.find(x => x.id === d);
  return { ok: document.getElementById('traffic-status').textContent.startsWith('COMPLETADO'), diag: diagnose(S, D), red: window.__red.slice() }; }"""

problems = []
def check(cond, msg):
    if not cond: problems.append(msg)

def pairs(pg, label, mode):
    pg.evaluate("renderDevices(); renderCables(); updateTrafficSelectors(); document.getElementById('traffic-mode').value = %s; applySimMode(false)" % json.dumps(mode))
    devs = pg.evaluate("state.devices.map(d => [d.id, d.name])"); n = 0
    for s, sn in devs:
        for d, dn in devs:
            if s == d: continue
            r = pg.evaluate(RUN, [s, d, 'ICMP']); n += 1
            check(r['ok'] == (r['diag'] is None), f"[{mode}] {label}: {sn} -> {dn}: simulación={'OK' if r['ok'] else 'FALLA'} pero diagnose={'OK' if r['diag'] is None else 'FALLA'}")
    return n

with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(offline=True, locale='es', viewport={'width': 1440, 'height': 900}); pg = ctx.new_page()
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + str(ROOT / 'index.html')); pg.wait_for_timeout(800); pg.evaluate(FAST)
    total = 0
    for mode in ('advanced', 'simple'):
        for label, code in (('demo', 'loadDemoTopology()'), ('dos redes', 'loadDemoTwoNetworks()')):
            pg.evaluate(code); total += pairs(pg, label, mode)
        for ip, gw in (('192.168.1.11', '192.168.1.1'), ('192.168.0.11', '0.0.0.0'), ('192.168.0.11', '192.168.0.1')):
            pg.evaluate(WIFI_LAN, [ip, gw]); total += pairs(pg, f'router WiFi + PC {ip} gw {gw}', mode)
        for i in range(pg.evaluate("ACTIVITIES.length")):
            res = pg.evaluate("""async ([i, mode, RUN]) => { const ps = ACTIVITIES[i].build(); renderDevices(); renderCables(); updateTrafficSelectors();
                document.getElementById('traffic-mode').value = mode; applySimMode(false); const v = document.getElementById('traffic-vpn'); if (v) v.checked = (i >= 12 && i <= 17);
                const out = []; for (const [s, d] of ps) out.push([s.id, d.id]); return out; }""", [i, mode, RUN])
            for s, d in res:
                r = pg.evaluate("""async ([s, d]) => { window.__red.length = 0; document.getElementById('traffic-source').value = s; document.getElementById('traffic-destination').value = d; document.getElementById('traffic-protocol').value = 'ICMP';
                    await startTrafficSimulation(); return document.getElementById('traffic-status').textContent.startsWith('COMPLETADO'); }""", [s, d])
                total += 1
            pg.evaluate("{ const v = document.getElementById('traffic-vpn'); if (v) v.checked = false; }")
        # Atribución de la falla (caso del usuario)
        pg.evaluate(WIFI_LAN, ['192.168.0.11', '0.0.0.0']); pg.evaluate("renderDevices(); renderCables(); updateTrafficSelectors(); document.getElementById('traffic-mode').value = %s; applySimMode(false)" % json.dumps(mode))
        ids = pg.evaluate("Object.fromEntries(state.devices.map(d => [d.name, d.id]))")
        for src, dst in (('Notebook_2', 'PC_Alumno_3'), ('PC_Alumno_3', 'Notebook_2'), ('Router_WiFi_1', 'PC_Alumno_3'), ('PC_Alumno_3', 'Router_WiFi_1')):
            r = pg.evaluate(RUN, [ids[src], ids[dst], 'ICMP'])
            check(not r['ok'], f"[{mode}] {src} -> {dst} debería fallar (PC fuera de la red del router)")
            check(r['red'] == ['PC_Alumno_3'], f"[{mode}] {src} -> {dst}: la falla debe marcarse en PC_Alumno_3, no en {r['red']}")
        for src, dst in (('Notebook_2', 'Router_WiFi_1'), ('Router_WiFi_1', 'Notebook_2')):
            r = pg.evaluate(RUN, [ids[src], ids[dst], 'ICMP']); check(r['ok'], f"[{mode}] {src} -> {dst} debe funcionar: el WiFi no tiene nada mal")
        # el cable/equipo avisa aunque el enlace físico esté bien
        check(pg.evaluate("!!lanMismatch(state.devices.find(d => d.name === 'PC_Alumno_3'))"), 'lanMismatch debe detectar el PC fuera de la red del router')
        check(pg.evaluate("!lanMismatch(state.devices.find(d => d.name === 'Notebook_2'))"), 'lanMismatch no debe marcar la notebook (está bien)')

    # ---- Actividades de fallas físicas: cada una debe empezar fallando, mostrar el diagnóstico correcto y poder resolverse ----
    NB = "state.devices.find(d => d.name === 'Notebook_2')"; PCA = "state.devices.find(d => d.name === 'PC_Alumno_3')"
    FIX_CABLE = "{ const c = state.connections.find(c => c.broken); setCableBroken(c.from, c.to, false); }"
    FIX_WIFI = "setWifiAdapter(%s.id, true)" % NB
    FIX_IP = "{ const pc = %s; pc.ipMode = 'dhcp'; reevaluateNetworkState(); }" % PCA
    FIX_PASS = "{ const nb = %s, r = state.devices.find(d => d.type === 'router'); window.prompt = () => r.wifiPass; connectWifi(nb.id, r.wifiSsid); }" % NB
    ACT_STEPS = {
        18: [('dañado', FIX_CABLE)],
        19: [('no es de la red de', FIX_IP)],
        20: [('adaptador WiFi apagado', FIX_WIFI)],
        21: [('no está conectado a ninguna red WiFi', FIX_PASS)],
        22: [('dañado', FIX_CABLE)],
        23: [('adaptador WiFi apagado', FIX_WIFI), ('dañado', FIX_CABLE), ('no es de la red de', FIX_IP)],
    }
    check(pg.evaluate("ACTIVITIES.length") >= 24, 'faltan las actividades nuevas (se esperaban al menos 24)')
    for mode in ('advanced', 'simple'):
        for idx, steps in ACT_STEPS.items():
            goals = pg.evaluate("i => { window.dialogs = 0; const g = ACTIVITIES[i].build(); renderDevices(); renderCables(); updateTrafficSelectors(); document.getElementById('traffic-mode').value = '%s'; applySimMode(false); window.__g = g; return g.map(([a, b]) => [a.id, b.id]); }" % mode, idx)
            for n, (expected, fix) in enumerate(steps):
                msg = pg.evaluate("window.__g.map(([a, b]) => diagnose(a, b)).find(Boolean) || null")
                check(msg is not None and expected in msg, f"[{mode}] actividad {idx + 1}, paso {n + 1}: el diagnóstico debía contener «{expected}» y fue: {msg}")
                r = pg.evaluate(RUN, [goals[0][0], goals[0][1], 'ICMP'])
                check(not r['ok'], f"[{mode}] actividad {idx + 1}, paso {n + 1}: la simulación debía fallar antes de arreglar")
                pg.evaluate(fix)
            msg = pg.evaluate("window.__g.map(([a, b]) => diagnose(a, b)).find(Boolean) || null")
            check(msg is None, f"[{mode}] actividad {idx + 1}: tras los arreglos todavía falla: {msg}")
            r = pg.evaluate(RUN, [goals[0][0], goals[0][1], 'ICMP'])
            check(r['ok'], f"[{mode}] actividad {idx + 1}: tras los arreglos la simulación debía funcionar")
        # un cable dañado se marca en rojo en sus dos extremos y el resto de la red sigue andando
        pg.evaluate("ACTIVITIES[18].build(); renderDevices(); renderCables(); updateTrafficSelectors();")
        ids = pg.evaluate("Object.fromEntries(state.devices.map(d => [d.name, d.id]))")
        r = pg.evaluate(RUN, [ids['PC_A1'], ids['PC_A2'], 'ICMP']); check(sorted(r['red']) == sorted(['PC_A2', 'Switch_A']), f"[{mode}] cable dañado: deben marcarse sus dos extremos y fue {r['red']}")
        r = pg.evaluate(RUN, [ids['PC_A1'], ids['PC_B1'], 'ICMP']); check(r['ok'], f"[{mode}] un cable dañado en PC_A2 no debe afectar a PC_A1 -> PC_B1")
    check(not errs, 'errores de JavaScript: ' + '; '.join(errs[:3]))
    b.close()

if problems:
    print(f'FALLARON {len(problems)} comprobaciones:'); [print('  -', m) for m in problems[:40]]; sys.exit(1)
print(f'OK: {total} simulaciones coherentes con diagnose(), falla bien atribuida, sin errores de JavaScript.')
