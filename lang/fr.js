// lang/fr.js — Dictionnaire en français.
//
// Le dictionnaire espagnol (lang/es.js) est la source de vérité et le repli.
// Toute clé d'ici doit exister dans lang/es.js avec le même nom : le vérificateur
// `node tools/check_keys.mjs --all` compare les deux dictionnaires.
//
// Règles :
//  - Interpolation avec {variable}.
//  - Les termes techniques (DHCP, ARP, MAC, VLAN, passerelle…) restent tels quels.
//  - La sortie de la console/CLI des appareils n'est pas traduite.
window.I18N_DICTS = window.I18N_DICTS || {};
window.I18N_DICTS.fr = {
    _meta: { name: 'Français', dir: 'ltr' },

    app: {
        title: 'Simulateur de Réseaux Éducatif',
        tagline: 'Simulateur de Réseaux Interactif pour Élèves'
    },

    ui: {
        langSelector: 'Idioma / Language',
        cancel: 'Annuler'
    },

    // Phase 3 · zone 1 — en-tête et menus :
    header: {
        toolSelect: 'Déplacer / Sélectionner',
        toolCable: 'Connecter un câble',
        toolDeleteCable: 'Supprimer un câble',
        undo: 'Annuler (Ctrl+Z)',
        redo: 'Rétablir (Ctrl+Y)',
        deliver: 'Rendre',
        deliverTitle: 'Enregistrer votre travail avec votre nom pour le remettre au professeur',
        studentDefault: 'Élève',
        studentTitle: 'Votre nom : il reste enregistré dans les réseaux et les activités que vous sauvegardez',
        activities: 'Activités',
        activitiesTitle: 'Réseaux en panne à réparer',
        support: 'Soutenir',
        supportTitle: 'À propos du simulateur et soutien à l’auteur'
    },
    menu: {
        file: 'Fichier',
        view: 'Affichage',
        saveNetwork: 'Enregistrer le réseau…',
        openNetwork: 'Ouvrir un réseau…',
        exportAs: 'Exporter le réseau sous…',
        imagePng: 'Image PNG',
        imageJpg: 'Image JPG',
        docPdf: 'Document PDF (avec la liste des appareils)',
        offlineCopy: 'Enregistrer une copie utilisable sans Internet',
        offlineCopyTitle: 'Télécharge une version de ce simulateur qui fonctionne sans Internet (il faut une connexion une seule fois)',
        forTeacher: 'Pour le professeur',
        makeActivity: 'Créer une activité avec ce réseau…',
        gradeDeliveries: 'Corriger les rendus…',
        loadDemo: 'Charger un exemple',
        demoVpnLocal: 'Exemple : VPN local (ouvrir des ports)',
        demoVpnLocalTitle: 'VPN à l’intérieur du réseau du bureau : pour y arriver depuis l’extérieur, il faut ouvrir un port sur le routeur',
        demoVpnCloud: 'Exemple : 2 réseaux reliés par VPN',
        demoVpnCloudTitle: 'Maison et bureau, chacun avec son routeur et son accès Internet, reliés par un VPN dans le cloud',
        demoTwoNetworks: 'Exemple 2 réseaux',
        demoTwoNetworksTitle: 'Deux réseaux reliés par un routeur à plusieurs interfaces',
        clearAll: 'Tout effacer',
        devicesPanel: 'Panneau des appareils',
        simPanel: 'Panneau de simulation',
        themeLight: 'Mode clair',
        themeDark: 'Mode sombre',
        tour: 'Visite guidée',
        aboutRights: 'À propos · Droits',
        project: 'Projeter en classe',
        projectTitle: 'Plein écran avec de grands textes (Échap pour quitter)'
    },

    // Phase 3 · zone 2 — panneaux (palette, canevas, simulation, activité) :
    device: {
        paletteTitle: 'Ajouter des appareils',
        paletteHint: 'Cliquez sur un appareil pour l’ajouter. Un double clic sur un appareil du réseau ouvre ses propriétés ; la touche Suppr le supprime.',
        legendTitle: 'Légende des états :',
        legendOk: 'Connexion OK / IP valide',
        legendApipa: 'APIPA (sans IP / sans DHCP)',
        legendError: 'Déconnecté / erreur de sous-réseau',
        aboutTitle: 'À propos de ce simulateur',
        type: {
            router: 'Routeur WiFi', routerDesc: 'Passerelle + DHCP + WiFi',
            lrouter: 'Routeur (plusieurs réseaux)', lrouterDesc: 'Interfaces + table de routage',
            notebook: 'Ordinateur portable', notebookDesc: 'Câble ou WiFi',
            netbook: 'Netbook', netbookDesc: 'Petit portable, câble ou WiFi',
            tv: 'Smart TV', tvDesc: 'WiFi ou câble · navigateur',
            vpncloud: 'VPN dans le cloud (VPS)', vpncloudDesc: 'Type Tailscale / ZeroTier',
            vpnlocal: 'Serveur VPN local', vpnlocalDesc: 'Type WireGuard / OpenVPN',
            dns: 'Serveur DNS', dnsDesc: 'Table noms → IP',
            switch: 'Switch (L2 / L3)', switchDesc: 'Couche 2 ou couche 3 (multicouche)',
            pc: 'Ordinateur (PC)', pcDesc: 'Ethernet / console / web',
            phone: 'Smartphone WiFi', phoneDesc: 'Connexion sans fil',
            cloud: 'Internet (ISP Cloud)', cloudDesc: 'Accès au réseau mondial'
        },
        // Noms par défaut des appareils sur le canevas ({id} = numéro).
        // Ils sont générés dans la langue active ; à l’export/import ils sont conservés tels quels.
        defaultName: {
            notebook: 'Portable_{id}',
            netbook: 'Netbook_{id}',
            tv: 'SmartTV_{id}',
            router: 'Routeur_WiFi_{id}',
            lrouter: 'Routeur_{id}',
            dns: 'DNS_{id}',
            vpnCloud: 'VPN_Cloud_{id}',
            vpnLocal: 'VPN_Local_{id}',
            switch: 'Switch_LAN_{id}',
            pc: 'PC_Eleve_{id}',
            phone: 'Smartphone_{id}',
            cloud: 'Internet_ISP',
            other: 'Appareil_{id}'
        },
        layer2: 'Mode couche 2'
    },

    // Détail du paquet dans la vue par couches (couches OSI et contenu).
    packet: {
        link: 'Liaison · Ethernet',
        net: 'Réseau · IP',
        vpn: 'Tunnel VPN (chiffré)',
        inet: 'Réseau interne · IP VPN',
        tr: 'Transport',
        app: 'Application',
        broadcastMac: '{mac} → FF:FF:FF:FF:FF:FF (tous)',
        tunnel: '{preset} : tunnel UDP port {port} · tout ce qu’il contient est chiffré',
        icmp: '{src} → {dst} · ICMP {type}',
        icmpReply: 'Echo Reply',
        icmpRequest: 'Echo Request',
        arpReply: ' · « {ip} est en {mac} »',
        arpRequest: ' · « Qui a {ip} ? »',
        dnsResolved: 'DNS : {name} = {ip}',
        dnsNxdomain: 'DNS : {name} n’existe pas (NXDOMAIN)',
        dnsQuery: 'DNS : quelle est l’IP de {name} ?',
        udp53to: 'UDP port 53 → {port}',
        udpTo53: 'UDP port {port} → 53',
        tcp80to: 'TCP port 80 → {port} · drapeaux SYN + ACK',
        tcpTo80: 'TCP port {port} → 80 · drapeau SYN',
        dhcpOffer: 'DHCP Offer : IP {ip}/{prefix} · passerelle {gw}',
        dhcpAck: 'DHCP Ack : IP {ip}/{prefix} · passerelle {gw}',
        dhcpDiscover: 'DHCP Discover : y a-t-il un serveur DHCP ?',
        dhcpRequest: 'DHCP Request : je veux l’IP {ip}',
        udp67to68: 'UDP port 67 → 68',
        udp68to67: 'UDP port 68 → 67',
        dhcpNet: '{src} → {ip}',
        broadcastNet: '0.0.0.0 → 255.255.255.255 (diffusion)',
        httpOk: 'HTTP 200 OK + page web',
        httpGet: 'HTTP GET / (je demande la page)',
        tcp80: 'TCP port 80 → {port}',
        tcpTo80ack: 'TCP port {port} → 80 · drapeau ACK (confirme la connexion)',
        arpWho: 'ARP qui ?',
        arpMyMac: 'ARP mon MAC',
        dnsIp: 'DNS quelle IP ?',
        dnsIpOk: 'DNS IP'
    },
    studentUi: {
        default: 'Élève',
        title: 'Élève : {name} (cliquez pour changer)',
        titleEmpty: 'Écrivez votre nom : il reste enregistré dans ce que vous rendez',
        needName: 'Écrivez votre nom pour pouvoir rendre le travail.',
        hello: 'Bonjour {name}. Votre nom restera dans ce que vous enregistrez.'
    },
    teacher: {
        needNetwork: 'Créez d’abord un réseau avec au moins deux appareils.',
        needTitle: 'Donnez un titre à l’activité.',
        needGoals: 'Choisissez au moins un objectif : deux appareils différents qui doivent communiquer.',
        alreadySolved: 'Avec le réseau tel qu’il est, les objectifs sont DÉJÀ atteints : l’élève n’aurait rien à réparer. Enregistrer quand même ?',
        goalPlaceholder: 'site web, ou écrivez VPN',
        activityName: 'Activité - {title}',
        saved: 'Activité « {title} » enregistrée. Transmettez le fichier à vos élèves : ils l’ouvrent avec Fichier → Ouvrir un réseau.'
    },
    grade: {
        noFiles: 'Vous n’avez encore choisi aucun fichier.',
        teacherFile: '(fichier du professeur)',
        noName: '(sans nom)',
        freeNetwork: 'Réseau libre',
        invalidFile: 'Fichier non valide',
        freeNetworkResult: 'Réseau libre (sans activité)',
        solved: '✅ Résolue',
        notSolved: '❌ Non résolue',
        viewNetwork: 'Voir le réseau',
        summary: '{count} fichier(s) · {done} sur {graded} activités résolues',
        headStudent: 'Élève',
        headActivity: 'Activité / Réseau',
        headResult: 'Résultat (vérifié à l’instant)',
        headSaved: 'Enregistré',
        cannotOpen: 'Impossible d’ouvrir : {error}',
        needFiles: 'Choisissez d’abord les fichiers de vos élèves.',
        csvHead: {
            student: 'Élève',
            activity: 'Activité / Réseau',
            result: 'Résultat',
            detail: 'Détail',
            attempts: 'Tentatives de vérification',
            saved: 'Enregistré',
            file: 'Fichier'
        },
        csvResult: { invalid: 'Fichier non valide', free: 'Réseau libre', solved: 'Résolue', notSolved: 'Non résolue' }
    },
    tour: {
        prev: 'Précédent',
        next: 'Suivant',
        closeTitle: 'Fermer la visite',
        needDemo: 'Chargez d’abord l’exemple pour voir un ping.',
        done: 'Terminé ! Vous pouvez revoir la visite depuis le menu « Affichage ».',
        step: 'Étape {step} sur {total}',
        finish: 'Terminer',
        steps: {
            1: {
                title: 'Bienvenue dans NetSim Lab !',
                text: 'Ici vous allez créer des réseaux, les faire communiquer et voir comment les données circulent. Cette visite dure une minute.'
            },
            2: {
                title: '1 · Ajoutez des appareils',
                text: 'Dans le panneau de gauche, cliquez sur un appareil pour l’ajouter : PC, ordinateur portable, smartphone, routeur, switch, serveur DNS…'
            },
            3: {
                title: '2 · Déplacez-les et configurez-les',
                text: 'Faites glisser un appareil pour le déplacer et le fond pour parcourir le schéma. La molette de la souris zoome ; le bouton gauche cadre tout le réseau. Un double clic ouvre les propriétés ; Suppr supprime ; Ctrl+Z annule.'
            },
            4: {
                title: '3 · Reliez avec des câbles',
                text: 'Choisissez « Connecter un câble » et cliquez sur deux appareils. Les smartphones, ordinateurs portables et Smart TV se connectent aussi en WiFi depuis leurs propriétés.'
            },
            5: {
                title: '4 · Testez avec un exemple',
                text: 'Nous avons chargé un réseau d’exemple pour que vous voyiez tout fonctionner. Ensuite vous pourrez créer le vôtre.',
                action: 'Charger l’exemple'
            },
            6: {
                title: '5 · Simulez une communication',
                text: 'Choisissez la source, la destination et le type (ping, web, DNS…) puis appuyez sur ▶ Démarrer. Vous pouvez mettre en pause, arrêter et changer la vitesse.',
                action: 'Montrez-moi un ping'
            },
            7: {
                title: '6 · Mode avancé',
                text: 'En mode avancé, vous voyez les couches du paquet, ARP, la table MAC du switch, DNS, DHCP, TCP et les routes des routeurs.'
            },
            8: {
                title: '7 · Tous en même temps',
                text: '« Tous naviguant en même temps » fait communiquer tous les appareils simultanément. Les échecs apparaissent en rouge (✕).'
            },
            9: {
                title: '8 · Votre nom et les activités',
                text: 'Écrivez votre nom dans ce bouton : il restera dans ce que vous enregistrez. Dans « Activités » il y a des réseaux en panne à réparer ; à la fin, enregistrez le réseau et remettez le fichier à votre professeur.'
            }
        }
    },
    deliver: {
        freeNetwork: 'Réseau libre',
        empty: 'Il n’y a rien à rendre : créez d’abord votre réseau.',
        solved: '✅ Résolue : le réseau fonctionne',
        notSolved: '❌ Pas encore résolue',
        notSolvedHint: 'Vous pouvez la rendre quand même, ou continuer à essayer et rendre plus tard.',
        freeNetworkState: 'Réseau libre (sans activité)',
        student: 'Élève :',
        activity: 'Activité',
        work: 'Travail',
        status: 'État :',
        devices: 'Appareils du réseau :',
        file: 'Fichier :',
        keepWorking: 'Continuer à travailler',
        download: 'Télécharger mon rendu',
        doneTitle: '✔ Terminé ! Votre rendu a été téléchargé.',
        doneHint: 'Cherchez le fichier {file} dans votre dossier Téléchargements et envoyez-le à votre professeur (par mail, messagerie ou sur l’espace de classe).',
        close: 'Fermer',
        downloaded: '📤 Rendu téléchargé. Envoyez le fichier à votre professeur.'
    },
    autosave: {
        network: '« {name} » · ',
        deviceCount: '{count} appareils',
        activity: ' · activité : {title}',
        savedAt: ' · enregistré {when}.',
        restored: 'C’est prêt : vous reprenez où vous aviez laissé votre travail.',
        cannotRestore: 'Impossible de récupérer : {error}'
    },
    offline: {
        downloading: 'Téléchargement des bibliothèques… (une connexion Internet est nécessaire cette seule fois)',
        done: 'Copie téléchargée : ce fichier fonctionne hors connexion. Gardez-le dans un dossier ou sur une clé USB.',
        failed: 'Impossible de préparer la copie ({error}). Essayez avec Internet ou enregistrez la page depuis le navigateur (Ctrl+S).'
    },
    demo: {
        twoNetworks: 'Exemple chargé : deux réseaux (192.168.1.0/24 et 192.168.2.0/24) reliés par un routeur. Essayez un ping de PC_A1 vers PC_B1 en mode avancé.',
        vpnLocal: 'Exemple : le VPN est à l’intérieur du réseau du Bureau (WireGuard). PC_Oficina1 se connecte, mais PC_Casa1 n’y arrive pas : il manque l’ouverture du port UDP 51820 sur Router_Oficina. Ouvrez les propriétés du serveur VPN ou du routeur.',
        vpnCloud: 'Exemple : Maison et Bureau ont des réseaux différents, chacun avec Internet. PC_Casa1 et PC_Oficina1 sont reliés par le VPN (100.64.0.x). Essayez un ping entre leurs IP VPN.'
    },
    export: {
        empty: 'Il n’y a rien à exporter : ajoutez d’abord des appareils.',
        pdfDone: 'Document PDF généré.',
        imageDone: 'Image {format} exportée.',
        type: {
            vpn: 'VPN',
            vpnCloud: 'VPN cloud',
            vpnLocal: 'VPN local',
            laptop: 'Ordinateur portable',
            netbook: 'Netbook',
            tv: 'Smart TV',
            dns: 'DNS',
            router: 'Routeur WiFi',
            lrouter: 'Routeur',
            switch: 'Switch',
            pc: 'PC',
            phone: 'Mobile',
            cloud: 'Internet'
        },
        heads: {
            device: 'Appareil',
            type: 'Type',
            ip: 'IP',
            mask: 'Masque',
            gateway: 'Passerelle'
        },
        exportedAt: 'Exporté le {date} · {count} appareils',
        continuation: 'Appareils (suite)',
        page: 'Page {page} sur {total}'
    },
    live: {
        stop: 'Arrêter le trafic général',
        start: 'Tous naviguant en même temps',
        stats: '🌐 Trafic en direct · ✔ {ok} corrects · ✖ {fail} en échec',
        needClients: 'Ajoutez des PC, ordinateurs portables, smartphones ou Smart TV (et quelque chose avec qui communiquer) pour générer du trafic.',
        hint: 'Trafic général : chaque appareil navigue pour son compte. ✔ arrive et répond, ✖ n’arrive pas à communiquer. Appuyez sur ■ quand vous voulez l’arrêter.'
    },
    // Phase 3 · zone 4 — fenêtre de l’appareil (onglets et champs) :
    dev: {
        subtitle: 'Type : {type}{layer} | MAC : {mac}',
        tab: {
            layer: 'Mode de couche (L2/L3)',
            ip: 'Configuration IP',
            ipSvi: 'Configuration IP / SVI',
            connections: 'Connexions / Ports',
            dhcp: 'Serveur DHCP',
            dhcpWifi: 'DHCP / WiFi',
            portForwarding: 'Port Forwarding',
            wifiNetworks: 'Réseaux WiFi',
            routes: 'Interfaces et routes',
            dnsRecords: 'Enregistrements DNS',
            vpn: 'VPN',
            pingTerminal: 'Terminal Ping',
            webBrowser: 'Navigateur Web'
        },
        layerTab: {
            intro: 'Choisissez le mode de fonctionnement du switch :',
            l2: 'Couche 2 (switch L2)',
            l2Desc: 'Commutation de trames par MAC. Ne fait pas de routage.',
            l3: 'Couche 3 (L3 multicouche)',
            l3Desc: 'Prend en charge le routage IP inter-VLAN et le service de serveur DHCP.'
        },
        ipTab: {
            obtain: 'Obtention de l’IP :',
            static: 'Statique',
            name: 'Nom de l’appareil',
            ip: 'Adresse IP',
            mask: 'Masque de sous-réseau',
            gateway: 'Passerelle',
            apply: 'Appliquer la configuration IP',
            validationHint: 'Les adresses IPv4, le masque, la passerelle et les adresses en double sont vérifiés.'
        },
        dhcpTab: {
            title: 'Serveur DHCP',
            start: 'IP de début DHCP',
            end: 'IP de fin DHCP',
            apply: 'Appliquer la configuration DHCP',
            wifiTitle: 'Configuration du point d’accès WiFi',
            ssid: 'Nom SSID',
            password: 'Mot de passe WPA2',
            showPassword: 'Afficher le mot de passe',
            changeHint: 'Si vous changez le nom ou le mot de passe, les appareils connectés se déconnectent et doivent se reconnecter.'
        },
        pf: {
            publicIp: 'IP publique (côté Internet) de ce routeur :',
            publicIpHint: 'Les appareils du réseau sortent sur Internet avec cette IP (NAT). Depuis l’extérieur, on ne peut atteindre un appareil interne que s’il existe une règle de redirection de ports.',
            rules: 'Règles de redirection de ports (Port Forwarding) :',
            defaultRuleName: 'Règle',
            noRules: 'Aucune règle : depuis Internet, on ne peut entrer dans aucun appareil de ce réseau.',
            addTitle: 'Ajouter une règle',
            name: 'Nom',
            proto: 'Protocole',
            extPort: 'Port externe',
            intPort: 'Port interne',
            redirectTo: 'Rediriger vers l’appareil',
            noDevices: '(aucun appareil dans ce réseau)',
            add: 'Ajouter la règle',
            vpnHint: 'Pour atteindre un serveur VPN local depuis Internet : UDP, même port dehors et dedans (WireGuard 51820 · OpenVPN 1194 · ZeroTier 9993), vers l’IP du serveur VPN.'
        },
        wifi: {
            networks: 'Réseaux WiFi à portée :',
            none: 'Aucun réseau WiFi disponible n’a été trouvé.',
            signal: 'Signal : excellent | Canal 6',
            connected: 'Connecté',
            connect: 'Se connecter',
            prompt: 'Mot de passe du réseau WiFi « {ssid} » :'
        },
        conn: {
            list: 'Liste des connexions actives reliées aux ports de {name} :',
            none: 'Aucun câble ni réseau sans fil n’est connecté à cet appareil.',
            linkType: 'Type de liaison : {type} | IP : {ip}',
            typeWifi: 'WiFi sans fil',
            typeEthernet: 'Câble Ethernet',
            disconnect: 'Déconnecter',
            connectNew: 'Connecter un nouveau câble'
        },
        dnsTab: {
            online: 'Serveur allumé (si vous l’éteignez, personne ne reçoit de réponse)',
            records: 'Enregistrements (nom → IP)',
            recordsHint: 'Une ligne par enregistrement : {format}. Exemple : {example}. Si un nom n’est pas ici, le serveur répond « n’existe pas ».',
            apply: 'Appliquer',
            invalidRecord: 'Enregistrement non valide : « {line} ». Utilisez : www.exemple.com 192.168.2.10',
            recordsApplied: '{name} : enregistrements appliqués ({count}).'
        },
        routesTab: {
            toward: 'Vers {name}',
            noNeighbors: 'Reliez ce routeur avec des câbles à d’autres appareils (par exemple à un switch) : chaque câble crée une interface.',
            interfaces: 'Interfaces (une par câble)',
            interfacesHint: 'Chaque interface a sa propre IP et appartient à un réseau différent.',
            staticRoutes: 'Routes statiques',
            staticRoutesHint: 'Une par ligne : {format}. Route par défaut : {default}. Les réseaux de ses interfaces sont déjà connus.',
            apply: 'Appliquer',
            invalidIface: 'IP ou masque non valide sur l’interface vers {name}.',
            invalidRoute: 'Route non valide : « {line} ». Utilisez : 10.0.0.0/24 via 192.168.2.2',
            applied: '{name} : interfaces et routes appliquées.'
        },
        browser: {
            go: 'Aller',
            hint: 'Saisissez une URL comme {example} ou l’IP du routeur pour naviguer.',
            noIp: 'L’appareil n’a pas d’IP valide attribuée (adresse APIPA ou sans réseau).',
            emptyUrl: 'URL vide',
            emptyUrlMsg: 'Écrivez une adresse, par exemple www.exemple.com ou une IP.',
            dnsUnreachable: 'Impossible d’interroger le serveur DNS ({dns}) : il est éteint ou inaccessible.',
            dnsUnknownHost: 'Le serveur DNS ({dns}) ne connaît pas le nom « {host} ».',
            pageLoaded: 'Page chargée avec succès',
            pageLoadedCloud: 'Connexion Internet établie à travers le cloud ISP.',
            noDnsNoInternet: 'Il n’y a ni serveur DNS ni accès Internet joignable depuis ce réseau.',
            nameNotResolved: 'Impossible de résoudre le nom.',
            timeout: 'L’appareil {ip} ne répond pas. Vérifiez les câbles, l’IP, le masque, la passerelle et les routes.',
            mgmtPanel: 'Panneau de gestion ({name})',
            connectedTo: 'Connexion établie avec {name} ({ip}).',
            statusOnline: 'État : EN LIGNE',
            dhcpActive: 'DHCP : ACTIF',
            dhcpInactive: 'DHCP : INACTIF',
            pageLoadedIp: 'Connexion Internet établie ({ip}).',
            responded: '{name} ({ip}) a répondu.'
        },
        vpn: {
            statusOk: '● Connecté',
            statusOff: '○ Sans VPN',
            statusError: '✖ Sans connexion',
            serverCloud: 'Serveur VPN {cloud} (comme le coordinateur de Tailscale ou ZeroTier) : reliez-le à l’accès Internet. Les appareils se rencontrent à travers lui ; s’ils peuvent se voir, ils se parlent directement, sinon le trafic passe par ce serveur.',
            serverLocal: 'Serveur VPN {local} (comme WireGuard ou OpenVPN) : reliez-le au réseau de l’école ou du bureau. Tous les appareils se connectent à lui et le trafic du VPN passe par lui.',
            inCloud: 'dans le cloud',
            local: 'local',
            service: 'Service',
            network: 'Réseau VPN',
            serverOn: 'Serveur allumé',
            members: 'Appareils de ce VPN ({count})',
            noMembers: 'Il n’y a pas encore d’appareils. Ouvrez les propriétés d’un PC, d’un ordinateur portable ou d’un smartphone et choisissez ce VPN dans l’onglet « VPN ».',
            clientIntro: 'Un VPN donne à cet appareil une deuxième IP, celle du VPN, en plus de celle de son réseau local. Avec elle, il peut communiquer avec les autres appareils du VPN comme s’ils étaient sur le même réseau, où qu’ils soient.',
            connectTo: 'Se connecter au VPN',
            noVpn: 'Sans VPN',
            noServers: 'Il n’y a aucun serveur VPN dans le réseau. Ajoutez-en un depuis la barre latérale (« VPN dans le cloud » ou « Serveur VPN local ») et reliez-le avec un câble.',
            localIp: 'IP du réseau local :',
            vpnIp: 'IP du VPN :',
            status: 'État :',
            serverGone: 'le serveur VPN n’existe plus',
            serverOff: 'le serveur VPN est éteint',
            behindRouter: 'le serveur VPN est derrière {router} (réseau privé) et depuis Internet on ne l’atteint pas : il faut ouvrir le port UDP {port} sur {router} et le rediriger vers {ip} (Port Forwarding)',
            noRouter: 'on n’atteint pas le routeur {router} ({ip}) à travers Internet : {error}',
            notConnected: '{name} n’est connecté à aucun VPN.',
            serverGoneFor: 'Le serveur VPN de {name} n’existe plus.',
            cannotConnect: '{name} n’arrive pas à se connecter au VPN ({vpn}) : {reason}',
            otherVpn: '{name} est un autre VPN, différent de celui de {other}.',
            notSameVpn: '{name} n’est pas sur le même VPN que {other}.'
        },
        msg: {
            switchLayer: 'Switch configuré en couche {layer}',
            nameEmpty: 'Le nom ne peut pas rester vide.',
            dhcpRangeInvalid: 'Plage DHCP non valide : elle doit être à l’intérieur du sous-réseau et ne pas inclure l’IP de la passerelle.',
            dhcpRangeApplied: 'Plage DHCP appliquée.',
            portsInvalid: 'Les ports doivent être des nombres entre 1 et 65535.',
            portTargetMissing: 'Choisissez vers quel appareil du réseau rediriger le port.',
            portRuleExists: 'Il existe déjà une règle pour {proto} {port}.',
            portRuleAdded: 'Règle ajoutée : {proto} {ext} → {ip}:{port}.',
            wifiNameEmpty: 'Le nom du réseau ne peut pas rester vide.',
            wifiNameTaken: 'Un autre réseau WiFi porte déjà ce nom.',
            wifiPassShort: 'Le mot de passe WPA2 doit contenir au moins 8 caractères.',
            wifiRenamed: 'Réseau WiFi renommé en « {ssid} ». Les appareils doivent se reconnecter.',
            wifiPassUpdated: 'Mot de passe WiFi mis à jour. Les appareils doivent se reconnecter.',
            wifiWrongPass: 'Mot de passe incorrect. La connexion WiFi n’a pas été établie.',
            wifiConnected: 'Connecté au réseau WiFi {ssid}',
            deviceDeleted: '« {name} » supprimé. Vous pouvez annuler avec Ctrl+Z.',
            vpnTwoIps: '{name} a maintenant deux IP : {local} (locale) et {vpn} (VPN).',
            vpnLeft: '{name} a quitté le VPN.',
            portOpened: 'Port UDP {port} ouvert sur {router} → {ip}.'
        }
    },

    // Phase 3 · zone 4 — messages dynamiques (notifications et diagnostics) :
    file: {
        myNetwork: 'Mon réseau',
        saved: 'Réseau « {name} » enregistré.',
        loaded: 'Réseau « {name} » chargé.',
        submissionOpened: 'Rendu de {student} ouvert.',
        cannotOpen: 'Impossible d’ouvrir le fichier : {error}',
        unknownFormat: 'Format non reconnu',
        invalidDevices: 'Il y a des appareils ou des adresses IP non valides',
        invalidConnections: 'Il y a des connexions non valides',
        demoLoaded: 'Topologie d’exemple chargée',
        confirmClear: 'Voulez-vous vraiment supprimer tous les appareils et toutes les connexions ?',
        cleared: 'Zone de travail nettoyée'
    },
    toast: {
        deviceAdded: 'Appareil ajouté : {name}',
        clickCableToDelete: 'Cliquez directement sur la ligne du câble pour le supprimer',
        cableSourceSelected: 'Appareil source sélectionné. Choisissez la destination.',
        selfConnection: 'Vous ne pouvez pas connecter un appareil à lui-même',
        linkExists: 'Un lien existe déjà entre ces appareils',
        connectionOk: 'Connexion physique réalisée avec succès',
        cableDeleted: 'Câble/connexion supprimé correctement',
        invalidIp: 'IP ou masque non valide. Utilisez une adresse d’hôte et un masque contigu.',
        ipAlreadyAssigned: 'Cette adresse IP est déjà attribuée à un autre appareil.',
        invalidGateway: 'La passerelle n’est pas une IPv4 valide.',
        gatewayWrongSubnet: 'La passerelle doit être sur le même sous-réseau que l’appareil.',
        ipConfigApplied: 'Configuration IP appliquée correctement.',
        activityLoaded: 'Activité chargée : {title}',
        activitySolved: 'Activité résolue !'
    },
    diag: {
        dnsUnreachable: '{src} n’atteint pas le serveur DNS ({dns}) : {reason}',
        dnsOffline: 'Le serveur DNS {dns} est éteint.',
        dnsUnknownName: 'Le serveur DNS {dns} ne connaît pas le nom {site}.',
        nameNoOwner: 'Le nom {site} pointe vers {ip}, qui n’appartient à aucun appareil.',
        nameWrongHost: 'Le nom {site} pointe vers {owner} ({ip}), mais la page se trouve sur {dst}.',
        noDhcp: '{name} n’a pas obtenu d’IP : aucun serveur DHCP ne lui a répondu (il est resté avec une adresse automatique 169.254.x.x).',
        noPhysicalPath: 'Il n’y a pas de chemin physique entre {src} et {dst} : il manque un câble.',
        duplicateIp: '{a} et {b} ont la même IP ({ip}).',
        privateIp: 'L’adresse {ip} est privée : depuis un autre réseau, Internet ne sait pas y arriver. Pour relier des réseaux différents, il faut un VPN (ou une IP publique).',
        subnetMismatch: '{src} et {dst} ne sont pas d’accord sur l’appartenance au même réseau : les masques de sous-réseau sont différents.',
        noRoute: '{name} n’a aucune route vers {ip}.',
        noGateway: '{name} n’a pas de passerelle : il ne sait pas sortir de son réseau.',
        gatewayMissing: 'La passerelle de {name} ({gateway}) n’existe pas dans le réseau.',
        gatewayWrongNetwork: 'La passerelle {gateway} n’est pas sur le même réseau que {name} ({ip}) : vérifiez son IP et son masque.',
        pathNotViaGateway: 'Le chemin de {name} ne passe pas par sa passerelle {gateway}.',
        routeWrongNextHop: 'La route de {name} pointe vers {via}, qui n’est pas l’appareil suivant.'
    },
    canvas: {
        cableMode: 'Mode câble : cliquez sur deux appareils pour les relier',
        deleteCableMode: 'Mode suppression de câble : cliquez sur n’importe quel câble de l’écran pour le couper',
        emptyTitle: 'Votre zone de travail est vide',
        emptyHintA: 'Ajoutez des appareils depuis le panneau de gauche, ou ouvrez un exemple depuis',
        zoomIn: 'Zoom avant (touche +)',
        zoomReset: 'Revenir à 100 %',
        zoomOut: 'Zoom arrière (touche -)',
        fitView: 'Voir tout le réseau (touche 0)',
        projectExit: 'Quitter le mode projection'
    },
    sim: {
        title: 'Simuler une communication',
        hidePanel: 'Masquer le panneau',
        start: 'Démarrer',
        pause: 'Pause / reprendre',
        stop: 'Arrêter la simulation',
        all: 'Tous naviguant en même temps',
        allTitle: 'Tous les appareils communiquent en même temps, jusqu’à ce que vous décidiez d’arrêter',
        modeLabel: 'Mode de simulation',
        modeSimple: '🟢 Mode simple : seulement le parcours',
        modeAdvanced: '🔬 Mode avancé : couches, ARP, MAC, DNS et routes',
        source: 'Source',
        destination: 'Destination',
        protocolLabel: 'Type de communication',
        protocol: {
            icmp: 'ICMP / Ping',
            arp: 'ARP / Chercher un MAC',
            dns: 'DNS / Résoudre un nom',
            http: 'HTTP / Requête web',
            dhcp: 'DHCP / Demander une IP'
        },
        auto: 'Automatique',
        noDevices: 'Aucun appareil',
        site: 'Nom du site (HTTP/DNS)',
        dnsServer: 'Serveur DNS',
        tcpHandshake: 'Montrer la poignée de main TCP (SYN, SYN-ACK, ACK) avant HTTP',
        speed: 'Vitesse',
        speedSlow: 'Plus lente',
        speedFast: 'Plus rapide',
        speedLabel: 'Vitesse de la simulation',
        layers: 'Voir les couches',
        vpn: 'Envoyer par le VPN (tunnel avec IP VPN)',
        vpnTitle: 'Si la source et la destination sont sur le même VPN, le paquet voyage dans le tunnel chiffré',
        step: 'Pas à pas (attendez mon OK à chaque message)',
        stepTitle: 'La simulation s’arrête à chaque étape jusqu’à ce que vous appuyiez sur ▶ (ou sur la barre d’espace)',
        clearTables: 'Effacer les tables (ARP, MAC, DNS)',
        clearTablesTitle: 'Vide les tables ARP des appareils et les tables MAC des switchs',
        statusIdle: 'Choisissez la source, la destination et le protocole pour voir le parcours.',
        modeAdvancedHint: 'Mode avancé : vous verrez les couches, les tables ARP/MAC/DNS et les routes.',
        modeSimpleHint: 'Mode simple : seulement le parcours du paquet.',
        paused: 'En pause. Appuyez sur ▶ pour continuer.',
        stepOf: 'Étape {step} sur {total}',
        stepHint: 'Pas à pas : lisez le message et appuyez sur ▶ (ou sur la barre d’espace) pour continuer.',
        tablesCleared: 'Tables ARP et MAC effacées. La prochaine communication repart de zéro.',
        gatewayHint: ' (sa passerelle)',
        legNatRedirect: '{ip} → {public}:{port} (le routeur le redirige vers {target})',
        table: {
            empty: '(vide)',
            new: '● NOUVELLE',
            arpTitle: 'Table ARP de {name}',
            macTitle: 'Table MAC de {name}',
            dnsTitle: 'Table DNS de {name}',
            routesTitle: 'Table de routage de {name}',
            leaseTitle: 'Bail DHCP de {name}',
            vpnMembersTitle: 'Appareils connectés à {name} ({preset})',
            headName: 'Nom',
            headIp: 'IP',
            headMac: 'MAC',
            headPort: 'Port vers',
            headDest: 'Destination',
            headOut: 'Sortie',
            headData: 'Donnée',
            headValue: 'Valeur',
            headVpnIp: 'IP VPN',
            headDevice: 'Appareil',
            dhcpIp: 'Adresse IP',
            dhcpMask: 'Masque',
            dhcpGateway: 'Passerelle',
            dhcpServer: 'Serveur DHCP',
            routeConnected: 'connectée · interface vers {name}',
            routeVia: 'via {via}',
            routeLocal: 'réseau local (connecté)',
            routeDefault: 'route par défaut → {name}'
        },
        // Textes de chaque protocole pendant la simulation (requête / destination / réponse).
        text: {
            icmp: {
                req: '{s} envoie un ping à {d} : « tu es là ? »',
                dest: '{d} reçoit le ping et prépare la réponse',
                rep: '{d} répond « oui, je suis là ! » (echo reply)'
            },
            arp: {
                req: '{s} demande : « Qui a l’IP {ip} ? Quel est son MAC ? »',
                dest: '{d} reconnaît son IP et prépare sa réponse',
                rep: '{d} répond : « Cette IP est la mienne, voici mon adresse MAC »'
            },
            dns: {
                req: '{s} demande : « Quelle IP a {site} ? »',
                dest: '{d} cherche le nom dans sa table de domaines',
                rep: '{d} répond : {site} = {ip}',
                repUnknown: '{d} répond : « je ne connais pas le nom {site} » (il n’existe pas)'
            },
            http: {
                req: '{s} demande une page web à {d} (HTTP GET)',
                dest: '{d} prépare la page demandée',
                rep: '{d} envoie la page (200 OK)'
            },
            syn: {
                req: '1/3 SYN : {s} dit « je veux ouvrir une connexion TCP avec {d} »',
                dest: '{d} accepte d’ouvrir la connexion et prépare sa réponse',
                rep: '2/3 SYN-ACK : {d} répond « d’accord, tu me confirmes ? »'
            },
            discover: {
                req: '1/4 Discover : {s} n’a pas d’IP et crie à tout le réseau : « Y a-t-il un serveur DHCP ? »',
                dest: '{d} (serveur DHCP) écoute la demande et choisit une IP libre de sa plage',
                rep: '2/4 Offer : {d} propose à {s} l’IP {ip}'
            },
            request: {
                req: '3/4 Request : {s} accepte l’offre : « Je veux utiliser l’IP {ip} »',
                dest: '{d} réserve l’IP {ip} pour cet appareil',
                rep: '4/4 Ack : {d} confirme « elle est à toi » et remet le masque et la passerelle'
            }
        },
        node: {
            switch: '{name} (switch) reçoit la trame et la renvoie par le bon port',
            router: '{name} (routeur) reçoit le paquet et décide par où l’envoyer',
            cloud: '{name} (Internet) reçoit le paquet et le fait avancer',
            vpn: '{name} (serveur VPN) reçoit le trafic chiffré et le renvoie',
            default: '{name} reçoit le paquet et le transmet à l’appareil suivant'
        },
        // Messages (ce qu’on voit sur le canevas) et lignes du journal de trafic.
        cap: {
            arpKnown: '{s} connaît déjà le MAC de {hop} ({ip}). Regardez sa table ARP : il n’a pas besoin de redemander.',
            arpUnknown: '{s} ne connaît pas le MAC de {hop}{gw}. Avant d’envoyer des données, il le demande avec ARP.',
            noPath: '{s} ne peut pas atteindre {d} : aucun câble ni WiFi ne les relie',
            travel: '{from} → {to} : le paquet voyage par {link}',
            travelWifi: 'WiFi',
            travelCable: 'le câble',
            back: '{from} → {to} : la réponse revient',
            dnsKnown: '{s} connaît déjà l’IP de {name} (table DNS) : il n’a pas besoin de demander.',
            dnsAsk: '{s} connaît le nom {name} mais pas son IP. Il demande d’abord à un serveur DNS ({dns}).',
            dnsWrongHost: 'Le nom {name} pointe vers {real} ({ip}), pas vers {dest}. La page est demandée à {real}.'
        },
        log: {
            arpKnown: '{s} utilise sa table ARP (il connaît déjà {hop}).',
            arpUnknown: '{s} n’a pas {hop} dans sa table ARP : il fait d’abord une requête ARP.',
            noPath: 'ÉCHEC : {s} n’a pas de chemin de liaisons jusqu’à {d}.',
            route: '{label} · Parcours : {path}',
            arpSave: '{name} enregistre dans sa table ARP : {ip} → {mac}.',
            dnsSave: '{name} enregistre dans sa table DNS : {site} → {ip}.',
            dnsNeed: '{s} doit résoudre {name} avec DNS.',
            dnsWrongHost: '{name} → {ip} : la demande va vers {real}.',
            vpnForward: '{name} (serveur VPN) renvoie le trafic du tunnel vers {ip}.',
            switchLearned: '{name} (switch) a appris le MAC de {mac} et renvoie par tous les ports.',
            switchKnew: '{name} (switch) connaissait déjà le MAC de {mac} et renvoie par tous les ports.',
            switchLearnedOne: '{name} (switch) a appris le MAC de {mac} et renvoie par un seul port.',
            switchKnewOne: '{name} (switch) connaissait déjà le MAC de {mac} et renvoie par un seul port.',
            routeNotFound: '{name} n’a pas de route vers {ip} : paquet rejeté.',
            routeWrongNext: 'Prochain saut incorrect sur {name}.',
            routeConnected: '{name} cherche {ip} dans sa table de routage : c’est sur un réseau connecté à une de ses interfaces.',
            routeStatic: '{name} cherche {ip} dans sa table de routage : il utilise la route {net}/{prefix} via {via}.',
            routeLocal: '{name} cherche {ip} dans sa table de routage : c’est son réseau local.',
            routeDefault: '{name} cherche {ip} dans sa table de routage : il utilise la route par défaut.',
            end: 'Fin : {label} terminé avec succès.'
        },
        layer: {
            encapTitle: 'Encapsulation sur {name} : chaque couche ajoute son en-tête',
            decapTitle: 'Décapsulation sur {name} : on retire une couche à la fois, de l’extérieur vers l’intérieur',
            vpnDecrypt: 'Le serveur VPN déchiffre le paquet, lit l’IP VPN de destination et le chiffre à nouveau vers l’autre appareil',
            switchBroadcast: 'Diffusion (FF:FF…) : le switch l’envoie par TOUS les ports',
            switchKnown: 'Le switch connaît déjà le MAC de destination : il l’envoie par un seul port',
            switchUnknown: 'Le switch ne connaît pas encore le MAC de destination : il l’envoie par tous les ports (inondation)',
            routerArp: 'Attention : ARP ne traverse normalement pas un routeur ; il ne sert qu’à l’intérieur du même réseau',
            routerNewFrame: 'Le routeur lit l’IP, jette l’ancienne trame et en construit une autre avec de nouveaux MAC',
            routerRoute: 'Le routeur lit l’IP, choisit l’interface de sortie et construit une nouvelle trame avec d’autres MAC',
            travels: 'Le paquet complet voyage, avec toutes ses couches ensemble'
        },
        route: {
            notFound: '{name} cherche {ip} dans sa table de routage et n’en trouve aucune : il rejette le paquet. Il manque une route.',
            wrongNext: 'La route de {name} pointe vers {via}, mais l’appareil connecté suivant est {next}. Vérifiez la route ou les câbles.'
        },
        done: {
            syn: 'Terminé ! La connexion TCP entre {s} et {d} est ouverte. Maintenant {s} confirme (ACK) et demande la page.',
            discover: 'Terminé ! {s} a reçu une offre de {d} : l’IP {ip}. Il va maintenant l’accepter.',
            dns: 'Terminé ! {s} sait maintenant que {site} est {ip}. Il peut enfin demander la page web.',
            arp: 'Terminé ! {s} connaît maintenant le MAC de {d} et l’a enregistré dans sa table ARP. Il envoie enfin le {pre}.',
            request: 'Terminé ! {s} a maintenant une IP : {ip}, passerelle {gw}. Il peut déjà communiquer avec le réseau.',
            reply: 'Terminé ! {s} a reçu la réponse de {d}. La communication fonctionne.'
        },
        fail: {
            noGateway: '{s} veut atteindre un autre réseau ({ip}) mais n’a pas de passerelle : il ne sait pas par où sortir.',
            logNoGateway: '{s} n’a pas de passerelle configurée.',
            gatewayMissing: 'La passerelle de {s} ({gw}) n’existe pas dans ce réseau : le paquet ne sait pas par où sortir.',
            logGatewayMissing: 'La passerelle {gw} n’existe pas.',
            gatewayOtherNet: 'La passerelle {gw} n’est pas sur le même réseau que {s} ({ip}) : vérifiez son IP et son masque.',
            logGatewayOtherNet: 'Passerelle hors du réseau de {s}.',
            pathNotViaGw: 'Le chemin vers {d} ne passe pas par la passerelle {gw}. Vérifiez les câbles.',
            logPathNotViaGw: 'Le chemin physique ne passe pas par {gw}.',
            destNoGateway: '{d} recevrait le paquet mais ne sait pas comment répondre : {reason}.',
            logDestNoGateway: '{d} ne peut pas répondre (passerelle).',
            reasonGwMissing: 'sa passerelle {gw} n’existe pas',
            reasonNoGw: 'il n’a pas de passerelle',
            dnsOff: '{d} (serveur DNS) est éteint : personne ne répond à la requête.',
            logDnsOff: '{d} est éteint.',
            noDnsPath: '{s} ne peut pas atteindre le serveur DNS {dns} : il n’y a pas de chemin.',
            logNoDnsPath: 'Aucun chemin vers le serveur DNS {dns}.',
            noIpOwner: 'Le nom {name} a été résolu en {ip}, mais aucun appareil du réseau n’a cette IP.',
            logNoIpOwner: 'Aucun appareil n’a l’IP {ip}.',
            noPathToReal: '{name} pointe vers {real} ({ip}), mais il n’y a pas de chemin vers cet appareil.',
            logNoPathToReal: 'Aucun chemin vers {real}.',
            dnsNameMissing: '{d} ne connaît pas le nom {site} et répond « n’existe pas ». Ajoutez-le dans les enregistrements du serveur DNS.',
            logDnsNameMissing: '{d} : le nom {site} n’existe pas.',
            dhcpStaticIp: '{s} a une IP fixe : il n’utilise pas DHCP. Changez son mode en DHCP dans la configuration IP.',
            logDhcpStaticIp: '{s} utilise une IP fixe, il ne demande pas d’IP par DHCP.',
            dhcpNotServer: '{s} n’est pas un serveur DHCP (ou il est éteint) : personne ne répond au Discover.',
            logDhcpNotServer: '{s} ne répond pas en DHCP.',
            dhcpNoIp: '{s} n’a pas pu proposer d’IP à {target} : vérifiez la plage DHCP du serveur (ou que le câble arrive jusqu’à lui).',
            logDhcpNoIp: '{s} n’a pas d’IP à proposer à {target}.'
        },
        status: {
            noPath: 'ÉCHEC : il n’existe aucun chemin physique entre la source et la destination.',
            running: '{label} : {s} ⇄ {d} · {hops} saut(s) à l’aller et autant au retour',
            completed: 'TERMINÉ : {label} a fait l’aller-retour entre {s} et {d}.',
            stopped: 'Simulation arrêtée. Vous pouvez démarrer une autre communication.'
        },
        toast: {
            needTwoDevices: 'Ajoutez au moins deux appareils pour simuler une communication.',
            sameDevice: 'La source et la destination doivent être différentes.',
            noPath: 'Il n’y a aucun chemin connecté entre ces appareils.',
            completed: 'Simulation {label} terminée.'
        },
        req: {
            vpn: '{s} (IP VPN {srcIp}) écrit à {d} (IP VPN {dstIp}) par le tunnel {preset}{mode}',
            vpnRelay: ' · passe par le serveur VPN',
            vpnDirect: ' · connexion directe',
            ackGet: '3/3 ACK : {s} confirme la connexion et demande la page à {d} (HTTP GET)'
        }
    },
    act: {
        close: 'Fermer l’activité',
        verify: 'Vérifier',
        hint: 'Indice',
        deliverTitle: 'Enregistrer et rendre',
        defaultTitle: 'Activité',
        defaultHint: 'Essayez la simulation en mode avancé pour voir où elle échoue.',
        tip: 'Astuce : utilisez la simulation en mode avancé pour voir où elle échoue.',
        level: {
            easy: 'Facile',
            medium: 'Moyen',
            hard: 'Difficile'
        },
        goal: {
            prefix: '🎯 Objectif : {goals}.',
            comm: 'que {a} et {b} communiquent',
            vpn: 'que {a} et {b} communiquent par le VPN',
            site: 'que {a} puisse ouvrir {site}',
            and: ' et '
        },
        student: {
            label: '👤 Élève : {name}',
            prompt: '👤 Écrivez votre nom avec le bouton ci-dessus pour qu’il figure dans votre rendu.'
        },
        submission: {
            label: '📥 Rendu de {student} · enregistré {date} · l’élève l’a marqué comme {state}. Utilisez « Vérifier » pour le contrôler maintenant.',
            solved: 'résolue ✅',
            unsolved: 'non résolue ❌'
        },
        msg: {
            solved: '✅ Résolu{student} ! Le réseau fonctionne. Enregistrez le réseau pour le rendre.',
            notYetLabel: 'Pas encore :',
            notYet: '{a} et {b} n’arrivent pas à communiquer. Utilisez « Indice » si vous bloquez.',
            diagnosticLabel: 'Diagnostic :',
            noProblems: '✅ Il ne reste aucun problème : c’est déjà résolu !',
            deviceRemoved: 'L’un des appareils de l’activité a été supprimé.'
        },
        builtin: {
            1: {
                title: 'Le PC qui ne sort pas',
                story: 'PC_A1 peut parler à PC_A2, mais n’arrive pas à communiquer avec PC_B1, qui est sur un autre réseau.',
                hint: 'Pour sortir de son réseau, un PC doit savoir à qui remettre les paquets. Vérifiez sa configuration IP.'
            },
            2: {
                title: 'Le câble débranché',
                story: 'PC_B1 a cessé de répondre. Tout semble bien configuré.',
                hint: 'Regardez les câbles de près : chaque appareil est-il relié à son switch ? Utilisez « Connecter un câble » pour le réparer.'
            },
            3: {
                title: 'Deux avec la même IP',
                story: 'PC_A1 et PC_A2 sont sur le même réseau mais la communication est un désastre.',
                hint: 'Chaque appareil a besoin d’une adresse IP unique. Comparez les IP des deux.'
            },
            4: {
                title: 'Le masque qui ne correspond pas',
                story: 'PC_A1 croit que PC_A2 est sur son réseau, mais PC_A2 pense le contraire.',
                hint: 'Regardez le masque de sous-réseau de PC_A2 et comparez à quel réseau appartient chaque IP.'
            },
            5: {
                title: 'Ça arrive mais ça ne revient pas',
                story: 'Les paquets de PC_A1 arrivent à PC_B1, mais la réponse ne revient jamais.',
                hint: 'Une réponse doit aussi sortir du réseau de PC_B1. Vérifiez sa passerelle.'
            },
            6: {
                title: 'Il manque une route',
                story: 'Deux routeurs relient les réseaux 192.168.1.0/24 et 192.168.2.0/24. L’aller fonctionne, mais PC_A1 ne reçoit pas de réponse de PC_B1.',
                hint: 'Regardez la table de routage des deux routeurs : le second sait-il revenir vers le réseau 192.168.1.0/24 ? Les routes s’ajoutent dans l’onglet « Interfaces et routes ».'
            },
            7: {
                title: 'Le nom n’existe pas',
                story: 'PC_A1 peut faire un ping vers Servidor_Web par son IP, mais en tapant www.exemplo.com la page ne s’ouvre pas.',
                hint: 'Le ping par IP fonctionne, donc le réseau va bien. Regardez ce que sait le serveur DNS : a-t-il un enregistrement pour ce nom ?'
            },
            8: {
                title: 'Le DNS qui ne répond pas',
                story: 'Hier la page s’ouvrait parfaitement. Aujourd’hui personne n’arrive à www.exemplo.com.',
                hint: 'Vérifiez l’état du serveur DNS : est-il allumé ?'
            },
            9: {
                title: 'La mauvaise page',
                story: 'En tapant www.exemplo.com une page s’ouvre, mais ce n’est pas celle de Servidor_Web. Quelqu’un a touché au DNS.',
                hint: 'Comparez l’IP de l’enregistrement DNS avec l’IP réelle de Servidor_Web.'
            },
            10: {
                title: 'Le PC sans IP',
                story: 'Deux PC du réseau de la salle n’arrivent pas à communiquer. Leurs IP commencent par 169.254.',
                hint: 'Ces adresses apparaissent quand personne ne leur donne d’IP. Vérifiez le serveur DHCP du routeur.'
            },
            11: {
                title: 'La sortie vers Internet',
                story: 'Router_Central relie le réseau 192.168.1.0/24 au fournisseur d’accès Internet (203.0.113.1). PC_A1 n’atteint pas Internet (8.8.8.8).',
                hint: 'Le routeur ne sait pas où se trouve Internet. Il manque une route par défaut (0.0.0.0/0) qui pointe vers le fournisseur : 203.0.113.1.'
            },
            12: {
                title: 'Deux pannes ensemble',
                story: 'Le réseau à deux routeurs ne fait toujours pas communiquer PC_A1 avec PC_B1. Cette fois il y a plus d’un problème.',
                hint: 'Réparez un problème et vérifiez de nouveau : il peut en rester un autre. Vérifiez la passerelle de PC_B1 et les routes des deux routeurs.'
            },
            13: {
                title: 'Le VPN du bureau ne se connecte pas',
                story: 'Le bureau a un serveur VPN (WireGuard) à l’intérieur de son réseau. Depuis la maison on veut entrer dans le VPN, mais PC_Casa1 n’arrive pas à se connecter.',
                hint: 'Le serveur est à l’intérieur du réseau privé du bureau : depuis Internet on ne l’atteint pas. Regardez le panneau du serveur VPN et le Port Forwarding du routeur du bureau.'
            },
            14: {
                title: 'Le port est mal ouvert',
                story: 'Quelqu’un a ouvert un port sur le routeur du bureau pour le VPN, mais PC_Casa1 n’arrive toujours pas à se connecter.',
                hint: 'La règle existe, mais elle contient une erreur. Vérifiez le protocole (UDP ou TCP ?), les deux ports et vers quel appareil elle redirige.'
            },
            15: {
                title: 'Le serveur VPN est éteint',
                story: 'Hier la maison et le bureau se voyaient par le VPN. Aujourd’hui aucun PC n’arrive à communiquer avec l’autre.',
                hint: 'Ouvrez les propriétés du serveur VPN dans le cloud et vérifiez son état.'
            },
            16: {
                title: 'Il manque relier un appareil au VPN',
                story: 'PC_Casa1 est déjà dans le VPN, mais n’arrive pas à communiquer avec PC_Oficina1.',
                hint: 'Regardez les deux PC : l’un d’eux n’a pas la deuxième IP (celle du VPN). Ouvrez ses propriétés et cherchez l’onglet VPN.'
            },
            17: {
                title: 'Relier deux réseaux avec un VPN',
                story: 'La maison et le bureau ont chacun leur routeur et leur accès Internet, mais leurs PC ne se voient pas. Créez un VPN pour que PC_Casa1 et PC_Oficina1 communiquent comme s’ils étaient sur le même réseau.',
                hint: 'Deux réseaux privés ne se voient pas par Internet. Ajoutez un « VPN dans le cloud », reliez-le avec un câble à Internet et reliez les deux PC depuis l’onglet VPN de chacun.'
            },
            18: {
                title: 'Le VPN avec deux problèmes',
                story: 'Le bureau a un serveur VPN local. PC_Casa1 et PC_Oficina1 devraient communiquer par le VPN, mais ils n’y arrivent pas. Cette fois il y a plus d’un problème.',
                hint: 'Réparez un problème et vérifiez encore une fois : il peut en rester un autre. Pensez à comment on atteint le serveur depuis l’extérieur et si les deux PC sont dans le VPN.'
            }
        }
    },
    log: {},     // journal du trafic (clés + variables)
    error: {},   // validations et alertes

    // Phase 3 · zone 3 — fenêtres et dialogues :
    modal: {
        close: 'Fermer',
        closeTitle: 'Fermer (Échap)',
        deliver: {
            title: 'Rendre mon travail'
        },
        about: {
            subtitle: 'Simulateur de Réseaux Éducatif · version 35',
            license: 'Distribué sous licence MIT',
            donation: 'Si le simulateur vous plaît, une mention ou un don à l’auteur reste à votre appréciation.',
            cafecito: 'Offrez-moi un Cafecito',
            kofi: 'Soutenir sur Ko-fi'
        },
        restore: {
            title: 'Nous avons trouvé votre travail précédent',
            hint: 'Le simulateur enregistre votre réseau automatiquement dans ce navigateur. Pour le rendre ou le partager, utilisez Fichier → Enregistrer le réseau.',
            startOver: 'Repartir de zéro',
            continue: 'Continuer où j’en étais'
        },
        student: {
            title: 'Comment vous appelez-vous ?',
            hint: 'Votre nom est enregistré dans les réseaux et les activités que vous sauvegardez, ainsi votre professeur sait à qui appartient chaque rendu.',
            placeholder: 'Ex. : Ana Pereira',
            notNow: 'Pas maintenant',
            save: 'Enregistrer le nom'
        },
        mkact: {
            title: 'Créer une activité avec ce réseau',
            hint: 'Créez le réseau, cassez quelque chose exprès (une IP, un câble, une route…) et définissez ce que l’élève doit réussir. Le tout est enregistré dans un fichier que l’élève ouvre avec « Ouvrir un réseau ».',
            labelTitle: 'Titre',
            placeholderTitle: 'Ex. : Le PC du secrétariat ne sort pas sur Internet',
            labelLevel: 'Difficulté',
            level: {
                easy: 'Facile',
                medium: 'Moyen',
                hard: 'Difficile'
            },
            labelStory: 'Énoncé (ce qui arrive au réseau)',
            placeholderStory: 'Ex. : Depuis hier, personne au laboratoire n’arrive à ouvrir la page de l’école.',
            labelHint: 'Indice (facultatif)',
            placeholderHint: 'Ex. : Vérifiez la passerelle des PC.',
            goals: 'Objectifs : qui doit pouvoir communiquer ?',
            save: 'Enregistrer l’activité'
        },
        grade: {
            title: 'Corriger les rendus',
            hint: 'Choisissez un ou plusieurs fichiers enregistrés par vos élèves. Le simulateur vérifie chaque réseau à nouveau et vous montre qui l’a résolu. Avec « Voir », vous ouvrez le réseau de l’élève pour le revoir.',
            chooseFiles: 'Choisir des fichiers…',
            downloadCsv: 'Télécharger le résumé (Excel)'
        },
        activities: {
            title: 'Activités : réparez le réseau !',
            hint: 'Chaque activité charge un réseau avec une panne cachée. Trouvez-la, réparez-la et vérifiez.'
        },
        save: {
            title: 'Enregistrer le réseau',
            hint: 'Choisissez un nom pour identifier votre réseau.',
            placeholder: 'Ex. : Réseau de la classe',
            save: 'Enregistrer'
        },
        device: {
            delete: 'Supprimer',
            deleteTitle: 'Supprimer cet appareil du réseau'
        }
    }
};
