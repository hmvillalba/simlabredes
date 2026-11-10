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
            emptyUrlMsg: 'Escribí una dirección, por ejemplo www.ejemplo.com o una IP.'
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
        statusIdle: 'Selecciona origen, destino y protocolo para visualizar el recorrido.'
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
