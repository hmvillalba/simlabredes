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
        langSelector: 'Idioma / Language',
        cancel: 'Cancelar'
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
    // Fase 3 · zona 2 — paneles (paleta, lienzo, simulación, actividad):
    device: {
        paletteTitle: 'Agregar Dispositivos',
        paletteHint: 'Haz clic en un equipo para añadirlo. Doble clic sobre un equipo de la red abre sus propiedades; la tecla Supr lo elimina.',
        legendTitle: 'Leyenda de Estados:',
        legendOk: 'Conexión OK / IP Válida',
        legendApipa: 'APIPA (Sin IP / Sin DHCP)',
        legendError: 'Desconectado / Error Subred',
        aboutTitle: 'Acerca de este simulador',
        type: {
            router: 'Router WiFi', routerDesc: 'Gateway + DHCP + WiFi',
            lrouter: 'Router (varias redes)', lrouterDesc: 'Interfaces + tabla de rutas',
            notebook: 'Notebook', notebookDesc: 'Cable o WiFi',
            netbook: 'Netbook', netbookDesc: 'Portátil pequeña, cable o WiFi',
            tv: 'Smart TV', tvDesc: 'WiFi o cable · navegador',
            vpncloud: 'VPN en la nube (VPS)', vpncloudDesc: 'Tipo Tailscale / ZeroTier',
            vpnlocal: 'Servidor VPN local', vpnlocalDesc: 'Tipo WireGuard / OpenVPN',
            dns: 'Servidor DNS', dnsDesc: 'Tabla de nombres → IP',
            switch: 'Switch (L2 / L3)', switchDesc: 'Capa 2 o Capa 3 (Multicapa)',
            pc: 'Computadora (PC)', pcDesc: 'Ethernet / Consola / Web',
            phone: 'Smartphone WiFi', phoneDesc: 'Conexión Inalámbrica',
            cloud: 'Internet (ISP Cloud)', cloudDesc: 'Acceso a la Red Mundial'
        },
        // Nombres por defecto de los equipos en el lienzo ({id} = número).
        // Se generan en el idioma activo; al exportar/importar se conservan tal cual.
        defaultName: {
            notebook: 'Notebook_{id}',
            netbook: 'Netbook_{id}',
            tv: 'SmartTV_{id}',
            router: 'Router_WiFi_{id}',
            lrouter: 'Router_{id}',
            dns: 'DNS_{id}',
            vpnCloud: 'VPN_Nube_{id}',
            vpnLocal: 'VPN_Local_{id}',
            switch: 'Switch_LAN_{id}',
            pc: 'PC_Alumno_{id}',
            phone: 'Smartphone_{id}',
            cloud: 'Internet_ISP',
            other: 'Dispositivo_{id}'
        }
    },
    canvas: {
        cableMode: 'Modo Cable: Haz clic en dos dispositivos para conectarlos',
        deleteCableMode: 'Modo Eliminar Cable: Haz clic sobre cualquier cable en la pantalla para cortarlo',
        emptyTitle: 'Tu área de trabajo está vacía',
        emptyHintA: 'Agregá equipos desde el panel de la izquierda, o abrí un ejemplo desde',
        zoomIn: 'Acercar (tecla +)',
        zoomReset: 'Volver al 100%',
        zoomOut: 'Alejar (tecla -)',
        fitView: 'Ver toda la red (tecla 0)',
        projectExit: 'Salir de proyección'
    },
    sim: {
        title: 'Simular comunicación',
        hidePanel: 'Ocultar panel',
        start: 'Iniciar',
        pause: 'Pausar / continuar',
        stop: 'Detener simulación',
        all: 'Todos navegando a la vez',
        allTitle: 'Todos los equipos se comunican a la vez, hasta que decidas detenerlo',
        modeLabel: 'Modo de simulación',
        modeSimple: '🟢 Modo simple: solo el recorrido',
        modeAdvanced: '🔬 Modo avanzado: capas, ARP, MAC, DNS y rutas',
        source: 'Origen',
        destination: 'Destino',
        protocolLabel: 'Tipo de comunicación',
        protocol: {
            icmp: 'ICMP / Ping',
            arp: 'ARP / Buscar MAC',
            dns: 'DNS / Resolver nombre',
            http: 'HTTP / Solicitud web',
            dhcp: 'DHCP / Pedir IP'
        },
        auto: 'Automático',
        noDevices: 'Sin dispositivos',
        site: 'Nombre del sitio (HTTP/DNS)',
        dnsServer: 'Servidor DNS',
        tcpHandshake: 'Mostrar el saludo TCP (SYN, SYN-ACK, ACK) antes de HTTP',
        speed: 'Velocidad',
        speedSlow: 'Más lenta',
        speedFast: 'Más rápida',
        speedLabel: 'Velocidad de la simulación',
        layers: 'Ver capas',
        vpn: 'Enviar por la VPN (túnel con IP VPN)',
        vpnTitle: 'Si origen y destino están en la misma VPN, el paquete viaja dentro del túnel cifrado',
        step: 'Paso a paso (espera mi OK en cada cartel)',
        stepTitle: 'La simulación se detiene en cada paso hasta que presiones ▶ (o la barra espaciadora)',
        clearTables: 'Borrar tablas (ARP, MAC, DNS)',
        clearTablesTitle: 'Vacía las tablas ARP de los equipos y las tablas MAC de los switches',
        statusIdle: 'Selecciona origen, destino y protocolo para visualizar el recorrido.'
    },
    act: {
        close: 'Cerrar actividad',
        verify: 'Verificar',
        hint: 'Pista',
        deliverTitle: 'Guardar y entregar'
    },
    log: {},     // log de tráfico (claves + variables)
    error: {},   // validaciones y alertas

    // Fase 3 · zona 3 — modales y diálogos:
    modal: {
        close: 'Cerrar',
        closeTitle: 'Cerrar (Esc)',
        deliver: {
            title: 'Entregar mi trabajo'
        },
        about: {
            subtitle: 'Simulador de Redes Educativo · versión 35',
            license: 'Distribuido bajo Licencia MIT',
            donation: 'Si te gusta el Simulador queda a tu criterio una Mención o Donación para el autor.',
            cafecito: 'Invitame un Cafecito',
            kofi: 'Apoyar en Ko-fi'
        },
        restore: {
            title: 'Encontramos tu trabajo anterior',
            hint: 'El simulador guarda tu red automáticamente en este navegador. Para entregarla o compartirla, usá Archivo → Guardar red.',
            startOver: 'Empezar de cero',
            continue: 'Continuar donde estaba'
        },
        student: {
            title: '¿Cómo te llamás?',
            hint: 'Tu nombre se guarda dentro de las redes y actividades que guardes, así tu profe sabe de quién es cada entrega.',
            placeholder: 'Ej: Ana Pérez',
            notNow: 'Ahora no',
            save: 'Guardar nombre'
        },
        mkact: {
            title: 'Crear actividad con esta red',
            hint: 'Armá la red, rompé algo a propósito (una IP, un cable, una ruta…) y definí qué tiene que lograr el alumno. Se guarda como un archivo que el alumno abre con «Abrir red».',
            labelTitle: 'Título',
            placeholderTitle: 'Ej: La PC de Secretaría no sale a Internet',
            labelLevel: 'Dificultad',
            level: {
                easy: 'Fácil',
                medium: 'Medio',
                hard: 'Difícil'
            },
            labelStory: 'Consigna (qué le pasa a la red)',
            placeholderStory: 'Ej: Desde ayer, nadie del laboratorio puede abrir la página del colegio.',
            labelHint: 'Pista (opcional)',
            placeholderHint: 'Ej: Revisá la puerta de enlace de las PC.',
            goals: 'Objetivos: ¿quiénes tienen que poder comunicarse?',
            save: 'Guardar actividad'
        },
        grade: {
            title: 'Corregir entregas',
            hint: 'Elegí uno o varios archivos que guardaron tus alumnos. El simulador vuelve a verificar cada red y te muestra quién la resolvió. Con «Ver» abrís la red del alumno para revisarla.',
            chooseFiles: 'Elegir archivos…',
            downloadCsv: 'Descargar resumen (Excel)'
        },
        activities: {
            title: 'Actividades: ¡arreglá la red!',
            hint: 'Cada actividad carga una red con una falla escondida. Encontrala, arreglala y verificá.'
        },
        save: {
            title: 'Guardar red',
            hint: 'Elegí un nombre para identificar tu red.',
            placeholder: 'Ej: Red del aula',
            save: 'Guardar'
        },
        device: {
            delete: 'Eliminar',
            deleteTitle: 'Eliminar este dispositivo de la red'
        }
    },
    tour: {
        prev: 'Anterior',
        next: 'Siguiente',
        closeTitle: 'Cerrar recorrido'
    }
};
