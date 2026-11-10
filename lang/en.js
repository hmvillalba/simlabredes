// lang/en.js — English dictionary.
//
// The Spanish dictionary (lang/es.js) is the source of truth and the fallback.
// Every key here must exist in lang/es.js with the same name: the checker
// `node tools/check_keys.mjs --all` compares both dictionaries.
//
// Rules:
//  - Interpolation with {variable}.
//  - Technical terms (DHCP, ARP, MAC, VLAN, gateway…) stay as they are.
//  - The device CLI output is not translated (it lives in index.html).
window.I18N_DICTS = window.I18N_DICTS || {};
window.I18N_DICTS.en = {
    _meta: { name: 'English', dir: 'ltr' },

    app: {
        title: 'Educational Network Simulator',
        tagline: 'Interactive Network Simulator for Students'
    },

    ui: {
        langSelector: 'Idioma / Language',
        cancel: 'Cancel'
    },

    header: {
        toolSelect: 'Move / Select',
        toolCable: 'Connect Cable',
        toolDeleteCable: 'Delete Cable',
        undo: 'Undo (Ctrl+Z)',
        redo: 'Redo (Ctrl+Y)',
        deliver: 'Submit',
        deliverTitle: 'Save your work with your name to hand it in to your teacher',
        studentDefault: 'Student',
        studentTitle: 'Your name is stored in the networks and activities you save',
        activities: 'Activities',
        activitiesTitle: 'Networks with faults to solve',
        support: 'Support',
        supportTitle: 'About the simulator and support the author'
    },
    menu: {
        file: 'File',
        view: 'View',
        saveNetwork: 'Save network…',
        openNetwork: 'Open network…',
        exportAs: 'Export the network as…',
        imagePng: 'PNG image',
        imageJpg: 'JPG image',
        docPdf: 'PDF document (with device list)',
        offlineCopy: 'Save a copy to use without internet',
        offlineCopyTitle: 'Download a version of this simulator that works offline (internet is only needed once)',
        forTeacher: 'For the teacher',
        makeActivity: 'Create an activity with this network…',
        gradeDeliveries: 'Grade submissions…',
        loadDemo: 'Load example',
        demoVpnLocal: 'Example: local VPN (open ports)',
        demoVpnLocalTitle: 'VPN inside the office network: to reach it from outside you must open a port on the router',
        demoVpnCloud: 'Example: 2 networks joined by a VPN',
        demoVpnCloudTitle: 'Home and office, each with its own router and internet, joined by a cloud VPN',
        demoTwoNetworks: 'Example: 2 networks',
        demoTwoNetworksTitle: 'Two networks joined by a router with several interfaces',
        clearAll: 'Clear everything',
        devicesPanel: 'Device panel',
        simPanel: 'Simulation panel',
        themeLight: 'Light mode',
        themeDark: 'Dark mode',
        tour: 'Guided tour',
        aboutRights: 'About · Rights',
        project: 'Project in class',
        projectTitle: 'Full screen with large text (Esc to exit)'
    },

    // Fase 3 · zona 2 — paneles (paleta, lienzo, simulación, actividad):
    device: {
        paletteTitle: 'Add devices',
        paletteHint: 'Click a device to add it. Double-click a device on the canvas to open its settings; the Del key removes it.',
        legendTitle: 'Status legend:',
        legendOk: 'Connected / Valid IP',
        legendApipa: 'APIPA (No IP / No DHCP)',
        legendError: 'Disconnected / Subnet error',
        aboutTitle: 'About this simulator',
        type: {
            router: 'WiFi router', routerDesc: 'Gateway + DHCP + WiFi',
            lrouter: 'Router (several networks)', lrouterDesc: 'Interfaces + routing table',
            notebook: 'Notebook', notebookDesc: 'Cable or WiFi',
            netbook: 'Netbook', netbookDesc: 'Small laptop, cable or WiFi',
            tv: 'Smart TV', tvDesc: 'WiFi or cable · browser',
            vpncloud: 'Cloud VPN (VPS)', vpncloudDesc: 'Tailscale / ZeroTier type',
            vpnlocal: 'Local VPN server', vpnlocalDesc: 'WireGuard / OpenVPN type',
            dns: 'DNS server', dnsDesc: 'Name → IP records',
            switch: 'Switch (L2 / L3)', switchDesc: 'Layer 2 or Layer 3 (Multilayer)',
            pc: 'Computer (PC)', pcDesc: 'Ethernet / Console / Web',
            phone: 'WiFi smartphone', phoneDesc: 'Wireless connection',
            cloud: 'Internet (ISP Cloud)', cloudDesc: 'Access to the World Wide Web'
        },
        // Default device names on the canvas ({id} = device number).
        // They are generated in the active language; they are kept as they are
        // when exporting/importing a network.
        defaultName: {
            notebook: 'Notebook_{id}',
            netbook: 'Netbook_{id}',
            tv: 'SmartTV_{id}',
            router: 'WiFi_Router_{id}',
            lrouter: 'Router_{id}',
            dns: 'DNS_{id}',
            vpnCloud: 'Cloud_VPN_{id}',
            vpnLocal: 'Local_VPN_{id}',
            switch: 'LAN_Switch_{id}',
            pc: 'Student_PC_{id}',
            phone: 'Smartphone_{id}',
            cloud: 'Internet_ISP',
            other: 'Device_{id}'
        },
        layer2: 'Layer 2 mode'
    },
    canvas: {
        cableMode: 'Cable mode: click two devices to connect them',
        deleteCableMode: 'Delete cable mode: click on any cable on the screen to cut it',
        emptyTitle: 'Your workspace is empty',
        emptyHintA: 'Add devices from the panel on the left, or open an example from',
        zoomIn: 'Zoom in (+) key',
        zoomReset: 'Back to 100%',
        zoomOut: 'Zoom out (-) key',
        fitView: 'View the whole network (0 key)',
        projectExit: 'Exit projection'
    },
    sim: {
        title: 'Simulate communication',
        hidePanel: 'Hide panel',
        start: 'Start',
        pause: 'Pause / continue',
        stop: 'Stop simulation',
        all: 'Everyone browsing at once',
        allTitle: 'All devices communicate at the same time, until you decide to stop it',
        modeLabel: 'Simulation mode',
        modeSimple: '🟢 Simple mode: just the journey',
        modeAdvanced: '🔬 Advanced mode: layers, ARP, MAC, DNS and routes',
        source: 'Source',
        destination: 'Destination',
        protocolLabel: 'Type of communication',
        protocol: {
            icmp: 'ICMP / Ping',
            arp: 'ARP / Find MAC',
            dns: 'DNS / Resolve name',
            http: 'HTTP / Web request',
            dhcp: 'DHCP / Request IP'
        },
        auto: 'Automatic',
        noDevices: 'No devices',
        site: 'Site name (HTTP/DNS)',
        dnsServer: 'DNS server',
        tcpHandshake: 'Show the TCP handshake (SYN, SYN-ACK, ACK) before HTTP',
        speed: 'Speed',
        speedSlow: 'Slower',
        speedFast: 'Faster',
        speedLabel: 'Simulation speed',
        layers: 'Show layers',
        vpn: 'Send through the VPN (encrypted tunnel with a VPN IP)',
        vpnTitle: 'If source and destination are in the same VPN, the packet travels inside the encrypted tunnel',
        step: 'Step by step (wait for my OK on each card)',
        stepTitle: 'The simulation stops at each step until you press ▶ (or the space bar)',
        clearTables: 'Clear tables (ARP, MAC, DNS)',
        clearTablesTitle: 'Empties the ARP tables of the devices and the MAC tables of the switches',
        statusIdle: 'Choose source, destination and protocol to see the journey.',
        modeAdvancedHint: 'Advanced mode: you will see layers, ARP/MAC/DNS tables and routes.',
        modeSimpleHint: 'Simple mode: only the journey of the packet.',
        paused: 'Paused. Press ▶ to continue.',
        stepOf: 'Step {step} of {total}',
        stepHint: 'Step by step: read the card and press ▶ (or the space bar) to continue.',
        tablesCleared: 'ARP and MAC tables cleared. The next communication starts from scratch.',
        gatewayHint: ' (its gateway)',
        legNatRedirect: '{ip} → {public}:{port} (the router redirects it to {target})',
        table: {
            empty: '(empty)',
            new: '● NEW',
            arpTitle: 'ARP table of {name}',
            macTitle: 'MAC table of {name}',
            dnsTitle: 'DNS table of {name}',
            routesTitle: 'Routing table of {name}',
            leaseTitle: 'DHCP lease of {name}',
            vpnMembersTitle: 'Devices connected to {name} ({preset})',
            headName: 'Name',
            headIp: 'IP',
            headMac: 'MAC',
            headPort: 'Port towards',
            headDest: 'Destination',
            headOut: 'Outgoing',
            headData: 'Data',
            headValue: 'Value',
            headVpnIp: 'VPN IP',
            headDevice: 'Device',
            dhcpIp: 'IP address',
            dhcpMask: 'Mask',
            dhcpGateway: 'Gateway',
            dhcpServer: 'DHCP server',
            routeConnected: 'connected · interface towards {name}',
            routeVia: 'via {via}',
            routeLocal: 'local network (connected)',
            routeDefault: 'default route → {name}'
        },
        // Texts of each protocol during the simulation (request / destination / reply).
        text: {
            icmp: {
                req: '{s} sends a ping to {d}: "are you there?"',
                dest: '{d} receives the ping and prepares the reply',
                rep: '{d} replies "yes, I am here!" (echo reply)'
            },
            arp: {
                req: '{s} asks: "who has the IP {ip}? what is its MAC?"',
                dest: '{d} recognises its IP and prepares its reply',
                rep: '{d} answers: "that IP is mine, this is my MAC address"'
            },
            dns: {
                req: '{s} asks: "what IP does {site} have?"',
                dest: '{d} looks the name up in its domain table',
                rep: '{d} replies: {site} = {ip}',
                repUnknown: '{d} replies: "I do not know the name {site}" (it does not exist)'
            },
            http: {
                req: '{s} requests a web page from {d} (HTTP GET)',
                dest: '{d} prepares the requested page',
                rep: '{d} sends the page (200 OK)'
            },
            syn: {
                req: '1/3 SYN: {s} says "I want to open a TCP connection with {d}"',
                dest: '{d} agrees to open the connection and prepares its reply',
                rep: '2/3 SYN-ACK: {d} replies "agreed, shall I confirm?"'
            },
            discover: {
                req: '1/4 Discover: {s} has no IP and shouts to the whole network: "is there any DHCP server?"',
                dest: '{d} (DHCP server) listens to the request and picks a free IP from its range',
                rep: '2/4 Offer: {d} offers {s} the IP {ip}'
            },
            request: {
                req: '3/4 Request: {s} accepts the offer: "I want to use the IP {ip}"',
                dest: '{d} reserves the IP {ip} for that device',
                rep: '4/4 Ack: {d} confirms "it is yours" and delivers mask and gateway'
            }
        },
        node: {
            switch: '{name} (switch) receives the frame and forwards it through the right port',
            router: '{name} (router) receives the packet and decides where to send it',
            cloud: '{name} (Internet) receives the packet and moves it along',
            vpn: '{name} (VPN server) receives the encrypted traffic and forwards it',
            default: '{name} receives the packet and passes it to the next device'
        },
        // Cards shown over the canvas and lines of the traffic log.
        cap: {
            arpKnown: '{s} already knows the MAC of {hop} ({ip}). Look at its ARP table: it does not need to ask again.',
            arpUnknown: '{s} does not know the MAC of {hop}{gw}. Before sending data, it asks with ARP.',
            noPath: '{s} cannot reach {d}: there are no cables or WiFi links joining them',
            travel: '{from} → {to}: the packet travels through the {link}',
            travelWifi: 'WiFi',
            travelCable: 'cable',
            back: '{from} → {to}: the reply comes back',
            dnsKnown: '{s} already knows the IP of {name} (DNS table): it does not need to ask.',
            dnsAsk: '{s} knows the name {name} but not its IP. First it asks a DNS server ({dns}).',
            dnsWrongHost: 'The name {name} points to {real} ({ip}), not to {dest}. The page is requested from {real}.'
        },
        log: {
            arpKnown: '{s} uses its ARP table (it already knows {hop}).',
            arpUnknown: '{s} does not have {hop} in its ARP table: it queries ARP first.',
            noPath: 'FAIL: {s} has no link route to {d}.',
            route: '{label} · Journey: {path}',
            arpSave: '{name} stores in its ARP table: {ip} → {mac}.',
            dnsSave: '{name} stores in its DNS table: {site} → {ip}.',
            dnsNeed: '{s} needs to resolve {name} with DNS.',
            dnsWrongHost: '{name} → {ip}: the request goes to {real}.',
            vpnForward: '{name} (VPN server) forwards the tunnel traffic towards {ip}.',
            switchLearned: '{name} (switch) learned the MAC of {mac} and forwards through all ports.',
            switchKnew: '{name} (switch) already knew the MAC of {mac} and forwards through all ports.',
            switchLearnedOne: '{name} (switch) learned the MAC of {mac} and forwards through one port only.',
            switchKnewOne: '{name} (switch) already knew the MAC of {mac} and forwards through one port only.',
            routeNotFound: '{name} has no route to {ip}: packet discarded.',
            routeWrongNext: 'Wrong next hop on {name}.',
            routeConnected: '{name} looks for {ip} in its routing table: it is on a network connected to one of its interfaces.',
            routeStatic: '{name} looks for {ip} in its routing table: it uses the route {net}/{prefix} via {via}.',
            routeLocal: '{name} looks for {ip} in its routing table: it is on its local network.',
            routeDefault: '{name} looks for {ip} in its routing table: it uses the default route.',
            end: 'End: {label} completed successfully.'
        },
        layer: {
            encapTitle: 'Encapsulation in {name}: each layer adds its header',
            decapTitle: 'Decapsulation in {name}: one layer is removed at a time, from the outside in',
            vpnDecrypt: 'The VPN server decrypts the packet, reads the destination VPN IP and encrypts it again towards the other device',
            switchBroadcast: 'Broadcast (FF:FF…): the switch sends it through ALL ports',
            switchKnown: 'The switch already knows the destination MAC: it sends it through one port only',
            switchUnknown: 'The switch does not know the destination MAC yet: it sends it through all ports (flooding)',
            routerArp: 'Note: ARP normally does not cross a router; it only works inside the same network',
            routerNewFrame: 'The router reads the IP, discards the old frame and builds another one with new MACs',
            routerRoute: 'The router reads the IP, chooses the outgoing interface and builds a new frame with other MACs',
            travels: 'The whole packet travels, with all its layers together'
        },
        route: {
            notFound: '{name} looks for {ip} in its routing table and finds nothing: it discards the packet. A route is missing.',
            wrongNext: 'The route of {name} points to {via}, but the next connected device is {next}. Check the route or the cables.'
        },
        done: {
            syn: 'Done! The TCP connection between {s} and {d} is open. Now {s} confirms (ACK) and requests the page.',
            discover: 'Done! {s} received an offer from {d}: the IP {ip}. Now it will accept it.',
            dns: 'Done! {s} now knows that {site} is {ip}. Now it can request the web page.',
            arp: 'Done! {s} knows the MAC of {d} and stored it in its ARP table. Now it sends the {pre}.',
            request: 'Done! {s} now has an IP: {ip}, gateway {gw}. It can talk to the network.',
            reply: 'Done! {s} received the reply from {d}. The communication works.'
        },
        fail: {
            noGateway: '{s} wants to reach another network ({ip}) but has no gateway: it does not know how to get out.',
            logNoGateway: '{s} has no gateway configured.',
            gatewayMissing: 'The gateway of {s} ({gw}) does not exist in this network: the packet does not know how to get out.',
            logGatewayMissing: 'The gateway {gw} does not exist.',
            gatewayOtherNet: 'The gateway {gw} is not on the same network as {s} ({ip}): check its IP and its mask.',
            logGatewayOtherNet: 'Gateway outside the network of {s}.',
            pathNotViaGw: 'The path to {d} does not go through the gateway {gw}. Check the cables.',
            logPathNotViaGw: 'The physical path does not go through {gw}.',
            destNoGateway: '{d} would receive the packet but does not know how to reply: {reason}.',
            logDestNoGateway: '{d} cannot reply (gateway).',
            reasonGwMissing: 'its gateway {gw} does not exist',
            reasonNoGw: 'it has no gateway',
            dnsOff: '{d} (DNS server) is off: nobody answers the query.',
            logDnsOff: '{d} is off.',
            noDnsPath: '{s} cannot reach the DNS server {dns}: there is no path.',
            logNoDnsPath: 'No path to the DNS server {dns}.',
            noIpOwner: 'The name {name} resolved to {ip}, but no device in the network has that IP.',
            logNoIpOwner: 'No device has the IP {ip}.',
            noPathToReal: '{name} points to {real} ({ip}), but there is no path to that device.',
            logNoPathToReal: 'No path to {real}.',
            dnsNameMissing: '{d} does not know the name {site} and replies "it does not exist". Add it to the DNS server records.',
            logDnsNameMissing: '{d}: the name {site} does not exist.',
            dhcpStaticIp: '{s} has a fixed IP: it does not use DHCP. Change its mode to DHCP in the IP settings.',
            logDhcpStaticIp: '{s} uses a fixed IP, it does not ask for an IP via DHCP.',
            dhcpNotServer: '{s} is not a DHCP server (or it is off): nobody answers the Discover.',
            logDhcpNotServer: '{s} does not answer DHCP.',
            dhcpNoIp: '{s} could not offer an IP to {target}: check the DHCP range of the server (or that the cable reaches it).',
            logDhcpNoIp: '{s} has no IP to offer to {target}.'
        },
        status: {
            noPath: 'FAIL: there is no physical path between source and destination.',
            running: '{label}: {s} ⇄ {d} · {hops} hop(s) there and {hops} back',
            completed: 'COMPLETED: {label} went and came back between {s} and {d}.',
            stopped: 'Simulation stopped. You can start another communication.'
        },
        toast: {
            needTwoDevices: 'Add at least two devices to simulate a communication.',
            sameDevice: 'Source and destination must be different.',
            noPath: 'There is no connected path between those devices.',
            completed: 'Simulation {label} completed.'
        },
        req: {
            vpn: '{s} (VPN IP {srcIp}) writes to {d} (VPN IP {dstIp}) through the {preset} tunnel{mode}',
            vpnRelay: ' · it goes through the VPN server',
            vpnDirect: ' · direct connection between the devices',
            ackGet: '3/3 ACK: {s} confirms the connection and requests the page from {d} (HTTP GET)'
        },
    },

    // Fase 3 · zona 3 — modales y diálogos:
    act: {
        close: 'Close activity',
        verify: 'Verify',
        hint: 'Hint',
        deliverTitle: 'Save and submit',
        defaultTitle: 'Activity',
        defaultHint: 'Try the simulation in advanced mode to see where it breaks.',
        tip: 'Tip: use the simulation in advanced mode to see where it breaks.',
        level: {
            easy: 'Easy',
            medium: 'Medium',
            hard: 'Hard'
        },
        goal: {
            prefix: '🎯 Goal: {goals}.',
            comm: 'that {a} and {b} can communicate',
            vpn: 'that {a} and {b} can communicate through the VPN',
            site: 'that {a} can open {site}',
            and: ' and '
        },
        student: {
            label: '👤 Student: {name}',
            prompt: '👤 Write your name with the button above so it is included in your submission.'
        },
        submission: {
            label: '📥 Submission by {student} · saved {date} · the student marked it as {state}. Use "Verify" to check it now.',
            solved: 'solved ✅',
            unsolved: 'not solved ❌'
        },
        msg: {
            solved: '✅ Solved{student}! The network works. Save the network to submit it.',
            notYetLabel: 'Not yet:',
            notYet: '{a} and {b} cannot communicate. Use the hint if you get stuck.',
            diagnosticLabel: 'Diagnosis:',
            noProblems: '✅ There is no problem left: it is already solved!',
            deviceRemoved: 'One of the devices of the activity was removed.'
        },
        builtin: {
            1: {
                title: 'The PC that cannot get out',
                story: 'PC_A1 can talk to PC_A2, but it cannot reach PC_B1, which is on another network.',
                hint: 'To leave its network, a PC needs to know who to hand the packets to. Check its IP configuration.'
            },
            2: {
                title: 'The loose cable',
                story: 'PC_B1 stopped answering. Everything seems to be configured correctly.',
                hint: 'Look at the cables carefully: is every device connected to its switch? Use "Connect Cable" to fix it.'
            },
            3: {
                title: 'Two devices with the same IP',
                story: 'PC_A1 and PC_A2 are on the same network but the communication is a disaster.',
                hint: 'Every device needs a unique IP address. Compare the IPs of the two.'
            },
            4: {
                title: 'The mask that does not match',
                story: 'PC_A1 thinks PC_A2 is on its network, but PC_A2 thinks otherwise.',
                hint: 'Look at the subnet mask of PC_A2 and compare which network each IP belongs to.'
            },
            5: {
                title: 'It arrives but does not come back',
                story: 'The packets from PC_A1 reach PC_B1, but the reply never comes back.',
                hint: 'The reply also has to leave the network of PC_B1. Check its gateway.'
            },
            6: {
                title: 'A route is missing',
                story: 'Two routers join the networks 192.168.1.0/24 and 192.168.2.0/24. The trip works, but PC_A1 gets no answer from PC_B1.',
                hint: 'Look at the routing table of the two routers: does the second one know how to get back to the network 192.168.1.0/24? Routes are added in the "Interfaces and routes" tab.'
            },
            7: {
                title: 'The name does not exist',
                story: 'PC_A1 can ping Servidor_Web by its IP, but when typing www.ejemplo.com the page does not open.',
                hint: 'The ping by IP works, so the network is fine. Check what the DNS server knows: does it have a record for that name?'
            },
            8: {
                title: 'The DNS that does not answer',
                story: 'Yesterday the page opened perfectly. Today nobody can enter www.ejemplo.com.',
                hint: 'Check the state of the DNS server: is it on?'
            },
            9: {
                title: 'The wrong page',
                story: 'When typing www.ejemplo.com a page opens, but it is not the one of Servidor_Web. Somebody touched the DNS.',
                hint: 'Compare the IP of the DNS record with the real IP of Servidor_Web.'
            },
            10: {
                title: 'The PC without an IP',
                story: 'Two PCs of the classroom network cannot communicate. Their IPs start with 169.254.',
                hint: 'Those addresses appear when nobody gives them an IP. Check the DHCP server of the router.'
            },
            11: {
                title: 'The way out to the Internet',
                story: 'Router_Central joins the network 192.168.1.0/24 with the internet provider (203.0.113.1). PC_A1 cannot reach the Internet (8.8.8.8).',
                hint: 'The router does not know where the Internet is. A default route (0.0.0.0/0) pointing to the provider is missing: 203.0.113.1.'
            },
            12: {
                title: 'Two faults together',
                story: 'The two-router network still cannot connect PC_A1 with PC_B1. This time there is more than one problem.',
                hint: 'Fix one problem and verify again: there may be another one. Check the gateway of PC_B1 and the routes of the two routers.'
            },
            13: {
                title: 'The office VPN does not connect',
                story: 'The office has a VPN server (WireGuard) inside its network. From home they want to join the VPN, but PC_Casa1 cannot connect.',
                hint: 'The server is inside the private network of the office: it cannot be reached from the Internet. Look at the panel of the VPN server and the Port Forwarding of the office router.'
            },
            14: {
                title: 'The port is opened wrongly',
                story: 'Somebody opened a port on the office router for the VPN, but PC_Casa1 still cannot connect.',
                hint: 'The rule exists, but it has a mistake. Check the protocol (UDP or TCP?), the two ports and which device it redirects to.'
            },
            15: {
                title: 'The VPN server is off',
                story: 'Yesterday home and office could see each other through the VPN. Today no PC can talk to the other one.',
                hint: 'Open the settings of the cloud VPN server and check its state.'
            },
            16: {
                title: 'One device is not in the VPN',
                story: 'PC_Casa1 is already in the VPN, but it cannot talk to PC_Oficina1.',
                hint: 'Look at the two PCs: one of them does not have the second IP (the VPN one). Open their settings and look for the VPN tab.'
            },
            17: {
                title: 'Joining two networks with a VPN',
                story: 'Home and office each have their own router and their own internet, but their PCs cannot see each other. Build a VPN so that PC_Casa1 and PC_Oficina1 can talk as if they were on the same network.',
                hint: 'Two private networks cannot see each other over the Internet. Add a "Cloud VPN", connect it with a cable to the Internet and join the two PCs from the VPN tab of each one.'
            },
            18: {
                title: 'The VPN with two problems',
                story: 'The office has a local VPN server. PC_Casa1 and PC_Oficina1 should talk through the VPN, but they cannot. This time there is more than one problem.',
                hint: 'Fix one problem and verify again: there may be another one. Think about how to reach the server from outside and whether both PCs are in the VPN.'
            }
        }
    },

    // Fase 3 · zona 4 — mensajes dinámicos (toasts y diagnósticos):
    toast: {
        deviceAdded: 'Device added: {name}',
        clickCableToDelete: 'Click directly on the cable line to delete it',
        cableSourceSelected: 'Source device selected. Choose the destination.',
        selfConnection: 'You cannot connect a device to itself',
        linkExists: 'There is already a link between these devices',
        connectionOk: 'Physical connection made successfully',
        cableDeleted: 'Cable/connection deleted successfully',
        invalidIp: 'Invalid IP or mask. Use a host address and a contiguous mask.',
        ipAlreadyAssigned: 'That IP address is already assigned to another device.',
        invalidGateway: 'The gateway is not a valid IPv4 address.',
        gatewayWrongSubnet: 'The gateway must be on the same subnet as the device.',
        ipConfigApplied: 'IP configuration applied successfully.',
        activityLoaded: 'Activity loaded: {title}',
        activitySolved: 'Activity solved!'
    },
    diag: {
        dnsUnreachable: '{src} cannot reach the DNS server ({dns}): {reason}',
        dnsOffline: 'The DNS server {dns} is off.',
        dnsUnknownName: 'The DNS server {dns} does not know the name {site}.',
        nameNoOwner: 'The name {site} points to {ip}, which does not belong to any device.',
        nameWrongHost: 'The name {site} points to {owner} ({ip}), but the page is on {dst}.',
        noDhcp: '{name} did not get an IP: no DHCP server answered (it kept the automatic address 169.254.x.x).',
        noPhysicalPath: 'There is no physical path between {src} and {dst}: a cable is missing.',
        duplicateIp: '{a} and {b} have the same IP ({ip}).',
        privateIp: 'The address {ip} is private: from another network, the Internet cannot reach it. To join different networks you need a VPN (or a public IP).',
        subnetMismatch: '{src} and {dst} disagree on whether they are on the same network: their subnet masks are different.',
        noRoute: '{name} has no route to {ip}.',
        noGateway: '{name} has no gateway: it does not know how to leave its network.',
        gatewayMissing: 'The gateway of {name} ({gateway}) does not exist on the network.',
        gatewayWrongNetwork: 'The gateway {gateway} is not on the same network as {name} ({ip}): check its IP and its mask.',
        pathNotViaGateway: 'The path of {name} does not go through its gateway {gateway}.',
        routeWrongNextHop: 'The route of {name} points to {via}, which is not the next device.'
    },
    file: {
        myNetwork: 'My network',
        saved: 'Network "{name}" saved.',
        loaded: 'Network "{name}" loaded.',
        submissionOpened: 'Submission by {student} opened.',
        cannotOpen: 'The file could not be opened: {error}',
        unknownFormat: 'Unrecognised format',
        invalidDevices: 'There are invalid devices or IP addresses',
        invalidConnections: 'There are invalid connections',
        demoLoaded: 'Example topology loaded',
        confirmClear: 'Are you sure you want to delete all devices and connections?',
        cleared: 'Workspace cleared'
    },

    // Detalle del paquete en la vista por capas (capas OSI y contenido).
    packet: {
        link: 'Link · Ethernet',
        net: 'Network · IP',
        vpn: 'VPN tunnel (encrypted)',
        inet: 'Inner network · VPN IP',
        tr: 'Transport',
        app: 'Application',
        broadcastMac: '{mac} → FF:FF:FF:FF:FF:FF (everyone)',
        tunnel: '{preset}: UDP tunnel port {port} · everything inside is encrypted',
        icmp: '{src} → {dst} · ICMP {type}',
        icmpReply: 'Echo Reply',
        icmpRequest: 'Echo Request',
        arpReply: ' · "{ip} is at {mac}"',
        arpRequest: ' · "who has {ip}?"',
        dnsResolved: 'DNS: {name} = {ip}',
        dnsNxdomain: 'DNS: {name} does not exist (NXDOMAIN)',
        dnsQuery: 'DNS: what is the IP of {name}?',
        udp53to: 'UDP port 53 → {port}',
        udpTo53: 'UDP port {port} → 53',
        tcp80to: 'TCP port 80 → {port} · SYN + ACK flags',
        tcpTo80: 'TCP port {port} → 80 · SYN flag',
        dhcpOffer: 'DHCP Offer: IP {ip}/{prefix} · gateway {gw}',
        dhcpAck: 'DHCP Ack: IP {ip}/{prefix} · gateway {gw}',
        dhcpDiscover: 'DHCP Discover: is there a DHCP server?',
        dhcpRequest: 'DHCP Request: I want the IP {ip}',
        udp67to68: 'UDP port 67 → 68',
        udp68to67: 'UDP port 68 → 67',
        dhcpNet: '{src} → {ip}',
        broadcastNet: '0.0.0.0 → 255.255.255.255 (broadcast)',
        httpOk: 'HTTP 200 OK + web page',
        httpGet: 'HTTP GET / (requesting the page)',
        tcp80: 'TCP port 80 → {port}',
        tcpTo80ack: 'TCP port {port} → 80 · ACK flag (confirms the connection)',
        arpWho: 'ARP who?',
        arpMyMac: 'ARP my MAC',
        dnsIp: 'DNS which IP?',
        dnsIpOk: 'DNS IP'
    },

    // Fase 3 · zona 4 — modal de dispositivo (pestañas y campos):
    dev: {
        subtitle: 'Type: {type}{layer} | MAC: {mac}',
        tab: {
            layer: 'Layer mode (L2/L3)',
            ip: 'IP configuration',
            ipSvi: 'IP configuration / SVI',
            connections: 'Connections / Ports',
            dhcp: 'DHCP server',
            dhcpWifi: 'DHCP / WiFi',
            portForwarding: 'Port Forwarding',
            wifiNetworks: 'WiFi networks',
            routes: 'Interfaces and routes',
            dnsRecords: 'DNS records',
            vpn: 'VPN',
            pingTerminal: 'Ping terminal',
            webBrowser: 'Web browser'
        },
        layerTab: {
            intro: 'Choose the operating mode of the switch:',
            l2: 'Layer 2 (L2 switch)',
            l2Desc: 'Switches frames using MAC. It does not route.',
            l3: 'Layer 3 (L3 multilayer)',
            l3Desc: 'Supports inter-VLAN IP routing and the DHCP server service.'
        },
        ipTab: {
            obtain: 'IP address:',
            static: 'Static',
            name: 'Device name',
            ip: 'IP address',
            mask: 'Subnet mask',
            gateway: 'Gateway',
            apply: 'Apply IP configuration',
            validationHint: 'IPv4, mask, gateway and duplicate addresses are validated.'
        },
        dhcpTab: {
            title: 'DHCP server',
            start: 'Starting DHCP IP',
            end: 'Ending DHCP IP',
            apply: 'Apply DHCP configuration',
            wifiTitle: 'WiFi access point settings',
            ssid: 'SSID name',
            password: 'WPA2 password',
            showPassword: 'Show password',
            changeHint: 'When you change the name or the password, the connected devices disconnect and have to reconnect.'
        },
        pf: {
            publicIp: 'Public IP (Internet side) of this router:',
            publicIpHint: 'The devices of the network reach the Internet with this IP (NAT). From outside you can only reach a device if there is a port forwarding rule.',
            rules: 'Port forwarding rules:',
            defaultRuleName: 'Rule',
            noRules: 'There are no rules: from the Internet you cannot enter any device of this network.',
            addTitle: 'Add rule',
            name: 'Name',
            proto: 'Protocol',
            extPort: 'External port',
            intPort: 'Internal port',
            redirectTo: 'Redirect to device',
            noDevices: '(there are no devices in this network)',
            add: 'Add rule',
            vpnHint: 'To reach a local VPN server from the Internet: UDP, same port outside and inside (WireGuard 51820 · OpenVPN 1194 · ZeroTier 9993), towards the IP of the VPN server.'
        },
        wifi: {
            networks: 'WiFi networks in range:',
            none: 'No WiFi networks were found.',
            signal: 'Signal: Excellent | Channel 6',
            connected: 'Connected',
            connect: 'Connect',
            prompt: 'Password of the WiFi network "{ssid}":'
        },
        conn: {
            list: 'Active connections plugged into the ports of {name}:',
            none: 'There are no cables or wireless networks connected to this device.',
            linkType: 'Link type: {type} | IP: {ip}',
            typeWifi: 'Wireless WiFi',
            typeEthernet: 'Ethernet cable',
            disconnect: 'Disconnect',
            connectNew: 'Connect a new cable'
        },
        dnsTab: {
            online: 'Server on (if you turn it off, nobody gets an answer)',
            records: 'Records (name → IP)',
            recordsHint: 'One line per record: {format}. Example: {example}. If a name is not here, the server replies "it does not exist".',
            apply: 'Apply',
            invalidRecord: 'Invalid record: "{line}". Use: www.ejemplo.com 192.168.2.10',
            recordsApplied: '{name}: records applied ({count}).'
        },
        routesTab: {
            toward: 'Towards {name}',
            noNeighbors: 'Connect this router with cables to other devices (for example to a switch): every cable creates an interface.',
            interfaces: 'Interfaces (one per cable)',
            interfacesHint: 'Each interface has its own IP and belongs to a different network.',
            staticRoutes: 'Static routes',
            staticRoutesHint: 'One per line: {format}. Default route: {default}. The networks of its interfaces are already known.',
            apply: 'Apply',
            invalidIface: 'Invalid IP or mask on the interface towards {name}.',
            invalidRoute: 'Invalid route: "{line}". Use: 10.0.0.0/24 via 192.168.2.2',
            applied: '{name}: interfaces and routes applied.'
        },
        browser: {
            go: 'Go',
            hint: 'Enter a URL such as {example} or the IP of the router to browse.',
            noIp: 'The device does not have a valid IP address (APIPA address or no network).',
            emptyUrl: 'Empty URL',
            emptyUrlMsg: 'Write an address, for example www.ejemplo.com or an IP.',
            dnsUnreachable: 'The DNS server ({dns}) could not be reached: it is off or unreachable.',
            dnsUnknownHost: 'The DNS server ({dns}) does not know the name "{host}".',
            pageLoaded: 'Page loaded successfully',
            pageLoadedCloud: 'Internet connection established through the ISP cloud.',
            noDnsNoInternet: 'There is no DNS server and no reachable Internet connection from this network.',
            nameNotResolved: 'The name could not be resolved.',
            timeout: 'The device {ip} does not answer. Check cables, IP, mask, gateway and routes.',
            mgmtPanel: 'Management panel ({name})',
            connectedTo: 'Connection established with {name} ({ip}).',
            statusOnline: 'Status: ONLINE',
            dhcpActive: 'DHCP: ACTIVE',
            dhcpInactive: 'DHCP: INACTIVE',
            pageLoadedIp: 'Internet connection established ({ip}).',
            responded: '{name} answered ({ip}).'
        },
        vpn: {
            statusOk: '● Connected',
            statusOff: '○ No VPN',
            statusError: '✖ Not connected',
            serverCloud: 'VPN server {cloud} (such as the Tailscale or ZeroTier coordinator): connect it to the internet access. The devices find each other through it; if they can see each other they talk directly, and if not, the traffic goes through this server.',
            serverLocal: 'VPN server {local} (such as WireGuard or OpenVPN): connect it to the school or office network. All devices connect to it and the VPN traffic goes through it.',
            inCloud: 'in the cloud',
            local: 'local',
            service: 'Service',
            network: 'VPN network',
            serverOn: 'Server on',
            members: 'Devices in this VPN ({count})',
            noMembers: 'There are no devices yet. Open the settings of a PC, notebook or phone and choose this VPN in its "VPN" tab.',
            clientIntro: 'A VPN gives this device a second IP, the VPN one, besides the one of its local network. With it it can talk to the other devices of the VPN as if they were on the same network, wherever they are.',
            connectTo: 'Connect to the VPN',
            noVpn: 'No VPN',
            noServers: 'There are no VPN servers on the network. Add one from the sidebar ("Cloud VPN" or "Local VPN server") and connect it with a cable.',
            localIp: 'Local network IP:',
            vpnIp: 'VPN IP:',
            status: 'Status:',
            serverGone: 'the VPN server no longer exists',
            serverOff: 'the VPN server is off',
            behindRouter: 'the VPN server is behind {router} (private network) and cannot be reached from the Internet: you must open the UDP port {port} on {router} and redirect it to {ip} (Port Forwarding)',
            noRouter: 'it cannot reach the router {router} ({ip}) through the Internet: {error}',
            notConnected: '{name} is not connected to any VPN.',
            serverGoneFor: 'The VPN server of {name} no longer exists.',
            cannotConnect: '{name} cannot connect to the VPN ({vpn}): {reason}',
            otherVpn: '{name} is a different VPN from the one of {other}.',
            notSameVpn: '{name} is not in the same VPN as {other}.'
        },
        msg: {
            switchLayer: 'Switch configured in Layer {layer}',
            nameEmpty: 'The name cannot be empty.',
            dhcpRangeInvalid: 'Invalid DHCP range: it must be inside the subnet and must not include the gateway IP.',
            dhcpRangeApplied: 'DHCP range applied.',
            portsInvalid: 'Ports must be numbers between 1 and 65535.',
            portTargetMissing: 'Choose which device of the network you want to redirect the port to.',
            portRuleExists: 'There is already a rule for {proto} {port}.',
            portRuleAdded: 'Rule added: {proto} {ext} → {ip}:{port}.',
            wifiNameEmpty: 'The network name cannot be empty.',
            wifiNameTaken: 'There is already another WiFi network with that name.',
            wifiPassShort: 'The WPA2 password must have at least 8 characters.',
            wifiRenamed: 'WiFi network renamed to "{ssid}". The devices must reconnect.',
            wifiPassUpdated: 'WiFi password updated. The devices must reconnect.',
            wifiWrongPass: 'Wrong password. The WiFi connection was not established.',
            wifiConnected: 'Connected to the WiFi network {ssid}',
            deviceDeleted: '"{name}" deleted. You can undo it with Ctrl+Z.',
            vpnTwoIps: '{name} now has two IPs: {local} (local) and {vpn} (VPN).',
            vpnLeft: '{name} left the VPN.',
            portOpened: 'UDP port {port} opened on {router} → {ip}.'
        }
    },

    export: {
        empty: 'There is nothing to export: add devices first.',
        pdfDone: 'PDF document generated.',
        imageDone: '{format} image exported.',
        type: {
            vpn: 'VPN',
            vpnCloud: 'Cloud VPN',
            vpnLocal: 'Local VPN',
            laptop: 'Notebook',
            netbook: 'Netbook',
            tv: 'Smart TV',
            dns: 'DNS',
            router: 'WiFi router',
            lrouter: 'Router',
            switch: 'Switch',
            pc: 'PC',
            phone: 'Mobile',
            cloud: 'Internet'
        },
        heads: {
            device: 'Device',
            type: 'Type',
            ip: 'IP',
            mask: 'Mask',
            gateway: 'Gateway'
        },
        exportedAt: 'Exported on {date} · {count} devices',
        continuation: 'Devices (continued)',
        page: 'Page {page} of {total}'
    },
    live: {
        stop: 'Stop the general traffic',
        start: 'Everyone browsing at once',
        stats: '🌐 Live traffic · ✔ {ok} successful · ✖ {fail} failed',
        needClients: 'Add PCs, notebooks, phones or Smart TVs (and something to talk to) to generate traffic.',
        hint: 'General traffic: every device browses on its own. ✔ it gets there and replies, ✖ it cannot communicate. Press ■ whenever you want to stop it.'
    },
    studentUi: {
        default: 'Student',
        title: 'Student: {name} (click to change it)',
        titleEmpty: 'Write your name: it is stored in what you submit',
        needName: 'Write your name to be able to submit.',
        hello: 'Hello, {name}. Your name will be in everything you save.'
    },
    teacher: {
        needNetwork: 'Build a network with at least two devices first.',
        needTitle: 'Give the activity a title.',
        needGoals: 'Choose at least one goal: two different devices that must communicate.',
        alreadySolved: 'With the network as it is, the goals are ALREADY met: the student would have nothing to fix. Save it anyway?',
        goalPlaceholder: 'website, or type VPN',
        activityName: 'Activity - {title}',
        saved: 'Activity "{title}" saved. Give the file to your students: they open it with File → Open network.'
    },
    grade: {
        noFiles: 'You have not chosen any files yet.',
        teacherFile: '(teacher file)',
        noName: '(no name)',
        freeNetwork: 'Free network',
        invalidFile: 'Invalid file',
        freeNetworkResult: 'Free network (no activity)',
        solved: '✅ Solved',
        notSolved: '❌ Not solved',
        viewNetwork: 'View network',
        summary: '{count} file(s) · {done} of {graded} activities solved',
        headStudent: 'Student',
        headActivity: 'Activity / Network',
        headResult: 'Result (checked now)',
        headSaved: 'Saved',
        cannotOpen: 'Could not open: {error}',
        needFiles: 'Choose your students files first.',
        csvHead: {
            student: 'Student',
            activity: 'Activity / Network',
            result: 'Result',
            detail: 'Detail',
            attempts: 'Verification attempts',
            saved: 'Saved',
            file: 'File'
        },
        csvResult: { invalid: 'Invalid file', free: 'Free network', solved: 'Solved', notSolved: 'Not solved' }
    },
    tour: {
        prev: 'Previous',
        next: 'Next',
        closeTitle: 'Close the tour',
        needDemo: 'Load the example first to see a ping.',
        done: 'Done! You can watch the tour again from the "View" menu.',
        step: 'Step {step} of {total}',
        finish: 'Finish',
        steps: {
            1: {
                title: 'Welcome to NetSim Lab!',
                text: 'Here you will build networks, make them communicate and see how the data travels. This tour takes a minute.'
            },
            2: {
                title: '1 · Add devices',
                text: 'Click a device on the panel on the left to add it: PC, notebook, phone, router, switch, DNS server…'
            },
            3: {
                title: '2 · Move and configure them',
                text: 'Drag a device to move it and drag the background to pan the canvas. The mouse wheel zooms in and out; the left button frames the whole network. Double-click opens the settings; Del removes; Ctrl+Z undoes.'
            },
            4: {
                title: '3 · Connect with cables',
                text: 'Choose "Connect Cable" and click on two devices. Phones, notebooks and Smart TVs can also connect over WiFi from their settings.'
            },
            5: {
                title: '4 · Try it with an example',
                text: 'We load an example network so you can see everything working. Afterwards you can build your own.',
                action: 'Load example'
            },
            6: {
                title: '5 · Simulate a communication',
                text: 'Choose source, destination and type (ping, web, DNS…) and press ▶ Start. You can pause, stop and change the speed.',
                action: 'Show me a ping'
            },
            7: {
                title: '6 · Advanced mode',
                text: 'With the advanced mode you see the layers of the packet, ARP, the MAC table of the switch, DNS, DHCP, TCP and the routes of the routers.'
            },
            8: {
                title: '7 · Everyone at once',
                text: '"Everyone browsing at once" makes all the devices communicate at the same time. Failures appear in red (✕).'
            },
            9: {
                title: '8 · Your name and the activities',
                text: 'Write your name in this button: it will be inside everything you save. In "Activities" there are networks with faults to fix; when you finish, save the network and hand the file to your teacher.'
            }
        }
    },
    deliver: {
        freeNetwork: 'Free network',
        empty: 'There is nothing to submit: build your network first.',
        solved: '✅ Solved: the network works',
        notSolved: '❌ Not solved yet',
        notSolvedHint: 'You can submit it anyway, or keep trying and submit later.',
        freeNetworkState: 'Free network (no activity)',
        student: 'Student:',
        activity: 'Activity',
        work: 'Work',
        status: 'Status:',
        devices: 'Devices on the network:',
        file: 'File:',
        keepWorking: 'Keep working',
        download: 'Download my submission',
        doneTitle: '✔ Done! Your submission was downloaded.',
        doneHint: 'Look for the file {file} in your Downloads folder and send it to your teacher (by email, WhatsApp or the virtual classroom).',
        close: 'Close',
        downloaded: '📤 Submission downloaded. Send the file to your teacher.'
    },
    autosave: {
        network: '"{name}" · ',
        deviceCount: '{count} devices',
        activity: ' · activity: {title}',
        savedAt: ' · saved {when}.',
        restored: 'Done: you are back where you left your work.',
        cannotRestore: 'It could not be recovered: {error}'
    },
    offline: {
        downloading: 'Downloading the libraries… (internet is only needed this once)',
        done: 'Copy downloaded: that file works without a connection. Save it in a folder or a pendrive.',
        failed: 'The copy could not be built ({error}). Try with internet or save the page from the browser (Ctrl+S).'
    },
    demo: {
        twoNetworks: 'Example loaded: two networks (192.168.1.0/24 and 192.168.2.0/24) joined by a router. Try a ping from PC_A1 to PC_B1 in advanced mode.',
        vpnLocal: 'Example: the VPN is inside the office network (WireGuard). PC_Oficina1 connects, but PC_Casa1 does not get there: you must open the UDP port 51820 on Router_Oficina. Open the settings of the VPN server or of the router.',
        vpnCloud: 'Example: home and office have different networks, each with its own internet. PC_Casa1 and PC_Oficina1 are joined by the VPN (100.64.0.x). Try a ping between their VPN IPs.'
    },
    modal: {
        close: 'Close',
        closeTitle: 'Close (Esc)',
        deliver: {
            title: 'Submit my work'
        },
        about: {
            subtitle: 'Educational Network Simulator · version 35',
            license: 'Distributed under the MIT License',
            donation: 'If you like the simulator, a mention or a donation for the author is up to you.',
            cafecito: 'Buy me a coffee',
            kofi: 'Support on Ko-fi'
        },
        restore: {
            title: 'We found your previous work',
            hint: 'The simulator saves your network automatically in this browser. To submit or share it, use File → Save network.',
            startOver: 'Start from scratch',
            continue: 'Continue where I was'
        },
        student: {
            title: 'What is your name?',
            hint: 'Your name is stored inside the networks and activities you save, so your teacher knows whose submission it is.',
            placeholder: 'E.g. Jane Smith',
            notNow: 'Not now',
            save: 'Save name'
        },
        mkact: {
            title: 'Create an activity with this network',
            hint: 'Build the network, break something on purpose (an IP, a cable, a route…) and define what the student has to achieve. It is saved as a file that the student opens with "Open network".',
            labelTitle: 'Title',
            placeholderTitle: 'E.g. The secretary PC cannot reach the Internet',
            labelLevel: 'Difficulty',
            level: {
                easy: 'Easy',
                medium: 'Medium',
                hard: 'Hard'
            },
            labelStory: 'Briefing (what happens to the network)',
            placeholderStory: 'E.g. Since yesterday, nobody in the lab can open the school website.',
            labelHint: 'Hint (optional)',
            placeholderHint: 'E.g. Check the gateway of the PCs.',
            goals: 'Goals: who has to be able to communicate?',
            save: 'Save activity'
        },
        grade: {
            title: 'Grade submissions',
            hint: 'Choose one or more files saved by your students. The simulator checks each network again and shows you who solved it. With "View" you open the student network to review it.',
            chooseFiles: 'Choose files…',
            downloadCsv: 'Download summary (Excel)'
        },
        activities: {
            title: 'Activities: fix the network!',
            hint: 'Each activity loads a network with a hidden fault. Find it, fix it and verify.'
        },
        save: {
            title: 'Save network',
            hint: 'Choose a name to identify your network.',
            placeholder: 'E.g. Classroom network',
            save: 'Save'
        },
        device: {
            delete: 'Delete',
            deleteTitle: 'Delete this device from the network'
        }
    },
};
