# SimLab Redes (NetSim Lab)

Simulador interactivo y pedagógico de redes de computadoras diseñado para la enseñanza y el aprendizaje práctico de conceptos fundamentales y avanzados de telecomunicaciones, arquitecturas de red y protocolos.

Desarrollado como una aplicación web autónoma (Single Page Application) basada en tecnologías web estándar, sin dependencias pesadas de servidor ni requerimientos de instalación compleja.

> 🌐 **Acceso en línea:** Puedes utilizar el simulador directamente desde tu navegador en **[https://simlabredes.vercel.app](https://simlabredes.vercel.app/)**

---

## 🚀 Inicio rápido para desarrollar

El simulador funciona abriendo `index.html` directamente: Tailwind, Font Awesome y las tipografías son archivos locales. No se necesita internet ni un servidor para usarlo.

Para regenerar los recursos después de cambiar clases de Tailwind, diccionarios o `js/i18n.js`:

```bash
npm install       # una sola vez: instala Tailwind CLI
npm run build     # compila assets/tailwind.css y assets/offline-bundle.js
npm run check     # valida los 4 idiomas y la copia offline
```

`npm run build` también actualiza el paquete que usa el botón **«Guardar copia para usar sin internet»**. Esa copia es un único archivo HTML con todos los estilos, fuentes, iconos y diccionarios incrustados: funciona sin conexión desde el primer momento y conserva los cuatro idiomas.

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

---

## 💻 Acceso e Instalación

### Opción 1: En línea (Recomendada - Sin instalación)
Disponible directamente en Vercel:
👉 **[https://simlabredes.vercel.app](https://simlabredes.vercel.app/)**

### Opción 2: Abrir localmente en el navegador
1. Clona el repositorio:
   ```bash
   git clone https://github.com/hmvillalba/simlabredes.git
   ```
2. Abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).

### Opción 3: Servidor local (XAMPP / Apache / Live Server)
1. Coloca la carpeta en el directorio web (por ejemplo `C:\xampp\htdocs\simulador\redes`).
2. Inicia el servidor Apache.
3. Accede desde el navegador a:
   ```text
   http://localhost/simulador/redes/
   ```

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
