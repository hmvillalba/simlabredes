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
        },
        layer2: 'Modo Capa 2'
    },

    // Detalle del paquete en la vista por capas (capas OSI y contenido).
    packet: {
        link: 'Enlace · Ethernet',
        net: 'Red · IP',
        vpn: 'Túnel VPN (cifrado)',
        inet: 'Red interna · IP VPN',
        tr: 'Transporte',
        app: 'Aplicación',
        broadcastMac: '{mac} → FF:FF:FF:FF:FF:FF (todos)',
        tunnel: '{preset}: túnel UDP puerto {port} · todo lo de adentro va cifrado',
        icmp: '{src} → {dst} · ICMP {type}',
        icmpReply: 'Echo Reply',
        icmpRequest: 'Echo Request',
        arpReply: ' · «{ip} está en {mac}»',
        arpRequest: ' · «¿Quién tiene {ip}?»',
        dnsResolved: 'DNS: {name} = {ip}',
        dnsNxdomain: 'DNS: {name} no existe (NXDOMAIN)',
        dnsQuery: 'DNS: ¿cuál es la IP de {name}?',
        udp53to: 'UDP puerto 53 → {port}',
        udpTo53: 'UDP puerto {port} → 53',
        tcp80to: 'TCP puerto 80 → {port} · banderas SYN + ACK',
        tcpTo80: 'TCP puerto {port} → 80 · bandera SYN',
        dhcpOffer: 'DHCP Offer: IP {ip}/{prefix} · puerta de enlace {gw}',
        dhcpAck: 'DHCP Ack: IP {ip}/{prefix} · puerta de enlace {gw}',
        dhcpDiscover: 'DHCP Discover: ¿hay un servidor DHCP?',
        dhcpRequest: 'DHCP Request: quiero la IP {ip}',
        udp67to68: 'UDP puerto 67 → 68',
        udp68to67: 'UDP puerto 68 → 67',
        dhcpNet: '{src} → {ip}',
        broadcastNet: '0.0.0.0 → 255.255.255.255 (difusión)',
        httpOk: 'HTTP 200 OK + página web',
        httpGet: 'HTTP GET / (pido la página)',
        tcp80: 'TCP puerto 80 → {port}',
        tcpTo80ack: 'TCP puerto {port} → 80 · bandera ACK (confirma la conexión)'
    },
    // Fase 3 · zona 4 — modal de dispositivo (pestañas y campos):
    dev: {
        subtitle: 'Tipo: {type}{layer} | MAC: {mac}',
        tab: {
            layer: 'Modo de Capa (L2/L3)',
            ip: 'Configuración IP',
            ipSvi: 'Configuración IP / SVI',
            connections: 'Conexiones / Puertos',
            dhcp: 'Servidor DHCP',
            dhcpWifi: 'DHCP / WiFi',
            portForwarding: 'Port Forwarding',
            wifiNetworks: 'WiFi Redes',
            routes: 'Interfaces y rutas',
            dnsRecords: 'Registros DNS',
            vpn: 'VPN',
            pingTerminal: 'Terminal Ping',
            webBrowser: 'Navegador Web'
        },
        layerTab: {
            intro: 'Selecciona el modo de operación del Switch:',
            l2: 'Capa 2 (L2 Switch)',
            l2Desc: 'Conmutación de tramas mediante MAC. No realiza enrutamiento.',
            l3: 'Capa 3 (L3 Multicapa)',
            l3Desc: 'Soporta enrutamiento IP inter-VLAN y servicio Servidor DHCP.'
        },
        ipTab: {
            obtain: 'Obtención de IP:',
            static: 'Estática',
            name: 'Nombre del dispositivo',
            ip: 'Dirección IP',
            mask: 'Máscara de subred',
            gateway: 'Puerta de enlace',
            apply: 'Aplicar configuración IP',
            validationHint: 'Se validan IPv4, máscara, puerta de enlace y direcciones duplicadas.'
        },
        dhcpTab: {
            title: 'Servidor DHCP',
            start: 'IP Inicial DHCP',
            end: 'IP Final DHCP',
            apply: 'Aplicar configuración DHCP',
            wifiTitle: 'Configuración Punto de Acceso WiFi',
            ssid: 'Nombre SSID',
            password: 'Contraseña WPA2',
            showPassword: 'Mostrar contraseña',
            changeHint: 'Al cambiar el nombre o la contraseña, los equipos conectados se desconectan y tienen que volver a conectarse.'
        },
        pf: {
            publicIp: 'IP pública (lado Internet) de este router:',
            publicIpHint: 'Los equipos de la red salen a Internet con esta IP (NAT). Desde afuera solo se puede llegar a un equipo de adentro si hay una regla de reenvío de puertos.',
            rules: 'Reglas de reenvío de puertos (Port Forwarding):',
            defaultRuleName: 'Regla',
            noRules: 'No hay reglas: desde Internet no se puede entrar a ningún equipo de esta red.',
            addTitle: 'Agregar regla',
            name: 'Nombre',
            proto: 'Protocolo',
            extPort: 'Puerto externo',
            intPort: 'Puerto interno',
            redirectTo: 'Redirigir al equipo',
            noDevices: '(no hay equipos en esta red)',
            add: 'Agregar regla',
            vpnHint: 'Para llegar a un servidor VPN local desde Internet: UDP, mismo puerto afuera y adentro (WireGuard 51820 · OpenVPN 1194 · ZeroTier 9993), hacia la IP del servidor VPN.'
        },
        wifi: {
            networks: 'Redes WiFi al alcance:',
            none: 'No se encontraron redes WiFi disponibles.',
            signal: 'Señal: Excelente | Canal 6',
            connected: 'Conectado',
            connect: 'Conectar',
            prompt: 'Contraseña de la red WiFi "{ssid}":'
        },
        conn: {
            list: 'Lista de conexiones activas conectadas a los puertos de {name}:',
            none: 'No hay cables o redes inalámbricas conectadas a este dispositivo.',
            linkType: 'Tipo enlace: {type} | IP: {ip}',
            typeWifi: 'WiFi Inalámbrico',
            typeEthernet: 'Cable Ethernet',
            disconnect: 'Desconectar',
            connectNew: 'Conectar Nuevo Cable'
        },
        dnsTab: {
            online: 'Servidor encendido (si lo apagás, nadie recibe respuesta)',
            records: 'Registros (nombre → IP)',
            recordsHint: 'Una línea por registro: {format}. Ejemplo: {example}. Si un nombre no está acá, el servidor responde «no existe».',
            apply: 'Aplicar',
            invalidRecord: 'Registro inválido: «{line}». Usá: www.ejemplo.com 192.168.2.10',
            recordsApplied: '{name}: registros aplicados ({count}).'
        },
        routesTab: {
            toward: 'Hacia {name}',
            noNeighbors: 'Conectá este router con cables a otros equipos (por ejemplo a un switch): cada cable crea una interfaz.',
            interfaces: 'Interfaces (una por cable)',
            interfacesHint: 'Cada interfaz tiene su propia IP y pertenece a una red distinta.',
            staticRoutes: 'Rutas estáticas',
            staticRoutesHint: 'Una por línea: {format}. Ruta predeterminada: {default}. Las redes de sus interfaces ya son conocidas.',
            apply: 'Aplicar',
            invalidIface: 'IP o máscara inválida en la interfaz hacia {name}.',
            invalidRoute: 'Ruta inválida: «{line}». Usá: 10.0.0.0/24 via 192.168.2.2',
            applied: '{name}: interfaces y rutas aplicadas.'
        },
        browser: {
            go: 'Ir',
            hint: 'Introduce una URL como {example} o la IP del Router para navegar.',
            noIp: 'El equipo no posee una IP válida asignada (Dirección APIPA o sin red).',
            emptyUrl: 'URL vacía',
            emptyUrlMsg: 'Escribí una dirección, por ejemplo www.ejemplo.com o una IP.',
            dnsUnreachable: 'No se pudo consultar al servidor DNS ({dns}): está apagado o no es alcanzable.',
            dnsUnknownHost: 'El servidor DNS ({dns}) no conoce el nombre «{host}».',
            pageLoaded: 'Página cargada exitosamente',
            pageLoadedCloud: 'Conexión a Internet establecida a través de la nube ISP.',
            noDnsNoInternet: 'No hay servidor DNS ni salida a Internet alcanzable desde esta red.',
            nameNotResolved: 'No se pudo resolver el nombre.',
            timeout: 'El equipo {ip} no responde. Revisá cables, IP, máscara, puerta de enlace y rutas.',
            mgmtPanel: 'Panel de gestión ({name})',
            connectedTo: 'Conexión establecida con {name} ({ip}).',
            statusOnline: 'Estado: EN LÍNEA',
            dhcpActive: 'DHCP: ACTIVO',
            dhcpInactive: 'DHCP: INACTIVO',
            pageLoadedIp: 'Conexión a Internet establecida ({ip}).',
            responded: 'Respondió {name} ({ip}).'
        },
        vpn: {
            statusOk: '● Conectado',
            statusOff: '○ Sin VPN',
            statusError: '✖ Sin conexión',
            serverCloud: 'Servidor VPN {cloud} (como el coordinador de Tailscale o ZeroTier): conectalo al acceso a Internet. Los equipos se encuentran a través de él; si pueden verse entre sí hablan directo, y si no, el tráfico pasa por este servidor.',
            serverLocal: 'Servidor VPN {local} (como WireGuard u OpenVPN): conectalo a la red de la escuela o la oficina. Todos los equipos se conectan a él y el tráfico de la VPN pasa por él.',
            inCloud: 'en la nube',
            local: 'local',
            service: 'Servicio',
            network: 'Red VPN',
            serverOn: 'Servidor encendido',
            members: 'Equipos en esta VPN ({count})',
            noMembers: 'Todavía no hay equipos. Abrí las propiedades de una PC, notebook o celular y elegí esta VPN en su pestaña «VPN».',
            clientIntro: 'Una VPN le da a este equipo una segunda IP, la de la VPN, además de la de su red local. Con ella puede comunicarse con otros equipos de la VPN como si estuvieran en su misma red, estén donde estén.',
            connectTo: 'Conectarse a la VPN',
            noVpn: 'Sin VPN',
            noServers: 'No hay servidores VPN en la red. Agregá uno desde la barra lateral («VPN en la nube» o «Servidor VPN local») y conectalo con un cable.',
            localIp: 'IP de la red local:',
            vpnIp: 'IP de la VPN:',
            status: 'Estado:'
        },
        msg: {
            switchLayer: 'Switch configurado en Capa {layer}',
            nameEmpty: 'El nombre no puede quedar vacío.',
            dhcpRangeInvalid: 'Rango DHCP inválido: debe estar dentro de la subred y no incluir la IP del gateway.',
            dhcpRangeApplied: 'Rango DHCP aplicado.',
            portsInvalid: 'Los puertos tienen que ser números entre 1 y 65535.',
            portTargetMissing: 'Elegí a qué equipo de la red querés redirigir el puerto.',
            portRuleExists: 'Ya hay una regla para {proto} {port}.',
            portRuleAdded: 'Regla agregada: {proto} {ext} → {ip}:{port}.',
            wifiNameEmpty: 'El nombre de la red no puede quedar vacío.',
            wifiNameTaken: 'Ya existe otra red WiFi con ese nombre.',
            wifiPassShort: 'La contraseña WPA2 debe tener al menos 8 caracteres.',
            wifiRenamed: 'Red WiFi renombrada a «{ssid}». Los equipos deben reconectarse.',
            wifiPassUpdated: 'Contraseña WiFi actualizada. Los equipos deben reconectarse.',
            wifiWrongPass: 'Contraseña incorrecta. No se estableció la conexión WiFi.',
            wifiConnected: 'Conectado a la red WiFi {ssid}'
        }
    },

    // Fase 3 · zona 4 — mensajes dinámicos (toasts y diagnósticos):
    file: {
        myNetwork: 'Mi red',
        saved: 'Red «{name}» guardada.',
        loaded: 'Red «{name}» cargada.',
        submissionOpened: 'Entrega de {student} abierta.',
        cannotOpen: 'No se pudo abrir el archivo: {error}',
        unknownFormat: 'Formato no reconocido',
        invalidDevices: 'Hay dispositivos o direcciones IP inválidas',
        invalidConnections: 'Hay conexiones inválidas',
        demoLoaded: 'Topología de ejemplo cargada',
        confirmClear: '¿Seguro que quieres borrar todos los dispositivos y conexiones?',
        cleared: 'Área de trabajo limpiada'
    },
    toast: {
        deviceAdded: 'Dispositivo agregado: {name}',
        clickCableToDelete: 'Haz clic directamente en la línea del cable para eliminarlo',
        cableSourceSelected: 'Dispositivo origen seleccionado. Elige el destino.',
        selfConnection: 'No puedes conectar un dispositivo a sí mismo',
        linkExists: 'Ya existe un enlace entre estos equipos',
        connectionOk: 'Conexión física realizada con éxito',
        cableDeleted: 'Cable/Conexión eliminada correctamente',
        invalidIp: 'IP o máscara inválida. Usa una dirección de host y una máscara contigua.',
        ipAlreadyAssigned: 'Esa dirección IP ya está asignada a otro dispositivo.',
        invalidGateway: 'La puerta de enlace no es una IPv4 válida.',
        gatewayWrongSubnet: 'La puerta de enlace debe estar en la misma subred que el dispositivo.',
        ipConfigApplied: 'Configuración IP aplicada correctamente.',
        activityLoaded: 'Actividad cargada: {title}',
        activitySolved: '¡Actividad resuelta!'
    },
    diag: {
        dnsUnreachable: '{src} no llega al servidor DNS ({dns}): {reason}',
        dnsOffline: 'El servidor DNS {dns} está apagado.',
        dnsUnknownName: 'El servidor DNS {dns} no conoce el nombre {site}.',
        nameNoOwner: 'El nombre {site} apunta a {ip}, que no pertenece a ningún equipo.',
        nameWrongHost: 'El nombre {site} apunta a {owner} ({ip}), pero la página está en {dst}.',
        noDhcp: '{name} no obtuvo IP: ningún servidor DHCP le respondió (quedó con una dirección automática 169.254.x.x).',
        noPhysicalPath: 'No hay camino físico entre {src} y {dst}: falta un cable.',
        duplicateIp: '{a} y {b} tienen la misma IP ({ip}).',
        privateIp: 'La dirección {ip} es privada: desde otra red, Internet no sabe llegar a ella. Para comunicar redes distintas hace falta una VPN (o una IP pública).',
        subnetMismatch: '{src} y {dst} no coinciden en si están en la misma red: las máscaras de subred son distintas.',
        noRoute: '{name} no tiene ninguna ruta hacia {ip}.',
        noGateway: '{name} no tiene puerta de enlace: no sabe salir de su red.',
        gatewayMissing: 'La puerta de enlace de {name} ({gateway}) no existe en la red.',
        gatewayWrongNetwork: 'La puerta de enlace {gateway} no está en la misma red que {name} ({ip}): revisá su IP y su máscara.',
        pathNotViaGateway: 'El camino de {name} no pasa por su puerta de enlace {gateway}.',
        routeWrongNextHop: 'La ruta de {name} apunta a {via}, que no es el siguiente equipo.'
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
        statusIdle: 'Selecciona origen, destino y protocolo para visualizar el recorrido.',
        modeAdvancedHint: 'Modo avanzado: verás capas, tablas ARP/MAC/DNS y rutas.',
        modeSimpleHint: 'Modo simple: solo el recorrido del paquete.',
        paused: 'En pausa. Presiona ▶ para continuar.',
        stepOf: 'Paso {step} de {total}',
        stepHint: 'Paso a paso: leé el cartel y presioná ▶ (o la barra espaciadora) para continuar.',
        tablesCleared: 'Tablas ARP y MAC borradas. La próxima comunicación vuelve a empezar desde cero.',
        gatewayHint: ' (su puerta de enlace)',
        table: {
            empty: '(vacía)',
            new: '● NUEVA',
            arpTitle: 'Tabla ARP de {name}',
            macTitle: 'Tabla MAC de {name}',
            dnsTitle: 'Tabla DNS de {name}',
            routesTitle: 'Tabla de rutas de {name}',
            leaseTitle: 'Concesión DHCP de {name}',
            vpnMembersTitle: 'Equipos conectados a {name} ({preset})',
            headName: 'Nombre',
            headIp: 'IP',
            headMac: 'MAC',
            headPort: 'Puerto hacia',
            headDest: 'Destino',
            headOut: 'Salida',
            headData: 'Dato',
            headValue: 'Valor',
            headVpnIp: 'IP VPN',
            headDevice: 'Equipo',
            dhcpIp: 'Dirección IP',
            dhcpMask: 'Máscara',
            dhcpGateway: 'Puerta de enlace',
            dhcpServer: 'Servidor DHCP',
            routeConnected: 'conectada · interfaz hacia {name}',
            routeVia: 'vía {via}',
            routeLocal: 'red local (conectada)',
            routeDefault: 'ruta predeterminada → {name}'
        },
        // Textos de cada protocolo durante la simulación (pedido / destino / respuesta).
        text: {
            icmp: {
                req: '{s} envía un ping a {d}: «¿estás ahí?»',
                dest: '{d} recibe el ping y prepara la respuesta',
                rep: '{d} responde «¡sí, acá estoy!» (echo reply)'
            },
            arp: {
                req: '{s} pregunta: «¿Quién tiene la IP {ip}? ¿Cuál es su MAC?»',
                dest: '{d} reconoce su IP y prepara su respuesta',
                rep: '{d} contesta: «Esa IP es mía, esta es mi dirección MAC»'
            },
            dns: {
                req: '{s} pregunta: «¿Qué IP tiene {site}?»',
                dest: '{d} busca el nombre en su tabla de dominios',
                rep: '{d} responde: {site} = {ip}',
                repUnknown: '{d} responde: «no conozco el nombre {site}» (no existe)'
            },
            http: {
                req: '{s} pide una página web a {d} (HTTP GET)',
                dest: '{d} prepara la página solicitada',
                rep: '{d} envía la página (200 OK)'
            },
            syn: {
                req: '1/3 SYN: {s} dice «quiero abrir una conexión TCP con {d}»',
                dest: '{d} acepta abrir la conexión y prepara su respuesta',
                rep: '2/3 SYN-ACK: {d} responde «de acuerdo, ¿me confirmás?»'
            },
            discover: {
                req: '1/4 Discover: {s} no tiene IP y le grita a toda la red: «¿Hay algún servidor DHCP?»',
                dest: '{d} (servidor DHCP) escucha el pedido y elige una IP libre de su rango',
                rep: '2/4 Offer: {d} le ofrece a {s} la IP {ip}'
            },
            request: {
                req: '3/4 Request: {s} acepta la oferta: «Quiero usar la IP {ip}»',
                dest: '{d} reserva la IP {ip} para ese equipo',
                rep: '4/4 Ack: {d} confirma «es tuya» y entrega máscara y puerta de enlace'
            }
        },
        node: {
            switch: '{name} (switch) recibe la trama y la reenvía por el puerto correcto',
            router: '{name} (router) recibe el paquete y decide por dónde enviarlo',
            cloud: '{name} (Internet) recibe el paquete y lo hace avanzar',
            vpn: '{name} (servidor VPN) recibe el tráfico cifrado y lo reenvía',
            default: '{name} recibe el paquete y lo pasa al siguiente equipo'
        },
        // Carteles (lo que se ve sobre el lienzo) y líneas del log de tráfico.
        cap: {
            arpKnown: '{s} ya conoce la MAC de {hop} ({ip}). Mira su tabla ARP: no necesita preguntar de nuevo.',
            arpUnknown: '{s} no conoce la MAC de {hop}{gw}. Antes de enviar datos, la pregunta con ARP.',
            noPath: '{s} no puede llegar a {d}: no hay cables ni Wi‑Fi que los unan',
            travel: '{from} → {to}: el paquete viaja por {link}',
            travelWifi: 'Wi‑Fi',
            travelCable: 'el cable',
            back: '{from} → {to}: la respuesta regresa',
            dnsKnown: '{s} ya conoce la IP de {name} (tabla DNS): no necesita preguntar.',
            dnsAsk: '{s} conoce el nombre {name} pero no su IP. Primero le pregunta a un servidor DNS ({dns}).',
            dnsWrongHost: 'El nombre {name} apunta a {real} ({ip}), no a {dest}. La página se pide a {real}.'
        },
        log: {
            arpKnown: '{s} usa su tabla ARP (ya conoce a {hop}).',
            arpUnknown: '{s} no tiene a {hop} en su tabla ARP: hace una consulta ARP primero.',
            noPath: 'FALLO: {s} no tiene una ruta de enlaces hasta {d}.',
            route: '{label} · Recorrido: {path}',
            arpSave: '{name} guarda en su tabla ARP: {ip} → {mac}.',
            dnsSave: '{name} guarda en su tabla DNS: {site} → {ip}.',
            dnsNeed: '{s} necesita resolver {name} con DNS.',
            dnsWrongHost: '{name} → {ip}: el pedido va a {real}.',
            vpnForward: '{name} (servidor VPN) reenvía el tráfico del túnel hacia {ip}.',
            switchLearned: '{name} (switch) aprendió la MAC de {mac} y reenvía por todos los puertos.',
            switchKnew: '{name} (switch) ya conocía la MAC de {mac} y reenvía por todos los puertos.',
            switchLearnedOne: '{name} (switch) aprendió la MAC de {mac} y reenvía solo por un puerto.',
            switchKnewOne: '{name} (switch) ya conocía la MAC de {mac} y reenvía solo por un puerto.',
            routeNotFound: '{name} no tiene ruta hacia {ip}: paquete descartado.',
            routeWrongNext: 'Siguiente salto incorrecto en {name}.',
            routeConnected: '{name} busca {ip} en su tabla de rutas: está en una red conectada a una de sus interfaces.',
            routeStatic: '{name} busca {ip} en su tabla de rutas: usa la ruta {net}/{prefix} vía {via}.',
            routeLocal: '{name} busca {ip} en su tabla de rutas: es de su red local.',
            routeDefault: '{name} busca {ip} en su tabla de rutas: usa la ruta predeterminada.',
            end: 'Fin: {label} completado con éxito.'
        },
        layer: {
            encapTitle: 'Encapsulación en {name}: cada capa agrega su encabezado',
            decapTitle: 'Desencapsulación en {name}: se quita una capa a la vez, de afuera hacia adentro',
            vpnDecrypt: 'El servidor VPN descifra el paquete, lee la IP VPN de destino y lo vuelve a cifrar hacia el otro equipo',
            switchBroadcast: 'Difusión (FF:FF…): el switch la envía por TODOS los puertos',
            switchKnown: 'El switch ya conoce la MAC destino: la envía solo por un puerto',
            switchUnknown: 'El switch todavía no conoce la MAC destino: la envía por todos los puertos (inundación)',
            routerArp: 'Ojo: ARP normalmente no cruza un router; solo sirve dentro de la misma red',
            routerNewFrame: 'El router lee la IP, descarta la trama vieja y arma otra con nuevas MAC',
            routerRoute: 'El router lee la IP, elige la interfaz de salida y arma una trama nueva con otras MAC',
            travels: 'Viaja el paquete completo, con todas sus capas juntas'
        },
        route: {
            notFound: '{name} busca {ip} en su tabla de rutas y no encuentra ninguna: descarta el paquete. Falta agregar una ruta.',
            wrongNext: 'La ruta de {name} apunta a {via}, pero el siguiente equipo conectado es {next}. Revisá la ruta o los cables.'
        },
        done: {
            syn: '¡Listo! La conexión TCP entre {s} y {d} está abierta. Ahora {s} confirma (ACK) y pide la página.',
            discover: '¡Listo! {s} recibió una oferta de {d}: la IP {ip}. Ahora la va a aceptar.',
            dns: '¡Listo! {s} ya sabe que {site} es {ip}. Ahora sí pide la página web.',
            arp: '¡Listo! {s} ya sabe la MAC de {d} y la guardó en su tabla ARP. Ahora sí envía el {pre}.',
            request: '¡Listo! {s} ya tiene IP: {ip}, puerta de enlace {gw}. Ya puede comunicarse con la red.',
            reply: '¡Listo! {s} recibió la respuesta de {d}. La comunicación funciona.'
        },
        fail: {
            noGateway: '{s} quiere llegar a otra red ({ip}) pero no tiene puerta de enlace: no sabe por dónde salir.',
            logNoGateway: '{s} no tiene puerta de enlace configurada.',
            gatewayMissing: 'La puerta de enlace de {s} ({gw}) no existe en esta red: el paquete no sabe por dónde salir.',
            logGatewayMissing: 'La puerta de enlace {gw} no existe.',
            gatewayOtherNet: 'La puerta de enlace {gw} no está en la misma red que {s} ({ip}): revisá su IP y su máscara.',
            logGatewayOtherNet: 'Puerta de enlace fuera de la red de {s}.',
            pathNotViaGw: 'El camino hacia {d} no pasa por la puerta de enlace {gw}. Revisá los cables.',
            logPathNotViaGw: 'El camino físico no pasa por {gw}.',
            destNoGateway: '{d} recibiría el paquete pero no sabe cómo responder: {reason}.',
            logDestNoGateway: '{d} no puede responder (puerta de enlace).',
            reasonGwMissing: 'su puerta de enlace {gw} no existe',
            reasonNoGw: 'no tiene puerta de enlace',
            dnsOff: '{d} (servidor DNS) está apagado: nadie responde a la consulta.',
            logDnsOff: '{d} está apagado.',
            noDnsPath: '{s} no puede llegar al servidor DNS {dns}: no hay camino.',
            logNoDnsPath: 'Sin camino hasta el servidor DNS {dns}.',
            noIpOwner: 'El nombre {name} se resolvió a {ip}, pero ningún equipo de la red tiene esa IP.',
            logNoIpOwner: 'Ningún equipo tiene la IP {ip}.',
            noPathToReal: '{name} apunta a {real} ({ip}), pero no hay camino hasta ese equipo.',
            logNoPathToReal: 'Sin camino hasta {real}.',
            dnsNameMissing: '{d} no conoce el nombre {site} y responde «no existe». Agregalo en los registros del servidor DNS.',
            logDnsNameMissing: '{d}: el nombre {site} no existe.',
            dhcpStaticIp: '{s} tiene IP fija: no usa DHCP. Cambiá su modo a DHCP en la configuración IP.',
            logDhcpStaticIp: '{s} usa IP fija, no pide IP por DHCP.',
            dhcpNotServer: '{s} no es un servidor DHCP (o lo tiene apagado): nadie responde al Discover.',
            logDhcpNotServer: '{s} no responde DHCP.',
            dhcpNoIp: '{s} no pudo ofrecer una IP a {target}: revisá el rango DHCP del servidor (o que el cable llegue hasta él).',
            logDhcpNoIp: '{s} no tiene IP para ofrecer a {target}.'
        },
        status: {
            noPath: 'FALLO: no existe un camino físico entre origen y destino.',
            running: '{label}: {s} ⇄ {d} · {hops} salto(s) de ida y otros {hops} de vuelta',
            completed: 'COMPLETADO: {label} fue y volvió entre {s} y {d}.'
        },
        toast: {
            needTwoDevices: 'Agrega al menos dos dispositivos para simular una comunicación.',
            sameDevice: 'El origen y el destino deben ser diferentes.',
            noPath: 'No hay un camino conectado entre esos dispositivos.',
            completed: 'Simulación {label} completada.'
        },
        req: {
            vpn: '{s} (IP VPN {srcIp}) le escribe a {d} (IP VPN {dstIp}) por el túnel {preset}{mode}',
            vpnRelay: ' · pasa por el servidor VPN',
            vpnDirect: ' · conexión directa',
            ackGet: '3/3 ACK: {s} confirma la conexión y pide la página a {d} (HTTP GET)'
        },
    },
    act: {
        close: 'Cerrar actividad',
        verify: 'Verificar',
        hint: 'Pista',
        deliverTitle: 'Guardar y entregar',
        defaultTitle: 'Actividad',
        defaultHint: 'Probá la simulación en modo avanzado para ver dónde se corta.',
        tip: 'Tip: usá la simulación en modo avanzado para ver dónde se corta.',
        level: {
            easy: 'Fácil',
            medium: 'Medio',
            hard: 'Difícil'
        },
        goal: {
            prefix: '🎯 Objetivo: {goals}.',
            comm: 'que {a} y {b} se comuniquen',
            vpn: 'que {a} y {b} se comuniquen por la VPN',
            site: 'que {a} pueda abrir {site}',
            and: ' y '
        },
        student: {
            label: '👤 Alumno: {name}',
            prompt: '👤 Escribí tu nombre con el botón de arriba para que quede en tu entrega.'
        },
        submission: {
            label: '📥 Entrega de {student} · guardada {date} · el alumno la marcó como {state}. Usá «Verificar» para comprobarlo ahora.',
            solved: 'resuelta ✅',
            unsolved: 'sin resolver ❌'
        },
        msg: {
            solved: '✅ ¡Resuelto{student}! La red funciona. Guardá la red para entregarla.',
            notYetLabel: 'Todavía no:',
            notYet: '{a} y {b} no logran comunicarse. Usá «Pista» si te trabás.',
            diagnosticLabel: 'Diagnóstico:',
            noProblems: '✅ No queda ningún problema: ¡ya está resuelta!',
            deviceRemoved: 'Alguno de los equipos de la actividad fue eliminado.'
        },
        builtin: {
            1: {
                title: 'La PC que no sale',
                story: 'PC_A1 puede hablar con PC_A2, pero no logra comunicarse con PC_B1, que está en otra red.',
                hint: 'Para salir de su red, una PC necesita saber a quién entregarle los paquetes. Revisá su configuración IP.'
            },
            2: {
                title: 'El cable suelto',
                story: 'PC_B1 dejó de responder. Todo parece estar bien configurado.',
                hint: 'Mirá los cables con atención: ¿está cada equipo conectado a su switch? Usá «Conectar Cable» para arreglarlo.'
            },
            3: {
                title: 'Dos con la misma IP',
                story: 'PC_A1 y PC_A2 están en la misma red pero la comunicación es un desastre.',
                hint: 'Cada equipo necesita una dirección IP única. Compará las IP de los dos.'
            },
            4: {
                title: 'La máscara que no coincide',
                story: 'PC_A1 cree que PC_A2 está en su misma red, pero PC_A2 opina otra cosa.',
                hint: 'Mirá la máscara de subred de PC_A2 y compará a qué red pertenece cada IP.'
            },
            5: {
                title: 'Llega pero no vuelve',
                story: 'Los paquetes de PC_A1 llegan a PC_B1, pero la respuesta nunca regresa.',
                hint: 'Una respuesta también tiene que salir de la red de PC_B1. Revisá su puerta de enlace.'
            },
            6: {
                title: 'Falta una ruta',
                story: 'Dos routers unen las redes 192.168.1.0/24 y 192.168.2.0/24. La ida funciona, pero PC_A1 no recibe respuesta de PC_B1.',
                hint: 'Mirá la tabla de rutas de los dos routers: ¿el segundo sabe cómo volver a la red 192.168.1.0/24? Las rutas se agregan en la pestaña «Interfaces y rutas».'
            },
            7: {
                title: 'El nombre no existe',
                story: 'PC_A1 puede hacer ping a Servidor_Web por su IP, pero al escribir www.ejemplo.com la página no abre.',
                hint: 'El ping por IP funciona, así que la red está bien. Mirá qué sabe el servidor DNS: ¿tiene un registro para ese nombre?'
            },
            8: {
                title: 'El DNS que no contesta',
                story: 'Ayer la página abría perfecto. Hoy nadie puede entrar a www.ejemplo.com.',
                hint: 'Revisá el estado del servidor DNS: ¿está encendido?'
            },
            9: {
                title: 'La página equivocada',
                story: 'Al escribir www.ejemplo.com se abre una página, pero no es la del Servidor_Web. Alguien tocó el DNS.',
                hint: 'Compará la IP del registro DNS con la IP real de Servidor_Web.'
            },
            10: {
                title: 'La PC sin IP',
                story: 'Dos PC de la red del aula no logran comunicarse. Sus IP empiezan con 169.254.',
                hint: 'Esas direcciones aparecen cuando nadie les da una IP. Revisá el servidor DHCP del router.'
            },
            11: {
                title: 'La salida a Internet',
                story: 'Router_Central une la red 192.168.1.0/24 con el proveedor de Internet (203.0.113.1). PC_A1 no llega a Internet (8.8.8.8).',
                hint: 'El router no sabe dónde queda Internet. Falta una ruta predeterminada (0.0.0.0/0) que apunte al proveedor: 203.0.113.1.'
            },
            12: {
                title: 'Dos fallas juntas',
                story: 'La red de dos routers sigue sin comunicar PC_A1 con PC_B1. Esta vez hay más de un problema.',
                hint: 'Arreglá un problema y verificá de nuevo: puede quedar otro. Revisá la puerta de enlace de PC_B1 y las rutas de los dos routers.'
            },
            13: {
                title: 'La VPN de la oficina no conecta',
                story: 'La oficina tiene un servidor VPN (WireGuard) adentro de su red. Desde la casa quieren entrar a la VPN, pero PC_Casa1 no logra conectarse.',
                hint: 'El servidor está dentro de la red privada de la oficina: desde Internet no se llega a él. Mirá el panel del servidor VPN y el Port Forwarding del router de la oficina.'
            },
            14: {
                title: 'El puerto está mal abierto',
                story: 'Alguien abrió un puerto en el router de la oficina para la VPN, pero PC_Casa1 sigue sin poder conectarse.',
                hint: 'La regla existe, pero tiene un error. Revisá el protocolo (¿UDP o TCP?), los dos puertos y a qué equipo redirige.'
            },
            15: {
                title: 'El servidor VPN está apagado',
                story: 'Ayer la casa y la oficina se veían por la VPN. Hoy ninguna PC logra comunicarse con la otra.',
                hint: 'Abrí las propiedades del servidor VPN en la nube y revisá su estado.'
            },
            16: {
                title: 'Falta unir un equipo a la VPN',
                story: 'PC_Casa1 ya está en la VPN, pero no logra comunicarse con PC_Oficina1.',
                hint: 'Mirá las dos PC: una de ellas no tiene la segunda IP (la de la VPN). Abrí sus propiedades y buscá la pestaña VPN.'
            },
            17: {
                title: 'Unir dos redes con una VPN',
                story: 'La casa y la oficina tienen cada una su router y su Internet, pero sus PC no se ven entre sí. Armá una VPN para que PC_Casa1 y PC_Oficina1 se comuniquen como si estuvieran en la misma red.',
                hint: 'Dos redes privadas no se ven por Internet. Agregá un «VPN en la nube», conectalo con un cable a Internet y unile las dos PC desde la pestaña VPN de cada una.'
            },
            18: {
                title: 'La VPN con dos problemas',
                story: 'La oficina tiene un servidor VPN local. PC_Casa1 y PC_Oficina1 deberían comunicarse por la VPN, pero no lo logran. Esta vez hay más de un problema.',
                hint: 'Arreglá un problema y verificá otra vez: puede quedar otro. Pensá en cómo se llega desde afuera al servidor y en si las dos PC están en la VPN.'
            }
        }
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
