# Fase 1 - Auditoria de textos (inventario inicial)

- Fuente: `index.html` (312,589 bytes, 4,380 lineas)
- Entradas unicas (categoria + texto): **757**
- Ocurrencias totales: **844**
- Textos con tildes/caracteres del español: **295**
- Textos con variables dinamicas (`${...}` o `{var}`): **295**

## Conteo por categoria
| Categoria | Entradas unicas |
|-----------|----------------:|
| `js-string` | 583 |
| `html-texto` | 133 |
| `html-attr:title` | 33 |
| `html-attr:placeholder` | 5 |
| `html-attr:aria-label` | 3 |

## Ejemplos por categoria (primeros 15)

### `js-string`

- L1144: Modo Cable: Haz clic en dos dispositivos para conectarlos
- L1152: Modo Eliminar Cable: Haz clic sobre cualquier cable en la pantalla para cortarlo
- L1215: Internet (ISP)
- L1225: Dispositivo agregado: ${device.name}
- L1255: ${dev.y}px
- L1273: <div class="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border-2 ${getStatusBorderCl...
- L1296: Haz clic directamente en la línea del cable para eliminarlo
- L1377: Dispositivo origen seleccionado. Elige el destino.
- L1380: No puedes conectar un dispositivo a sí mismo
- L1392: Ya existe un enlace entre estos equipos
- L1399: Conexión física realizada con éxito
- L1424: Cable/Conexión eliminada correctamente
- L1447: cable-group cursor-pointer
- L1628: IP o máscara inválida. Usa una dirección de host y una máscara contigua.
- L1630: Esa dirección IP ya está asignada a otro dispositivo.

### `html-texto`

- L7: Simulador de Redes Educativo
- L284: NetSim Lab
- L288: Simulador de Redes Interactivo para Estudiantes
- L298: Mover / Seleccionar
- L303: Conectar Cable
- L308: Eliminar Cable
- L324: Entregar
- L329: Alumno
- L333: Actividades
- L337: Apoyar
- L342: Archivo
- L348: Guardar red…
- L351: Abrir red…
- L352: Exportar la red como…
- L356: Imagen PNG

### `html-attr:title`

- L295: Mover / Seleccionar
- L300: Conectar Cable
- L305: Eliminar Cable
- L311: Deshacer (Ctrl+Z)
- L314: Rehacer (Ctrl+Y)
- L323: Guardar tu trabajo con tu nombre para entregárselo al profe
- L327: Tu nombre: queda guardado en las redes y actividades que guardes
- L332: Redes con fallas para resolver
- L336: Acerca del simulador y apoyar al autor
- L367: Descarga una versión de este simulador que funciona sin internet (hace falta conexión una sola vez)
- L385: VPN dentro de la red de la oficina: para llegar desde afuera hay que abrir un puerto en el router
- L390: Casa y oficina, cada una con su router e Internet, unidas por una VPN en la nube
- L395: Dos redes unidas por un router con varias interfaces
- L432: Pantalla completa con textos grandes (Esc para salir)
- L598: Acerca de este simulador

### `html-attr:placeholder`

- L906: Ej: Ana Pérez
- L938: Ej: La PC de Secretaría no sale a Internet
- L948: Ej: Desde ayer, nadie del laboratorio puede abrir la página del colegio.
- L951: Ej: Revisá la puerta de enlace de las PC.
- L1043: Ej: Red del aula

### `html-attr:aria-label`

- L754: Modo de simulación
- L771: Tipo de comunicación
- L796: Velocidad de la simulación

## Textos con variables dinamicas (ejemplos)

- L1225 [js-string]: Dispositivo agregado: ${device.name}
- L1255 [js-string]: ${dev.y}px
- L1273 [js-string]: <div class="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border-2 ${getStatusBorderClass(statusColor)} sh...
- L1650 [js-string]: ${src.name} no llega al servidor DNS (${dnsDev.name}): ${m}
- L1651 [js-string]: El servidor DNS ${dnsDev.name} está apagado.
- L1653 [js-string]: El servidor DNS ${dnsDev.name} no conoce el nombre ${site}.
- L1655 [js-string]: El nombre ${site} apunta a ${ip}, que no pertenece a ningún equipo.
- L1656 [js-string]: El nombre ${site} apunta a ${owner.name} (${ip}), pero la página está en ${dst.name}.
- L1660 [js-string]: ${d.name} no obtuvo IP: ningún servidor DHCP le respondió (quedó con una dirección automática 169.254.x.x).
- L1663 [js-string]: No hay camino físico entre ${src.name} y ${dst.name}: falta un cable.
- L1666 [js-string]: ${d.name} y ${o.name} tienen la misma IP (${d.ip}).
- L1670 [js-string]: La dirección ${dst.ip} es privada: desde otra red, Internet no sabe llegar a ella. Para comunicar redes distintas hace falta una VPN (o u...
- L1672 [js-string]: ${src.name} y ${dst.name} no coinciden en si están en la misma red: las máscaras de subred son distintas.
- L1676 [js-string]: ${a.name} no tiene ninguna ruta hacia ${b.ip}.
- L1678 [js-string]: ${a.name} no tiene puerta de enlace: no sabe salir de su red.
- L1680 [js-string]: La puerta de enlace de ${a.name} (${a.gateway}) no existe en la red.
- L1681 [js-string]: La puerta de enlace ${a.gateway} no está en la misma red que ${a.name} (${a.ip}): revisá su IP y su máscara.
- L1682 [js-string]: El camino de ${a.name} no pasa por su puerta de enlace ${gw.name}.
- L1687 [js-string]: ${n.name} no tiene ninguna ruta hacia ${b.ip}.
- L1688 [js-string]: La ruta de ${n.name} apunta a ${hit.ref.via}, que no es el siguiente equipo.
- L1808 [js-string]: <button onclick="startActivity(${i})" class="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 h...
- L1818 [js-string]: 🎯 Objetivo: ${c.goals.map(([x, y, site]) => { const A = dv(x), B = dv(y); return site === '@vpn' ?
- L1819 [js-string]: 👤 Alumno: ${currentStudent}
- L1821 [js-string]: 📥 Entrega de ${c.submission.student} · guardada ${c.submission.savedAt ? new Date(c.submission.savedAt).toLocaleString('es-AR') : ''} · e...
- L1836 [js-string]: Actividad cargada: ${a.title}

## Propuestos como NO traducir (CLI simulada de dispositivos)

- L2548: ipconfig - Muestra la dirección IP actual y puerta de enlace.
- L2549: ping [IP o nombre] - Diagnostica conectividad enviando paquetes ICMP.
- L2550: tracert [IP o nombre] - Muestra el camino salto por salto y dónde se corta.
- L2551: nslookup [nombre] - Consulta al servidor DNS qué IP tiene un nombre.
- L2553: clear - Limpia la pantalla de la consola.

## Terminos tecnicos detectados (mantener igual en todos los idiomas)

ARP, DHCP, DNS, MAC, Router, Switch

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
