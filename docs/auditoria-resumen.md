# Fase 1 - Auditoria de textos (inventario inicial)

- Fuente: `index.html` (318,777 bytes, 4,496 lineas)
- Entradas unicas (categoria + texto): **454**
- Ocurrencias totales: **505**
- Textos con tildes/caracteres del español: **67**
- Textos con variables dinamicas (`${...}` o `{var}`): **138**

## Conteo por categoria
| Categoria | Entradas unicas |
|-----------|----------------:|
| `js-string` | 234 |
| `html-texto` | 136 |
| `html-attr:title` | 68 |
| `html-attr:placeholder` | 10 |
| `html-attr:aria-label` | 6 |

## Ejemplos por categoria (primeros 15)

### `js-string`

- L1293: ${dev.y}px
- L1311: <div class="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border-2 ${getStatusBorderCl...
- L1485: cable-group cursor-pointer
- L1743: Fácil
- L1763: Difícil
- L1851: es-AR
- L1851: en-US
- L1856: <button onclick="startActivity(${i})" class="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 borde...
- L1864: ${lvlLabel(c.lvl)} · ${actTitle(c)}
- L1938: <span style="color:#10b981;font-weight:700">${escapeHtml(I18N.t('act.msg.solved', { student: currentStudent ? ', ' + ...
- L1939: <span style="color:#f43f5e;font-weight:700">❌ ${escapeHtml(I18N.t('act.msg.notYetLabel'))}</span> ${escapeHtml(I18N.t...
- L1944: 💡 ${escapeHtml(actHint(currentActivity))}
- L1946: 🔎 <b>${escapeHtml(I18N.t('act.msg.diagnosticLabel'))}</b> ${escapeHtml(fail.m)}
- L1954: <div class="space-y-3"> <label class="flex items-center gap-2 text-xs text-slate-200 cursor-pointer"><input id="dns-o...
- L1983: <div class="grid grid-cols-6 gap-2 items-center text-xs"><span class="col-span-2 text-slate-300">${I18N.t('dev.routes...

### `html-texto`

- L7: Simulador de Redes Educativo
- L316: NetSim Lab
- L320: Simulador de Redes Interactivo para Estudiantes
- L329: Mover / Seleccionar
- L334: Conectar Cable
- L339: Eliminar Cable
- L355: Entregar
- L360: Alumno
- L364: Actividades
- L368: Apoyar
- L373: Archivo
- L379: Guardar red…
- L382: Abrir red…
- L383: Exportar la red como…
- L387: Imagen PNG

### `html-attr:title`

- L326: Mover / Seleccionar
- L326: header.toolSelect
- L331: Conectar Cable
- L331: header.toolCable
- L336: Eliminar Cable
- L336: header.toolDeleteCable
- L342: Deshacer (Ctrl+Z)
- L342: header.undo
- L345: Rehacer (Ctrl+Y)
- L345: header.redo
- L354: Guardar tu trabajo con tu nombre para entregárselo al profe
- L354: header.deliverTitle
- L358: Tu nombre: queda guardado en las redes y actividades que guardes
- L358: header.studentTitle
- L363: Redes con fallas para resolver

### `html-attr:placeholder`

- L948: Ej: Ana Pérez
- L948: modal.student.placeholder
- L980: Ej: La PC de Secretaría no sale a Internet
- L980: modal.mkact.placeholderTitle
- L990: Ej: Desde ayer, nadie del laboratorio puede abrir la página del colegio.
- L990: modal.mkact.placeholderStory
- L993: Ej: Revisá la puerta de enlace de las PC.
- L993: modal.mkact.placeholderHint
- L1085: Ej: Red del aula
- L1085: modal.save.placeholder

### `html-attr:aria-label`

- L796: Modo de simulación
- L796: sim.modeLabel
- L813: Tipo de comunicación
- L813: sim.protocolLabel
- L838: Velocidad de la simulación
- L838: sim.speedLabel

## Textos con variables dinamicas (ejemplos)

- L1293 [js-string]: ${dev.y}px
- L1311 [js-string]: <div class="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border-2 ${getStatusBorderClass(statusColor)} sh...
- L1856 [js-string]: <button onclick="startActivity(${i})" class="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 h...
- L1864 [js-string]: ${lvlLabel(c.lvl)} · ${actTitle(c)}
- L1938 [js-string]: <span style="color:#10b981;font-weight:700">${escapeHtml(I18N.t('act.msg.solved', { student: currentStudent ? ', ' + currentStudent : '' ...
- L1939 [js-string]: <span style="color:#f43f5e;font-weight:700">❌ ${escapeHtml(I18N.t('act.msg.notYetLabel'))}</span> ${escapeHtml(I18N.t('act.msg.notYet', {...
- L1944 [js-string]: 💡 ${escapeHtml(actHint(currentActivity))}
- L1946 [js-string]: 🔎 <b>${escapeHtml(I18N.t('act.msg.diagnosticLabel'))}</b> ${escapeHtml(fail.m)}
- L1954 [js-string]: <div class="space-y-3"> <label class="flex items-center gap-2 text-xs text-slate-200 cursor-pointer"><input id="dns-online" type="checkbo...
- L1983 [js-string]: <div class="grid grid-cols-6 gap-2 items-center text-xs"><span class="col-span-2 text-slate-300">${I18N.t('dev.routesTab.toward', { name:
- L1983 [js-string]: })}</span><input id="if-ip-${id}" value="${escapeHtml(f.ip)}" placeholder="IP (ej: 192.168.1.1)" class="col-span-2 INP"><input id="if-mas...
- L1984 [js-string]: <p class="text-xs text-amber-400">${I18N.t('dev.routesTab.noNeighbors')}</p>
- L1986 [js-string]: <div class="space-y-4"> <div><h4 class="text-xs font-bold text-orange-400 mb-1">${I18N.t('dev.routesTab.interfaces')}</h4><p class="text-...
- L2027 [js-string]: ${netOf(f.ip, f.mask)}/${prefixFromMask(f.mask)}
- L2063 [js-string]: w-9 h-9 rounded-lg border flex items-center justify-center text-lg ${getDeviceIconColor(dev)} bg-slate-900 border-slate-700
- L2064 [js-string]: <i class="${getDeviceIconClass(dev)}"></i>
- L2147 [js-string]: <div class="space-y-4"> <p class="text-xs text-slate-400">${I18N.t('dev.layerTab.intro')}</p> <div class="grid grid-cols-2 gap-4"> <div o...
- L2178 [js-string]: <div class="space-y-4 text-xs"> <div class="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800"> <span class...
- L2215 [js-string]: <div class="space-y-4 text-xs"> <div class="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800"> <span...
- L2237 [js-string]: setWifiField(${dev.id}, 'wifiSsid', this.value)
- L2241 [js-string]: setWifiField(${dev.id}, 'wifiPass', this.value)
- L2254 [js-string]: dhcp-start-${dev.id}
- L2255 [js-string]: dhcp-end-${dev.id}
- L2274 [js-string]: <option value="${escapeHtml(d.ip)}">${escapeHtml(d.name)} (${escapeHtml(d.ip)})</option>
- L2276 [js-string]: <div class="space-y-3 text-xs"> <div class="rounded-lg bg-slate-950 border border-slate-800 p-3"><span class="text-slate-500">${I18N.t('d...

## Propuestos como NO traducir (CLI simulada de dispositivos)

- L2624: ipconfig - Muestra la dirección IP actual y puerta de enlace.
- L2625: ping [IP o nombre] - Diagnostica conectividad enviando paquetes ICMP.
- L2626: tracert [IP o nombre] - Muestra el camino salto por salto y dónde se corta.
- L2627: nslookup [nombre] - Consulta al servidor DNS qué IP tiene un nombre.
- L2629: clear - Limpia la pantalla de la consola.

## Terminos tecnicos detectados (mantener igual en todos los idiomas)

ARP, DHCP, DNS

## Decisiones pendientes (acordar antes de la Fase 2)

1. ¿Se traduce la salida de la consola/CLI simulada o se mantiene en inglés? (propuesta: mantener inglés, como equipos reales)
2. ¿Diccionarios en `lang/*.js` separados? (propuesta: sí, funciona con file://)
3. ¿El log de tráfico se guarda como claves + variables (cambia de idioma en vivo) o como texto fijo? (propuesta: claves + variables)
4. ¿Quién revisa cada idioma y con qué criterio de calidad?
5. ¿Dominio propio o URL pública al inicio? (ya existe despliegue público: simlabredes.vercel.app)
6. ¿Un único archivo distribuible o estructura con carpetas? (propuesta: index.html + carpeta lang/ al inicio)

## Proximos pasos

1. Revisar el CSV completo (`docs/auditoria-textos.csv`) y ajustar `decision_sugerida`.
2. Aprobar las decisiones pendientes de arriba.
3. Fase 2: disenar claves y estructura de `lang/` + funcion `t()` + atributo `data-i18n`.
