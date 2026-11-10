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
├── index.html          # Simulador principal (SPA)
├── lang/               # Diccionarios por idioma (window.I18N_DICTS, cargados con <script>)
│   ├── es.js           # español: base y respaldo
│   └── en.js           # inglés (Fase 4); pt.js y fr.js en Fase 8
├── js/
│   └── i18n.js         # Motor: t(), data-i18n, selector de idioma, log como claves+variables
├── tools/
│   ├── audit_texts.py  # Fase 1: auditoría de textos
│   ├── check_keys.mjs  # control de claves i18n: node tools/check_keys.mjs [es|en|pt|fr|--all]
│   ├── check_vars.mjs  # control de variables: node tools/check_vars.mjs
│   └── test_i18n.mjs   # tests del motor: node tools/test_i18n.mjs
├── docs/               # auditoría (auditoria-textos.csv, auditoria-resumen.md)
├── README.md
├── CONTRIBUTING.md     # Este archivo
└── LICENSE
```

### Qué se traduce y qué no

- **Se traduce**: toda la interfaz del simulador (menús, paneles, modales, mensajes, avisos,
  textos de la simulación, actividades, entregas, calificador, exportación y recorrido guiado).
- **No se traduce**: la salida de la consola/CLI de los dispositivos (`ping`, `tracert`,
  `ipconfig`, `nslookup`, `arp`, `help`): va en inglés, como en un equipo real.
- **No se traducen** los términos técnicos (DHCP, ARP, MAC, VLAN, gateway…) ni los nombres
  propios de los equipos.

---

## Fases del plan de internacionalización

Ver el documento completo del plan. Resumen de fases:

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Preparación del repositorio | ✅ Completa |
| 1 | Auditoría de textos | ✅ Completa (inventario en `docs/auditoria-textos.csv` + resumen en `docs/auditoria-resumen.md`) |
| 2 | Sistema i18n (`t()` + `data-i18n`) | ✅ Completa (motor en `js/i18n.js`, solo `es` por ahora; en/pt/fr en Fases 4 y 8) |
| 3 | Extracción del español a `lang/es.js` | ✅ Completa (cabecera/menús, paneles, modales y textos dinámicos del JS) |
| 4 | Traducción al inglés (`lang/en.js`) | ✅ Completa (756 claves, mismas que `es`) |
| 5 | Script de control de calidad de claves | ✅ Completa (`tools/check_keys.mjs` valida claves y texto fallback) |
| 6 | Producción: Tailwind compilado, assets locales | ⏳ Pendiente |
| 7 | Landing page web propia | ⏳ Pendiente |
| 8 | Portugués y francés | ⏳ Pendiente |

---

## Reporte de errores

Abrí un [Issue](https://github.com/hmvillalba/simlabredes/issues) describiendo:
1. Qué esperabas que pasara
2. Qué pasó en realidad
3. Pasos para reproducirlo
4. Navegador y sistema operativo

