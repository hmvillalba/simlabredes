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

    // Áreas reservadas (se completan en la Fase 3):
    menu: {},    // menús de la cabecera (Archivo, Ver…)
    device: {},  // panel de dispositivos, nombres por defecto, propiedades
    log: {},     // log de tráfico (claves + variables)
    tour: {},    // recorrido guiado
    error: {},   // validaciones y alertas
    modal: {}    // modales (dispositivo, actividad, entregar, corregir…)
};
