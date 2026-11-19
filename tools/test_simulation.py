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
  4. Cables (Cat 5 a 7, UTP/STP, fibra): velocidad real, alcance, puertos de fibra, interferencia, actividades de cableado
     y la ventana de propiedades del cable (doble clic).
  5. Sin errores de JavaScript.
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

    # ---- Cables: tipo, velocidad, alcance y puertos ----
    for mode in ('advanced', 'simple'):
        pg.evaluate("loadDemoTwoNetworks(); renderDevices(); renderCables(); updateTrafficSelectors(); document.getElementById('traffic-mode').value = '%s'; applySimMode(false)" % mode)
        def link(a, b, cable):
            return pg.evaluate("""([a, b, cable]) => { const A = state.devices.find(d => d.name === a), B = state.devices.find(d => d.name === b); const c = connBetween(A.id, B.id);
                c.cable = cable; const li = linkInfo(c); return { speed: li.speed, reason: li.reason, limit: li.limit }; }""", [a, b, cable])
        CASES = [  # (extremo A, extremo B, cable, velocidad esperada, motivo de caída)
            ('PC_A1', 'Switch_A', {'type': 'cat5', 'length': 10}, 100, None),
            ('PC_A1', 'Switch_A', {'type': 'cat5e', 'length': 10}, 1000, None),
            ('PC_A1', 'Switch_A', {'type': 'cat6', 'length': 30}, 1000, None),      # 10G del cable, pero el puerto del PC es de 1G
            ('PC_A1', 'Switch_A', {'type': 'cat6', 'length': 150}, 0, 'tooLong'),
            ('PC_A1', 'Switch_A', {'type': 'fiberSM', 'length': 10}, 0, 'noFiberPort'),  # el PC no tiene puerto de fibra
            ('PC_A1', 'Switch_A', {'type': 'cat6', 'length': 25, 'interference': True}, 10, None),
            ('PC_A1', 'Switch_A', {'type': 'cat6', 'length': 25, 'interference': True, 'shield': 'stp'}, 1000, None),
            ('PC_A1', 'Switch_A', {'type': 'cat7', 'length': 25, 'interference': True}, 1000, None),
            ('Router_Central', 'Switch_A', {'type': 'cat6a', 'length': 80}, 1000, None),   # cobre: los puertos son de 1G
            ('Router_Central', 'Switch_A', {'type': 'fiberMM', 'length': 250}, 10000, None),
            ('Router_Central', 'Switch_A', {'type': 'fiberMM', 'length': 350}, 0, 'tooLong'),
            ('Router_Central', 'Switch_A', {'type': 'fiberSM', 'length': 5000}, 10000, None),
        ]
        for ea, eb, cable, speed, reason in CASES:
            r = link(ea, eb, cable)
            check(r['speed'] == speed and r['reason'] == reason, f"[{mode}] cable {cable} entre {ea} y {eb}: esperado {speed} Mbps/{reason} y fue {r}")
        pg.evaluate("loadDemoTwoNetworks(); renderDevices(); renderCables();")
    # un cable demasiado largo corta el camino; con fibra vuelve a funcionar
    pg.evaluate("loadDemoTwoNetworks(); renderDevices(); renderCables(); updateTrafficSelectors(); document.getElementById('traffic-mode').value = 'advanced'; applySimMode(false)")
    ids = pg.evaluate("Object.fromEntries(state.devices.map(d => [d.name, d.id]))")
    pg.evaluate("([a, b]) => { connBetween(a, b).cable = { type: 'cat6', length: 150 }; reevaluateNetworkState(); }", [ids['Router_Central'], ids['Switch_B']])
    r = pg.evaluate(RUN, [ids['PC_A1'], ids['PC_B1'], 'ICMP']); check(not r['ok'] and 'Router_Central' in r['red'] and 'Switch_B' in r['red'], f"cable de 150 m: debe fallar y marcar sus dos extremos ({r})")
    pg.evaluate("([a, b]) => { connBetween(a, b).cable = { type: 'fiberSM', length: 150 }; reevaluateNetworkState(); }", [ids['Router_Central'], ids['Switch_B']])
    r = pg.evaluate(RUN, [ids['PC_A1'], ids['PC_B1'], 'ICMP']); check(r['ok'], 'con fibra el enlace de 150 m debe funcionar')
    # actividades de cableado: empiezan fallando, el mensaje dice la causa y se resuelven con el arreglo indicado
    SW = lambda a, b, cab: "{ const n = window.__n; connBetween(n.%s.id, n.%s.id).cable = %s; reevaluateNetworkState(); }" % (a, b, cab)
    CAB_STEPS = {
        24: [('Cat 5', SW('swA', 'a1', "{ type: 'cat5e', length: 10 }"))],
        25: [('mide 150 m', SW('r', 'swB', "{ type: 'fiberSM', length: 150 }"))],
        26: [('interferencia', SW('swA', 'a2', "{ type: 'cat6', length: 25, interference: true, shield: 'stp' }"))],
        27: [('mide 150 m', SW('r', 'swB', "{ type: 'fiberSM', length: 150 }")), ('interferencia', SW('swB', 'b1', "{ type: 'cat6', length: 25, interference: true, shield: 'stp' }")), ('Cat 5', SW('swA', 'a1', "{ type: 'cat5e', length: 10 }"))],
    }
    for mode in ('advanced', 'simple'):
        for idx, steps in CAB_STEPS.items():
            pg.evaluate("i => { const g = ACTIVITIES[i].build(); const ids = Object.fromEntries(state.devices.map(d => [d.name, d]));"
                        " window.__n = { r: ids.Router_Central, swA: ids.Switch_A, swB: ids.Switch_B, a1: ids.PC_A1, a2: ids.PC_A2, b1: ids.PC_B1 };"
                        " renderDevices(); renderCables(); updateTrafficSelectors(); document.getElementById('traffic-mode').value = '%s'; applySimMode(false);"
                        " window.__g = g.map(([a, b, s]) => [a.id, b.id, s]); }" % mode, idx)
            for n, (expected, fix) in enumerate(steps):
                f = pg.evaluate("(() => { const f = failureFor(window.__g); return f ? f.m : null; })()")
                check(f is not None and expected in f, f"[{mode}] actividad {idx + 1}, paso {n + 1}: el mensaje debía contener «{expected}» y fue: {f}")
                pg.evaluate(fix)
            f = pg.evaluate("(() => { const f = failureFor(window.__g); return f ? f.m : null; })()")
            check(f is None, f"[{mode}] actividad {idx + 1}: tras los arreglos todavía falla: {f}")
            r = pg.evaluate(RUN, [pg.evaluate("window.__g[0][0]"), pg.evaluate("window.__g[0][1]"), 'ICMP']); check(r['ok'], f"[{mode}] actividad {idx + 1}: la simulación debía funcionar tras los arreglos")
    # interfaz: el doble clic abre la ventana del cable, un clic simple no borra
    pg.evaluate("loadDemoTwoNetworks(); renderDevices(); renderCables();")
    n0 = pg.evaluate("state.connections.length")
    pg.evaluate("setToolMode('select')")
    pg.dispatch_event('#network-svg g:has(line[stroke]) >> nth=0', 'click')
    check(pg.evaluate("state.connections.length") == n0, 'un clic simple sobre un cable no debe eliminarlo')
    pg.dispatch_event('#network-svg g:has(line[stroke]) >> nth=0', 'dblclick')
    check(pg.evaluate("!!document.getElementById('cable-modal')"), 'el doble clic sobre el cable debe abrir la ventana de propiedades')
    pg.evaluate("document.getElementById('tour-overlay')?.remove(); typeof endTour === 'function' && endTour()")
    pg.select_option('#cb-type', 'cat6a'); pg.fill('#cb-len', '40'); pg.click("#cable-modal button:has-text('Aplicar')", force=True)
    check(pg.evaluate("!document.getElementById('cable-modal') && state.connections.some(c => c.cable && c.cable.type === 'cat6a' && c.cable.length === 40)"), 'Aplicar debe guardar el tipo y la longitud del cable')
    check(not errs, 'errores de JavaScript: ' + '; '.join(errs[:3]))
    b.close()

if problems:
    print(f'FALLARON {len(problems)} comprobaciones:'); [print('  -', m) for m in problems[:40]]; sys.exit(1)
print(f'OK: {total} simulaciones coherentes con diagnose(), falla bien atribuida, sin errores de JavaScript.')
