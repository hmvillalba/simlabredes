# Guía para colaboradores / Contributing Guide

> Este proyecto está bajo [Licencia MIT](LICENSE). Al contribuir aceptás que tu código se distribuirá bajo los mismos términos.

---

## Idioma de trabajo

Los **comentarios en el código**, los **mensajes de commit** y los **nombres de variables/funciones** van en **inglés**. Las discusiones en Issues y Pull Requests pueden hacerse en español o en inglés.

---

## Ramas y Pull Requests

| Rama | Propósito |
|------|-----------|
| `main` | Versión estable, siempre funcional |
| `phase/N-descripcion` | Una rama por fase del plan de internacionalización |
| `fix/descripcion` | Correcciones puntuales |

**Regla clave:** cada PR debe pasar el smoke test completo antes de mergear a `main`.

---

## Smoke test (lista de regresión)

Antes de abrir un PR, verificar manualmente que todo lo siguiente sigue funcionando:

- [ ] Crear dispositivos (router WiFi, router L3, switch, PC, notebook, servidor)
- [ ] Conectar cables entre dispositivos
- [ ] Eliminar cables con la herramienta de tijera
- [ ] Asignar IPs manualmente (doble clic en dispositivo → propiedades)
- [ ] DHCP: host solicita IP automáticamente desde un router
- [ ] Ping / ICMP entre hosts
- [ ] Simulación de tráfico (ARP, DNS, HTTP, VPN)
- [ ] Log de tráfico y panel de capas OSI
- [ ] Tabla ARP, tabla MAC, tabla DNS
- [ ] VLAN: configurar y verificar aislamiento
- [ ] Exportar red como PNG, JPG y PDF
- [ ] Guardar red como `.json` y volver a cargarla
- [ ] Guardar copia offline (funciona sin internet)
- [ ] Tour guiado (recorrido paso a paso)
- [ ] Modo claro / modo oscuro
- [ ] Vista móvil (pantalla < 900px): barra y paneles accesibles
- [ ] Crear actividad con falla y resolverla como alumno
- [ ] Función "Entregar" (exportar trabajo con nombre de alumno)
- [ ] `npm run build` y `npm run check` pasan sin errores
- [ ] `index.html` no carga recursos de CDNs (Tailwind, iconos y fuentes son locales)
- [ ] Guardar copia offline y abrirla sin conexión: estilos, iconos y 4 idiomas disponibles
- [ ] Landing: `npm run build:landing` y `node tools/test_landing.mjs` pasan sin errores
- [ ] Landing: `es/`, `en/`, `pt/` y `fr/index.html` abren con estilos y «Abrir simulador» lleva al simulador
- [ ] Función "Corregir entregas" (docente)

---

