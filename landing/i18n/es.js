// landing/i18n/es.js — Textos de la landing en español (idioma fuente y respaldo).
//
// La landing es estática: tools/build_landing.mjs lee estos diccionarios y
// escribe es/index.html, en/index.html, pt/index.html y fr/index.html.
// tools/test_landing.mjs comprueba que las claves de los cuatro idiomas
// coincidan exactamente y que no quede ningún token sin resolver.
//
// Reglas:
//  - Interpolación con {variable} (solo {year}).
//  - Los términos técnicos (DHCP, ARP, MAC, VLAN, router…) no se traducen.
//  - Los nombres de los archivos y comandos van en <code> dentro de la plantilla.
window.LANDING_DICTS = window.LANDING_DICTS || {};
window.LANDING_DICTS.es = {
    _meta: { name: 'Español', dir: 'ltr' },

    meta: {
        title: 'SimLab Redes — Simulador de redes para enseñar y aprender',
        description: 'Simulador de redes interactivo, gratuito y sin instalación. Armá topologías, configurá IP, DHCP y VLAN, y mirá el tráfico ARP, DNS y HTTP en el aula.',
        ogImageAlt: 'Captura del simulador con dos redes unidas por un router'
    },

    nav: {
        langLabel: 'Idioma',
        features: 'Qué incluye',
        teachers: 'Para docentes',
        start: 'Empezar',
        repo: 'Repositorio',
        simulator: 'Abrir simulador'
    },

    hero: {
        badge: 'Gratis · Sin instalar · Funciona sin internet',
        title: 'Aprender redes armando redes',
        lead: 'SimLab Redes es un simulador pensado para clase: los estudiantes arman topologías, configuran equipos y ven cómo viajan los paquetes capa por capa, sin instalar nada.',
        ctaPrimary: 'Abrir simulador',
        ctaSecondary: 'Ver el código',
        note: 'Corre en el navegador: también abriendo el archivo desde una carpeta o un pendrive, sin servidor.'
    },

    features: {
        title: 'Qué incluye',
        lead: 'Todo lo necesario para una unidad de redes, sin licencias ni cuentas.',
        f1Title: 'Topologías en el navegador',
        f1Text: 'Routers WiFi y L3, switches, PCs, notebooks, servidores web, DNS y VPN. Se tienden y cortan cables con el mouse.',
        f2Title: 'Tráfico real simulado',
        f2Text: 'ARP, ICMP, DHCP, DNS, HTTP y túneles VPN con animación de paquetes y el detalle de cada capa OSI.',
        f3Title: 'Tablas y consolas',
        f3Text: 'Tablas ARP, MAC, DNS y de routing que se actualizan solas, y consola por equipo para practicar comandos.',
        f4Title: 'Listo para el aula',
        f4Text: 'Actividades con fallas para resolver, entrega del trabajo con el nombre del alumno y corrección para el docente.'
    },

    shots: {
        title: 'Cómo se ve',
        lead: 'Capturas del simulador real, en escritorio y en celular.',
        desktopCaption: 'Dos redes unidas por un router L3, con las tablas y el panel de simulación abiertos.',
        mobileCaption: 'La misma interfaz en un celular: la barra y los paneles se reordenan.',
        altDesktop: 'Simulador con dos redes (192.168.1.0/24 y 192.168.2.0/24) unidas por un router',
        altMobile: 'Vista del simulador en un celular con la barra de herramientas apilada'
    },

    teachers: {
        title: 'Para docentes',
        lead: 'El simulador ya trae material para dar clase mañana mismo.',
        p1Title: 'Actividades con fallas',
        p1Text: 'Escenarios armados con un error de configuración para que el alumno diagnostique y corrija.',
        p2Title: 'Entrega y corrección',
        p2Text: 'El alumno guarda su red con su nombre y vos la abrís desde «Corregir entregas».',
        p3Title: 'Proyección en clase',
        p3Text: 'Modo pantalla completa con textos grandes y alto contraste para proyectar.',
        classTitle: 'Una clase de 45 minutos',
        class1: 'Abrí un ejemplo o una actividad y proyectalo mientras explicás la topología.',
        class2: 'Los alumnos la reconstruyen en su equipo y prueban con ping hasta que responda.',
        class3: 'Cada uno guarda la red con su nombre y vos la abrís en «Corregir entregas».',
        exercisesTitle: 'Cuatro ejercicios para empezar',
        ex1: 'Cambiar la red de una PC para que haga ping al otro extremo del router.',
        ex2: 'Reparar un DHCP que no entrega direcciones y comprobar con ipconfig.',
        ex3: 'Separar dos grupos de equipos con VLAN y verificar que no se vean.',
        ex4: 'Publicar un servidor web detrás del router y alcanzarlo desde Internet.'
    },

    start: {
        title: 'Empezar en un minuto',
        lead: 'Sin registro, sin instalación y sin depender de la conexión del aula.',
        s1Title: 'Abrí el simulador',
        s1Text: 'Se abre en el navegador y ya está: no hay cuentas ni descargas.',
        s2Title: 'Elegí un ejemplo',
        s2Text: 'En el menú Archivo hay redes de ejemplo para ver la herramienta en acción.',
        s3Title: 'Guardá tu trabajo',
        s3Text: 'Se guarda en .json, se exporta a PNG, JPG y PDF, y también como copia para usar sin internet.'
    },

    repo: {
        title: 'Código abierto',
        lead: 'El proyecto es MIT: podés usarlo en clase, modificarlo y compartirlo.',
        license: 'Licencia MIT',
        contribute: 'Cómo colaborar',
        issues: 'Reportar un error',
        support: 'Apoyar el proyecto',
        star: 'Dar una estrella en GitHub'
    },

    footer: {
        madeBy: 'Hecho por Hugo Martín Villalba',
        rights: '© {year} Hugo Martín Villalba · Licencia MIT',
        otherLanguages: 'Otros idiomas'
    }
};
