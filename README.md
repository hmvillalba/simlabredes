# SimLab Redes (NetSim Lab)

Simulador interactivo y pedagógico de redes de computadoras diseñado para la enseñanza y el aprendizaje práctico de conceptos fundamentales y avanzados de telecomunicaciones, arquitecturas de red y protocolos.

Desarrollado como una aplicación web autónoma (Single Page Application) basada en tecnologías web estándar, sin dependencias pesadas de servidor ni requerimientos de instalación compleja.

> 🌐 **Acceso en línea:** La portada y el simulador están en **[https://simlabredes.vercel.app](https://simlabredes.vercel.app/)** (la raíz abre la portada en español; el simulador también tiene acceso directo en `/index.html` y `/simulador`).

---

## 🚀 Inicio rápido para desarrollar

El simulador funciona abriendo `index.html` directamente: Tailwind, Font Awesome y las tipografías son archivos locales. No se necesita internet ni un servidor para usarlo.

Para regenerar los recursos después de cambiar clases de Tailwind, diccionarios o `js/i18n.js`:

```bash
npm install       # una sola vez: instala Tailwind CLI
npm run build     # compila Tailwind, el bundle offline y la landing
npm run check     # valida los 4 idiomas, la copia offline y la landing
```

`npm run build` también actualiza el paquete que usa el botón **«Guardar copia para usar sin internet»**. Esa copia es un único archivo HTML con todos los estilos, fuentes, iconos y diccionarios incrustados: funciona sin conexión desde el primer momento y conserva los cuatro idiomas.

### Landing page multilingüe

La portada pública se genera por separado, en cuatro idiomas, a partir de una plantilla y de diccionarios propios:

```bash
npm run build:landing                      # es/ en/ pt/ fr/ + sitemap.xml + robots.txt
node tools/test_landing.mjs                # valida las cuatro páginas (también corre con npm run check)
SITE_URL=https://midominio.com npm run build:landing   # cambia la URL canónica
```

- Las fuentes están en `landing/`: `template.html`, `i18n/{es,en,pt,fr}.js`, `tailwind.config.js` y la entrada `src/landing.css`.
- El resultado **se versiona**: `es/index.html`, `en/index.html`, `pt/index.html`, `fr/index.html`, `sitemap.xml`, `robots.txt` y `assets/landing.css`. No hace falta compilar para publicar y los cambios quedan visibles en el diff.
- En Vercel, `vercel.json` redirige `/` a `/es/` y ofrece `/simulador` como alias de `/index.html`; ambos redireccionamientos son temporales. `cleanUrls` está desactivado para que `/index.html` no se normalice a `/` y no entre en un bucle. El sitemap anuncia las cuatro portadas y la URL directa del simulador, no la raíz (que es una redirección). En GitHub Pages o en un servidor sin esa configuración, la raíz sigue sirviendo `index.html` y las portadas se abren por su ruta.
- Las rutas de las páginas y sus recursos son relativas: funcionan en Vercel/GitHub Pages, en un subdirectorio e incluso abriendo el archivo con `file://`. El botón «Abrir simulador» apunta a `../index.html`, que es el simulador de la raíz del repositorio.
- Sin CDNs: la landing usa el mismo CSS compilado y las mismas fuentes e iconos locales que el simulador.

---

## 🚀 Características Principales

### 🖥️ Diseño de Topologías Interactivas
- **Dispositivos soportados:**
  - **Routers WiFi:** Gateway residencial/oficina con servidor DHCP y punto de acceso inalámbrico.
  - **Routers L3:** Enrutadores con múltiples interfaces de red y tablas de enrutamiento estático configurables.
  - **Switches L2:** Conmutadores de red con tablas CAM / MAC dinámicas.
  - **Hosts y Terminales:** PCs de escritorio, Notebooks, Netbooks y Smart TVs (con soporte Ethernet y WiFi).
  - **Servidores:** Servidor Web (HTTP), Servidor DNS (resolución de nombres a direcciones IP).
  - **Seguridad y Enlaces Remotos:** Servidor VPN local (tipo WireGuard/OpenVPN) y Servidor VPN en la nube / VPS (tipo Tailscale/ZeroTier).
- **Herramientas de cableado:** Conexión y desconexión visual de medios de transmisión guiados e inalámbricos.

### 📦 Simulación de Tráfico y Protocolos en Tiempo Real
- **Inspección de Capas OSI / TCP-IP:** Visualización paso a paso de encapsulamiento y desencapsulamiento de tramas y paquetes.
- **Protocolos simulados:**
  - **ARP:** Resolución de direcciones IP a MAC y difusión por broadcast.
  - **ICMP / Ping:** Pruebas de conectividad y latencia entre nodos.
  - **DHCP:** Asignación dinámica de direcciones IP, máscaras de subred y puertas de enlace.
  - **DNS:** Consultas y respuestas jerárquicas de resolución de nombres.
  - **HTTP:** Peticiones GET y respuesta de servidores web.
  - **Túneles VPN:** Tráfico encapsulado a través de redes públicas hacia redes privadas.

### 🎓 Herramientas Pedagógicas para Clases
- **Banco de Actividades Prácticas:** Escenarios con topologías prediseñadas y fallas intencionales para diagnóstico y resolución de problemas por parte de los alumnos.
- **Flujo de Entrega:** Los estudiantes pueden registrar su nombre y exportar su trabajo resuelto para entregarlo al docente.
- **Módulo de Calificación Docente:** Herramienta integrada para cargar y evaluar las entregas de los estudiantes.
- **Modo Proyección:** Optimización de escala e interfaces con fuentes agrandadas y alto contraste para proyectores de aula.
- **Recorrido Guiado (Tour):** Asistente paso a paso para usuarios principiantes.

### 💾 Exportación y Persistencia
- Guardado y carga de topologías en formato `.json`.
- Exportación de topologías a imágenes **PNG**, **JPG** y documentos **PDF** (con listado detallado de inventario de equipos).
- Función de descarga para **uso 100% offline sin conexión a internet**.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 & SVG:** Motor gráfico de topología vectorial interactiva y animación de paquetes.
- **Tailwind CSS:** compilado localmente con `npm run build:css` (sin CDN de pruebas).
- **Font Awesome y Google Fonts:** archivos locales en `assets/` (Inter y Fira Code).
- **JavaScript (Vanilla):** lógica del simulador, gestión de eventos, algoritmos de switching y routing.
- **Copia offline:** un único HTML autocontenido generado con `assets/offline-bundle.js`.
- **Landing page multilingüe:** plantilla + diccionarios propios compilados a HTML estático con `npm run build:landing` (sin framework ni CDNs).

---

## 💻 Acceso e Instalación

### Opción 1: En línea (Recomendada - Sin instalación)
Disponible directamente en Vercel:
👉 **[https://simlabredes.vercel.app](https://simlabredes.vercel.app/)**

La portada multilingüe vive en rutas propias: `/es/`, `/en/`, `/pt/` y `/fr/`. En Vercel, la raíz `/` redirige a `/es/`; el simulador conserva su URL directa, `https://simlabredes.vercel.app/index.html`, y el alias `https://simlabredes.vercel.app/simulador`.

### Opción 2: Abrir localmente en el navegador
1. Clona el repositorio:
   ```bash
   git clone https://github.com/hmvillalba/simlabredes.git
   ```
2. Abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).

### Opción 3: Servidor local (XAMPP / Apache / Live Server)
1. Coloca la carpeta en el directorio web (por ejemplo `C:\xampp\htdocs\simulador\redes`).
2. Inicia el servidor Apache.
3. Accede a la portada en español o al simulador desde:
   ```text
   http://localhost/simulador/redes/es/
   http://localhost/simulador/redes/index.html
   ```
   En un servidor local no se aplican las redirecciones de Vercel, así que `/` sirve directamente el simulador (`index.html`).

---

## 👤 Autor

- **Hugo Martín Villalba** ([@hmvillalba](https://github.com/hmvillalba))

---

## ☕ Apoyo al Proyecto

> **"Si te gusta el Simulador queda a tu criterio una Mención o Donación para el autor."**

Si utilizas este simulador para tus clases, proyectos educativos o aprendizaje personal y deseas apoyar su desarrollo continuo:

[![Invitame un cafecito](https://img.shields.io/badge/Cafecito-Invitame%20uno-blue?style=for-the-badge&logo=coffeescript&logoColor=white)](https://cafecito.app/hmvillalba)
[![Apóyame en Ko-fi](https://img.shields.io/badge/Ko--fi-Apóyame-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/hugomartinvillalba)

- ⭐ Dale una estrella al repositorio en [GitHub](https://github.com/hmvillalba/simlabredes).
- 📢 Menciona y comparte la herramienta con tus colegas o estudiantes.
- ☕ Si deseas colaborar económicamente, podés invitar un café mediante **[Cafecito](https://cafecito.app/hmvillalba)** (Argentina / Mercado Pago) o **[Ko-fi](https://ko-fi.com/hugomartinvillalba)** (Internacional).

---

## 📄 Licencia

Este proyecto se distribuye bajo los términos de la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más información.
