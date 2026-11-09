#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fase 1 - Auditoria de textos visibles para el usuario (plan de i18n).

Recorre index.html y genera:
  docs/auditoria-textos.csv   -> inventario: linea, categoria, texto, repeticiones, nota, decision
  docs/auditoria-resumen.md   -> estadisticas, ejemplos por categoria, textos con variables,
                                 propuestas de "no traducir" y decisiones pendientes.

Uso:  python tools/audit_texts.py
"""
import csv
import os
import re
from collections import Counter, OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "index.html")
OUT = os.path.join(ROOT, "docs")
os.makedirs(OUT, exist_ok=True)

with open(SRC, encoding="utf-8") as f:
    html = f.read()


def line_of(pos):
    return html.count("\n", 0, pos) + 1


def blank(m):
    """Reemplaza por espacios preservando longitud (mantiene posiciones)."""
    return " " * len(m.group(0))


# ---------------------------------------------------------------- bloques script/style
block_re = re.compile(r"<(script|style)\b[^>]*>.*?</\1\s*>", re.S | re.I)
blocks = [(m.start(), m.end(), m.group(1).lower()) for m in block_re.finditer(html)]

# HTML estatico con <script>/<style> y comentarios enmascarados
masked = html
for s, e, k in blocks:
    masked = masked[:s] + " " * (e - s) + masked[e:]
masked = re.sub(r"<!--.*?-->", blank, masked, flags=re.S)

rows = []  # dicts: pos, categoria, texto, nota


def add(pos, cat, text, note=""):
    rows.append({"pos": pos, "categoria": cat, "texto": text, "nota": note})


# ---------------------------------------------------------------- 1) HTML estatico: textos entre etiquetas
for m in re.finditer(r">([^<>]+)<", masked):
    t = re.sub(r"\s+", " ", m.group(1)).strip()
    if len(t) >= 2 and re.search(r"[A-Za-zÁÉÍÓÚÑáéíóúñ¿¡]", t):
        add(m.start(), "html-texto", t)

# ---------------------------------------------------------------- 2) HTML estatico: atributos traducibles
for attr in ("title", "placeholder", "aria-label", "alt"):
    for m in re.finditer(r"\b" + attr + r'\s*=\s*"([^"]*)"', masked):
        t = m.group(1).strip()
        if t:
            add(m.start(), "html-attr:" + attr, t)
    for m in re.finditer(r"\b" + attr + r"\s*=\s*'([^']*)'", masked):
        t = m.group(1).strip()
        if t:
            add(m.start(), "html-attr:" + attr, t)
# ---------------------------------------------------------------- 3) JavaScript: strings con pinta de UI
PAL_ES = re.compile(
    r"[áéíóúñ¿¡ÁÉÍÓÚÑ]|\b(el|la|los|las|de|del|un|una|para|por|con|sin|en|que|se|su|al|y|o|es|son|este|esta|"
    r"agregar|eliminar|guardar|cargar|conectar|desconectar|dispositivo|red|tabla|servidor|cable|puerto|dirección|"
    r"error|aviso|alerta|confirmar|cancelar|aceptar|cerrar|abrir|iniciar|detener|exportar|importar|restablecer|"
    r"configurar|nombre|tipo|estado|acciones|herramienta|modo|tema|claro|oscuro|tour|paso|anterior|siguiente|"
    r"finalizar|comenzar|bienvenido|ayuda|versión|autor|licencia|descargar|archivo|actividad|alumno|docente|"
    r"entregar|corregir|calificar|ejercicio|topología|simular|simulación|tráfico|paquete|ping|respuesta|"
    r"solicitud|latencia|recibidos|enviados|interfaz|máscara|gateway|puerta|dns|dhcp|arp|mac|vlan|switch|"
    r"router|conexión|ver|ocultar|mostrar|seleccionar|mover|zoom|limpiar|sí|no|todo|buscar|copiar|duplicar|"
    r"renombrar|propiedades|configuración|capa|capas|osi|trama|protocolo|enlace|clic|click|crear|nuevo|"
    r"conectado|desconectado|asignada|solicitar|responder|enviar|recibir|difusión|broadcast|dominio|registro|"
    r"caché|lease|concesión|pool|rango|disponible|libre|manual|automática|correcto|inválido|válido|requerido|"
    r"selecciona|ingresar|escribir|cableado|inalámbrico|paquetes|redes)\b",
    re.I,
)


def looks_ui(s):
    if len(s) < 2:
        return False
    if s.startswith(("http", "data:", "#", ".", "/", "C:", "\\", "function", "return")):
        return False
    if re.fullmatch(r"[\W\d_]+", s):
        return False
    if s.startswith((".", "#", ">", ":", "[", "*")):
        return False
    if "/" in s and " " not in s:
        return False
    if not re.search(r"[A-Za-zÁÉÍÓÚÑáéíóúñ]", s):
        return False
    if re.fullmatch(r"[a-z0-9\-]+", s):  # id, clase css o clave interna en minuscula
        return False
    if PAL_ES.search(s):
        return True
    if " " in s and re.search(r"[A-ZÁÉÍÓÚÑáéíóúñ¿¡]", s):
        return True
    return False


string_re = re.compile(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`((?:[^`\\]|\\.)*)`", re.S)

js_strings = []  # (pos_global, texto, nota)
for s, e, k in blocks:
    if k != "script":
        continue
    code = html[s:e]
    code = re.sub(r"/\*.*?\*/", blank, code, flags=re.S)
    code = re.sub(r"//[^\n]*", blank, code)
    for m in string_re.finditer(code):
        raw = next(g for g in m.groups() if g is not None)
        txt = raw.replace("\\n", " ").replace("\\t", " ").replace("\\'", "'").replace('\\"', '"')
        txt = re.sub(r"\s+", " ", txt).strip()
        if looks_ui(txt):
            note = []
            if "${" in raw or re.search(r"\{[a-zA-Z_]+\}", raw):
                note.append("variables-dinamicas")
            clean = re.sub(r"\$\{[^}]*\}|\{[a-zA-Z_]+\}", "", txt).strip()
            if (("${" in raw or re.search(r"\{[a-zA-Z_]+\}", raw)) and " " not in clean) \
                    or txt.endswith(("px", "%", "rem", "em")) \
                    or re.fullmatch(r"[a-z]{2,3}-[A-Z]{2}(-[A-Za-z0-9]+)?", txt):  # locale tipo es-AR
                note.append("posible-identificador-o-estilo")
            if "<" in txt and ">" in txt:
                note.append("contiene-HTML")
            js_strings.append((s + m.start(), txt, " ".join(note)))

# dialogos nativos alert/confirm/prompt: reclasificar el string mas cercano
for m in re.finditer(r"\b(alert|confirm|prompt)\s*\(", html):
    best = None
    for pos, txt, note in js_strings:
        if pos >= m.end() and (best is None or pos < best[0]):
            best = (pos, txt, note)
    if best and best[0] - m.end() < 300:
        js_strings = [
            (p, t, (n + "|dialogo-nativo") if (p, t) == (best[0], best[1]) else n)
            for (p, t, n) in js_strings
        ]

for pos, txt, note in js_strings:
    add(pos, "js-string", txt, note)

# ---------------------------------------------------------------- 4) clasificacion y decisiones propuestas
# case-sensitive a propósito: los comandos reales de la CLI van en minuscula;
# asi no se confunden con mensajes de la interfaz que empiezan con mayuscula ("IP o máscara inválida...")
CLI_RE = re.compile(
    r"^(show|ping|ip |ipconfig|ifconfig|arp |traceroute|tracert|nslookup|telnet|ssh|enable|disable|conf |"
    r"configure|hostname|do |exit|end|interface|vlan |copy|write|erase|debug|terminal|monitor|reload|"
    r"shutdown|netstat|route |dig|curl|wget|whoami|echo |cd |dir|cls|clear)\b"
)
TECH_ONLY = re.compile(
    r"^(ARP|DHCP|DNS|MAC|VLAN|IP|IPv4|IPv6|HTTP|HTTPS|VPN|ICMP|OSI|TCP|UDP|FTP|SSH|TTL|LAN|WAN|WiFi|SSID|"
    r"WPA\d?|URL|ID|Gateway|PC|Switch|Router|Server|Host)$", re.I,
)

agrup = OrderedDict()
for r in sorted(rows, key=lambda x: x["pos"]):
    key = (r["categoria"], r["texto"])
    if key not in agrup:
        decision = "pendiente"
        t = r["texto"]
        if "posible-identificador-o-estilo" in r["nota"]:
            decision = "interno/estilo - NO traducir"
        elif r["categoria"] == "js-string" and CLI_RE.match(t):
            decision = "NO traducir (CLI simulada) - propuesta"
        elif TECH_ONLY.match(t.strip()):
            decision = "mantener termino tecnico"
        elif r["categoria"].startswith("html-attr:"):
            decision = "traducir"
        else:
            decision = "traducir (revisar)"
        agrup[key] = {
            "linea": line_of(r["pos"]), "categoria": r["categoria"], "texto": r["texto"],
            "repeticiones": 0, "nota": r["nota"], "decision": decision,
        }
    agrup[key]["repeticiones"] += 1
    if r["nota"] and r["nota"] not in agrup[key]["nota"]:
        agrup[key]["nota"] = (agrup[key]["nota"] + "|" + r["nota"]).strip("|")

# ---------------------------------------------------------------- 5) CSV
csv_path = os.path.join(OUT, "auditoria-textos.csv")
with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(["linea", "categoria", "texto_original", "repeticiones", "nota", "decision_sugerida"])
    for v in agrup.values():
        w.writerow([v["linea"], v["categoria"], v["texto"], v["repeticiones"], v["nota"], v["decision"]])

# ---------------------------------------------------------------- 6) Resumen Markdown
cats = Counter(v["categoria"] for v in agrup.values())
con_tilde = [v for v in agrup.values() if re.search(r"[áéíóúñ¿¡ÁÉÍÓÚÑ]", v["texto"])]
con_var = [v for v in agrup.values() if "variables-dinamicas" in v["nota"]]
cli = [v for v in agrup.values() if "CLI" in v["decision"]]
tech = [v for v in agrup.values() if v["decision"] == "mantener termino tecnico"]

md = []
md.append("# Fase 1 - Auditoria de textos (inventario inicial)\n")
md.append(f"- Fuente: `index.html` ({len(html):,} bytes, {html.count(chr(10)) + 1:,} lineas)")
md.append(f"- Entradas unicas (categoria + texto): **{len(agrup)}**")
md.append(f"- Ocurrencias totales: **{sum(v['repeticiones'] for v in agrup.values())}**")
md.append(f"- Textos con tildes/caracteres del español: **{len(con_tilde)}**")
md.append(f"- Textos con variables dinamicas (`${{...}}` o `{{var}}`): **{len(con_var)}**\n")

md.append("## Conteo por categoria\n| Categoria | Entradas unicas |\n|-----------|----------------:|")
for c, n in cats.most_common():
    md.append(f"| `{c}` | {n} |")
md.append("\n## Ejemplos por categoria (primeros 15)\n")
for c, _ in cats.most_common():
    md.append(f"### `{c}`\n")
    for v in [x for x in agrup.values() if x["categoria"] == c][:15]:
        t = v["texto"] if len(v["texto"]) <= 120 else v["texto"][:117] + "..."
        md.append(f"- L{v['linea']}: {t}")
    md.append("")

md.append("## Textos con variables dinamicas (ejemplos)\n")
for v in con_var[:25]:
    t = v["texto"] if len(v["texto"]) <= 140 else v["texto"][:137] + "..."
    md.append(f"- L{v['linea']} [{v['categoria']}]: {t}")
md.append("\n## Propuestos como NO traducir (CLI simulada de dispositivos)\n")
for v in cli[:40]:
    t = v["texto"] if len(v["texto"]) <= 120 else v["texto"][:117] + "..."
    md.append(f"- L{v['linea']}: {t}")
md.append("\n## Terminos tecnicos detectados (mantener igual en todos los idiomas)\n")
md.append(", ".join(sorted({v["texto"].strip() for v in tech})) + "\n")

md.append("## Decisiones pendientes (acordar antes de la Fase 2)\n")
md.append("1. ¿Se traduce la salida de la consola/CLI simulada o se mantiene en inglés? (propuesta: mantener inglés, como equipos reales)")
md.append("2. ¿Diccionarios en `lang/*.js` separados? (propuesta: sí, funciona con file://)")
md.append("3. ¿El log de tráfico se guarda como claves + variables (cambia de idioma en vivo) o como texto fijo? (propuesta: claves + variables)")
md.append("4. ¿Quién revisa cada idioma y con qué criterio de calidad?")
md.append("5. ¿Dominio propio o URL pública al inicio? (ya existe Netlify: simlabredes.netlify.app)")
md.append("6. ¿Un único archivo distribuible o estructura con carpetas? (propuesta: index.html + carpeta lang/ al inicio)\n")
md.append("## Proximos pasos\n")
md.append("1. Revisar el CSV completo (`docs/auditoria-textos.csv`) y ajustar `decision_sugerida`.")
md.append("2. Aprobar las decisiones pendientes de arriba.")
md.append("3. Fase 2: disenar claves y estructura de `lang/` + funcion `t()` + atributo `data-i18n`.")

md_path = os.path.join(OUT, "auditoria-resumen.md")
with open(md_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md) + "\n")

# ---------------------------------------------------------------- 7) consola
print(f"OK -> {csv_path} ({len(agrup)} entradas unicas)")
print(f"OK -> {md_path}")
print("\nPor categoria:")
for c, n in cats.most_common():
    print(f"  {c:28s} {n}")
print(f"\nCon tildes (español): {len(con_tilde)} | Con variables: {len(con_var)} | CLI no-traducir: {len(cli)} | Tecnicos: {len(tech)}")

