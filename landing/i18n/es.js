// landing/i18n/es.js — Textos de la landing en español neutro (fuente y respaldo).
//
// La landing es estática: tools/build_landing.mjs lee estos diccionarios y
// escribe es/, ar/, en/, pt/ y fr/. La variante rioplatense se conserva en ar.js.
// tools/test_landing.mjs comprueba las claves de los cinco idiomas y las páginas.
//
// Reglas:
//  - Interpolación con {variable} (solo {year}).
//  - Los términos técnicos (DHCP, ARP, MAC, VLAN, router…) no se traducen.
//  - Los nombres de los archivos y comandos van en <code> dentro de la plantilla.
window.LANDING_DICTS = window.LANDING_DICTS || {};
window.LANDING_DICTS.es = {
    _meta: { name: 'Español neutro', dir: 'ltr' },

    meta: {
        title: 'SimLab Redes — Simulador de redes para enseñar y aprender',
        description: 'Simulador de redes interactivo, gratuito y sin instalación. Crea topologías, configura IP, DHCP y VLAN, y observa el tráfico ARP, DNS y HTTP en el aula.',
        ogImageAlt: 'Captura del simulador con dos redes unidas por un router'
    },

    nav: {
        langLabel: 'Idioma',
        features: 'Qué incluye',
        teachers: 'Para docentes',
        start: 'Empezar',
        support: 'Apoyar',
        repo: 'Repositorio',
        simulator: 'Abrir simulador'
    },

    hero: {
        badge: 'Gratis · Sin instalar · Funciona sin internet',
        title: 'Aprende redes creando redes',
        lead: 'SimLab Redes es un simulador pensado para el aula: los estudiantes crean topologías, configuran equipos y ven cómo viajan los paquetes capa por capa, sin instalar nada.',
        ctaPrimary: 'Abrir simulador',
        ctaSecondary: 'Ver el código',
        note: 'Funciona en el navegador: también puedes abrir el archivo desde una carpeta o una memoria USB, sin servidor.'
    },

    features: {
        title: 'Qué incluye',
        lead: 'Todo lo necesario para una unidad de redes, sin licencias ni cuentas.',
        f1Title: 'Topologías en el navegador',
        f1Text: 'Routers WiFi y L3, switches, PC, portátiles, servidores web y DNS, y VPN. Conecta y desconecta cables con el mouse.',
        f2Title: 'Tráfico real simulado',
        f2Text: 'ARP, ICMP, DHCP, DNS, HTTP y túneles VPN con animación de paquetes y el detalle de cada capa OSI.',
        f3Title: 'Tablas y consolas',
        f3Text: 'Tablas ARP, MAC, DNS y de routing que se actualizan automáticamente, y una consola por equipo para practicar comandos.',
        f4Title: 'Listo para el aula',
        f4Text: 'Actividades con fallas para resolver, entrega del trabajo con el nombre del estudiante y corrección para el docente.'
    },

    shots: {
        title: 'Cómo se ve',
        lead: 'Capturas del simulador real, en computadora y en celular.',
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
        p2Text: 'El estudiante guarda su red con su nombre y tú la abres desde «Corregir entregas».',
        p3Title: 'Proyección en clase',
        p3Text: 'Modo pantalla completa con textos grandes y alto contraste para proyectar.',
        classTitle: 'Una clase de 45 minutos',
        class1: 'Abre un ejemplo o una actividad y proyéctalo mientras explicas la topología.',
        class2: 'Los estudiantes la reconstruyen en sus equipos y prueban con ping hasta obtener respuesta.',
        class3: 'Cada estudiante guarda la red con su nombre y tú la abres en «Corregir entregas».',
        exercisesTitle: 'Cuatro ejercicios para empezar',
        ex1: 'Cambiar la red de una PC para que pueda hacer ping al otro extremo del router.',
        ex2: 'Reparar un DHCP que no entrega direcciones y comprobar con ipconfig.',
        ex3: 'Separar dos grupos de equipos con VLAN y verificar que no se vean entre sí.',
        ex4: 'Publicar un servidor web detrás del router y acceder a él desde Internet.'
    },

    start: {
        title: 'Empezar en un minuto',
        lead: 'Sin registro, sin instalación y sin depender de la conexión del aula.',
        s1Title: 'Abre el simulador',
        s1Text: 'Se abre en el navegador y listo: no necesitas cuentas ni descargas.',
        s2Title: 'Elige un ejemplo',
        s2Text: 'En el menú Archivo hay redes de ejemplo para ver la herramienta en acción.',
        s3Title: 'Guarda tu trabajo',
        s3Text: 'Guárdalo en .json, expórtalo a PNG, JPG o PDF, o descarga una copia para usar sin internet.'
    },

    repo: {
        title: 'Código abierto',
        lead: 'El proyecto tiene licencia MIT: puedes usarlo en clase, modificarlo y compartirlo.',
        license: 'Licencia MIT',
        contribute: 'Cómo colaborar',
        issues: 'Reportar un error',
        support: 'Apoyar el proyecto',
        star: 'Dar una estrella en GitHub'
    },

    support: {
        title: 'Apoyar el proyecto',
        lead: 'El simulador es gratuito y sin publicidad. Si te sirve para dar clase, estas son las formas de devolverlo.',
        mentionTitle: 'Menciona el proyecto',
        mentionText: 'Cuéntales a colegas y estudiantes de dónde lo obtuviste, o comparte el enlace en tu material de clase.',
        starTitle: 'Deja una estrella',
        starText: 'Una estrella en GitHub ayuda a que otros docentes lo encuentren.',
        donateTitle: 'Donación (opcional)',
        donateText: 'Si te gusta el simulador, puedes mencionar el proyecto o hacer una donación al autor.',
        cafecito: 'Invítame un Cafecito',
        kofi: 'Apoyar en Ko-fi',
        donateNote: 'Cafecito: Argentina y Mercado Pago · Ko-fi: internacional.'
    },

    rights: {
        title: 'Licencia y derechos',
        license: 'Distribuido bajo Licencia MIT',
        donation: 'Si te gusta el simulador, puedes mencionar el proyecto o hacer una donación al autor.',
        mit: 'El código se puede usar, copiar, modificar y redistribuir, incluso en clase, conservando el aviso de copyright. Se entrega tal cual, sin garantías.',
        read: 'Leer la licencia completa'
    },

    footer: {
        madeBy: 'Hecho por Hugo Martín Villalba',
        rights: '© {year} Hugo Martín Villalba · Licencia MIT',
        otherLanguages: 'Otros idiomas'
    }
};
