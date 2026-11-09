// lang/es.js — Diccionario base en ESPAÑOL (idioma fuente y respaldo).
//
// Fase 2 del plan i18n: solo contiene las claves de arranque, con el texto
// idéntico al que ya muestra index.html (así no hay ningún cambio visible).
// Fase 3: se completa con todas las claves extraídas de la auditoría
// (docs/auditoria-textos.csv), organizadas por área: menu.*, device.*, log.*,
// tour.*, error.*, modal.*
//
// Reglas:
//  - Una sola fuente de verdad por texto: si está acá, no debe estar suelto en el código.
//  - Las claves usan puntos para anidar: 'log.packetSent'.
//  - Interpolación con {variable}: 'Paquete de {from} a {to}'.
//  - Plurales con count: 'log.packets_one' / 'log.packets_other'.
//  - Términos técnicos (DHCP, ARP, VLAN, gateway…) quedan tal cual en todos los idiomas.
//  - La salida de la consola/CLI de los dispositivos NO se traduce (va en inglés, como equipos reales).
window.I18N_DICTS = window.I18N_DICTS || {};
window.I18N_DICTS.es = {
    _meta: { name: 'Español', dir: 'ltr' },

    app: {
        title: 'Simulador de Redes Educativo',
        tagline: 'Simulador de Redes Interactivo para Estudiantes'
    },

    ui: {
        langSelector: 'Idioma / Language'
    },

    // Fase 3 · zona 1 — cabecera y menús:
    header: {
        toolSelect: 'Mover / Seleccionar',
        toolCable: 'Conectar Cable',
        toolDeleteCable: 'Eliminar Cable',
        undo: 'Deshacer (Ctrl+Z)',
        redo: 'Rehacer (Ctrl+Y)',
        deliver: 'Entregar',
        deliverTitle: 'Guardar tu trabajo con tu nombre para entregárselo al profe',
        studentDefault: 'Alumno',
        studentTitle: 'Tu nombre: queda guardado en las redes y actividades que guardes',
        activities: 'Actividades',
        activitiesTitle: 'Redes con fallas para resolver',
        support: 'Apoyar',
        supportTitle: 'Acerca del simulador y apoyar al autor'
    },
    menu: {
        file: 'Archivo',
        view: 'Ver',
        saveNetwork: 'Guardar red…',
        openNetwork: 'Abrir red…',
        exportAs: 'Exportar la red como…',
        imagePng: 'Imagen PNG',
        imageJpg: 'Imagen JPG',
        docPdf: 'Documento PDF (con lista de equipos)',
        offlineCopy: 'Guardar copia para usar sin internet',
        offlineCopyTitle: 'Descarga una versión de este simulador que funciona sin internet (hace falta conexión una sola vez)',
        forTeacher: 'Para el profesor',
        makeActivity: 'Crear actividad con esta red…',
        gradeDeliveries: 'Corregir entregas…',
        loadDemo: 'Cargar ejemplo',
        demoVpnLocal: 'Ejemplo: VPN local (abrir puertos)',
        demoVpnLocalTitle: 'VPN dentro de la red de la oficina: para llegar desde afuera hay que abrir un puerto en el router',
        demoVpnCloud: 'Ejemplo: 2 redes unidas por VPN',
        demoVpnCloudTitle: 'Casa y oficina, cada una con su router e Internet, unidas por una VPN en la nube',
        demoTwoNetworks: 'Ejemplo 2 redes',
        demoTwoNetworksTitle: 'Dos redes unidas por un router con varias interfaces',
        clearAll: 'Limpiar todo',
        devicesPanel: 'Panel de dispositivos',
        simPanel: 'Panel de simulación',
        themeLight: 'Modo claro',
        themeDark: 'Modo oscuro',
        tour: 'Recorrido guiado',
        aboutRights: 'Acerca de · Derechos',
        project: 'Proyectar en clase',
        projectTitle: 'Pantalla completa con textos grandes (Esc para salir)'
    },

    // Áreas reservadas (se completan en la Fase 3):
    device: {},  // panel de dispositivos, nombres por defecto, propiedades
    log: {},     // log de tráfico (claves + variables)
    tour: {},    // recorrido guiado
    error: {},   // validaciones y alertas
    modal: {}    // modales (dispositivo, actividad, entregar, corregir…)
};