## Convenciones de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:  nueva funcionalidad
fix:   corrección de error
docs:  cambios en documentación
i18n:  trabajo de internacionalización
style: formato, sin cambios de lógica
refactor: reestructuración sin cambio de comportamiento
test:  scripts de control de calidad
```

---

## Estructura del proyecto (en construcción)

```
/
├── assets/             # CSS compilado, iconos, tipografías y bundle offline
│   ├── landing.css     # CSS compilado de la landing (Fase 7)
│   └── landing/        # capturas e imagen para compartir de la landing
├── lang/               # Diccionarios por idioma (window.I18N_DICTS, cargados con <script>)
│   ├── es.js           # español: base y respaldo
│   ├── en.js           # inglés (Fase 4)
│   ├── pt.js           # portugués (Fase 8)
│   └── fr.js           # francés (Fase 8)
├── landing/            # Fuentes de la landing (solo entrada, se compila aparte)
│   ├── template.html   # plantilla con tokens {{seccion.clave}} (Fase 7)
│   ├── i18n/           # diccionarios de la landing: es, en, pt, fr
│   └── tailwind.config.js # config de Tailwind propia de la landing
├── es/ en/ pt/ fr/     # landing generada y versionada: una carpeta por idioma
├── js/
│   └── i18n.js         # Motor: t(), data-i18n, selector de idioma, log como claves+variables
├── src/
│   ├── tailwind.css    # Entrada del build de Tailwind (Fase 6)
│   └── landing.css     # Entrada del build de Tailwind de la landing (Fase 7)
├── tools/
│   ├── audit_texts.py  # Fase 1: auditoría de textos
│   ├── build_offline_assets.mjs # Genera assets/offline-bundle.js
│   ├── build_landing.mjs # Fase 7: genera es/ en/ pt/ fr/, sitemap.xml y robots.txt
│   ├── check_keys.mjs  # control de claves i18n: node tools/check_keys.mjs [es|en|pt|fr|--all]
│   ├── check_vars.mjs  # control de variables: node tools/check_vars.mjs
│   ├── test_i18n.mjs   # tests del motor: node tools/test_i18n.mjs
│   ├── test_offline.mjs # tests de la copia sin internet: node tools/test_offline.mjs
│   ├── test_landing.mjs # tests de la landing: node tools/test_landing.mjs
│   └── vendor_*.mjs    # descarga única de fuentes e iconos (ya están en assets/)
├── docs/               # auditoría (auditoria-textos.csv, auditoria-resumen.md)
├── tailwind.config.js  # Clases que Tailwind debe incluir en el CSS compilado
├── package.json        # npm run build / npm run check
├── sitemap.xml         # generado por build_landing (Fase 7)
├── robots.txt          # generado por build_landing (Fase 7)
├── README.md
├── CONTRIBUTING.md     # Este archivo
└── LICENSE
```

### Comandos de verificación

```bash
npm install          # solo la primera vez
npm run build        # recompila Tailwind, el bundle offline y la landing
npm run check        # claves i18n, variables, motor, copia offline y landing
npm run build:landing  # solo la landing: es/ en/ pt/ fr/ + sitemap y robots
```

Después de cambiar clases usadas en `index.html`, diccionarios o `js/i18n.js`, hay que ejecutar `npm run build` antes de probar la copia offline. `npm run check` valida que la copia generada sea autocontenida, conserve los cuatro idiomas y pueda volver a guardarse desde sí misma.

Para la landing, el flujo es el mismo pero aislado: se edita `landing/template.html`, `landing/i18n/*.js` o `src/landing.css`, se ejecuta `npm run build:landing` y se valida con `node tools/test_landing.mjs`. Ese test comprueba las cuatro páginas, las claves de los diccionarios, hreflang/canónica, los metadatos OG, los enlaces al simulador y a la licencia, la ausencia de CDNs y la coherencia de `sitemap.xml` y `robots.txt`. Las páginas generadas (`es/`, `en/`, `pt/`, `fr/`) se versionan junto con `assets/landing.css`: no se editan a mano.

### Qué se traduce y qué no

- **Se traduce**: toda la interfaz del simulador (menús, paneles, modales, mensajes, avisos,
  textos de la simulación, actividades, entregas, calificador, exportación y recorrido guiado).
- **No se traduce (por ahora)**: la salida de la consola/CLI simulada de los dispositivos
  (`ping`, `tracert`, `ipconfig`, `nslookup`, `arp`, `help`). Ese texto sigue tal como se
  escribió en el simulador original, **en español**, y no pasa por `I18N.t()`. Queda
  pendiente pasarlo a inglés (como en un equipo real, según la propuesta de `docs/auditoria-resumen.md`)
  en una tarea aparte; hasta entonces es la única parte de la interfaz que no cambia de idioma.
- **No se traducen** los términos técnicos (DHCP, ARP, MAC, VLAN, gateway…) ni los nombres
  propios de los equipos.

---

## Fases del plan de internacionalización

Ver el documento completo del plan. Resumen de fases:

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Preparación del repositorio | ✅ Completa |
| 1 | Auditoría de textos | ✅ Completa (inventario en `docs/auditoria-textos.csv` + resumen en `docs/auditoria-resumen.md`) |
| 2 | Sistema i18n (`t()` + `data-i18n`) | ✅ Completa (motor en `js/i18n.js`; idiomas soportados: es, en, pt, fr) |
| 3 | Extracción del español a `lang/es.js` | ✅ Completa (cabecera/menús, paneles, modales y textos dinámicos del JS) |
| 4 | Traducción al inglés (`lang/en.js`) | ✅ Completa (756 claves, mismas que `es`) |
| 5 | Script de control de calidad de claves | ✅ Completa (`tools/check_keys.mjs` valida claves y texto fallback) |
| 6 | Producción: Tailwind compilado, assets locales | ✅ Completa (sin CDNs; `npm run build` genera CSS y bundle de la copia offline; `tools/test_offline.mjs` cubre los 4 idiomas) |
| 7 | Landing page web propia | ✅ Completa (`landing/` + `npm run build:landing`; genera `es/en/pt/fr/index.html`, sitemap y robots; `tools/test_landing.mjs`) |
| 8 | Portugués y francés | ✅ Completa (`lang/pt.js` y `lang/fr.js`, 756 claves cada uno, mismas que `es`) |

---

## Reporte de errores

Abrí un [Issue](https://github.com/hmvillalba/simlabredes/issues) describiendo:
1. Qué esperabas que pasara
2. Qué pasó en realidad
3. Pasos para reproducirlo
4. Navegador y sistema operativo

