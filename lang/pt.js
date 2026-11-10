// lang/pt.js — Dicionário em português.
//
// O dicionário em espanhol (lang/es.js) é a fonte de verdade e o fallback.
// Toda chave aqui precisa existir em lang/es.js com o mesmo nome: o verificador
// `node tools/check_keys.mjs --all` compara os dois dicionários.
//
// Regras:
//  - Interpolação com {variavel}.
//  - Termos técnicos (DHCP, ARP, MAC, VLAN, gateway…) permanecem como estão.
//  - A saída da console/CLI dos dispositivos não é traduzida.
window.I18N_DICTS = window.I18N_DICTS || {};
window.I18N_DICTS.pt = {
    _meta: { name: 'Português', dir: 'ltr' },

    app: {
        title: 'Simulador de Redes Educativo',
        tagline: 'Simulador de Redes Interativo para Estudantes'
    },

    ui: {
        langSelector: 'Idioma / Language',
        cancel: 'Cancelar'
    },

    header: {
        toolSelect: 'Mover / Selecionar',
        toolCable: 'Conectar Cabo',
        toolDeleteCable: 'Excluir Cabo',
        undo: 'Desfazer (Ctrl+Z)',
        redo: 'Refazer (Ctrl+Y)',
        deliver: 'Entregar',
        deliverTitle: 'Salve seu trabalho com seu nome para entregar ao professor',
        studentDefault: 'Aluno',
        studentTitle: 'Seu nome fica salvo nas redes e atividades que você salvar',
        activities: 'Atividades',
        activitiesTitle: 'Redes com falhas para resolver',
        support: 'Apoiar',
        supportTitle: 'Sobre o simulador e apoiar o autor'
    },
    menu: {
        file: 'Arquivo',
        view: 'Ver',
        saveNetwork: 'Salvar rede…',
        openNetwork: 'Abrir rede…',
        exportAs: 'Exportar a rede como…',
        imagePng: 'Imagem PNG',
        imageJpg: 'Imagem JPG',
        docPdf: 'Documento PDF (com lista de equipamentos)',
        offlineCopy: 'Salvar cópia para usar sem internet',
        offlineCopyTitle: 'Baixe uma versão deste simulador que funciona sem internet (é preciso internet só uma vez)',
        forTeacher: 'Para o professor',
        makeActivity: 'Criar atividade com esta rede…',
        gradeDeliveries: 'Corrigir entregas…',
        loadDemo: 'Carregar exemplo',
        demoVpnLocal: 'Exemplo: VPN local (abrir portas)',
        demoVpnLocalTitle: 'VPN dentro da rede do escritório: para chegar de fora é preciso abrir uma porta no roteador',
        demoVpnCloud: 'Exemplo: 2 redes unidas por uma VPN',
        demoVpnCloudTitle: 'Casa e escritório, cada um com seu roteador e internet, unidos por uma VPN na nuvem',
        demoTwoNetworks: 'Exemplo: 2 redes',
        demoTwoNetworksTitle: 'Duas redes unidas por um roteador com várias interfaces',
        clearAll: 'Limpar tudo',
        devicesPanel: 'Painel de dispositivos',
        simPanel: 'Painel de simulação',
        themeLight: 'Modo claro',
        themeDark: 'Modo escuro',
        tour: 'Visita guiada',
        aboutRights: 'Sobre · Direitos',
        project: 'Projetar em sala',
        projectTitle: 'Tela cheia com textos grandes (Esc para sair)'
    },

    // Fase 3 · zona 2 — painéis (paleta, tela, simulação, atividade):
    device: {
        paletteTitle: 'Adicionar dispositivos',
        paletteHint: 'Clique em um equipamento para adicioná-lo. Clique duas vezes em um equipamento da rede para abrir suas propriedades; a tecla Delete o remove.',
        legendTitle: 'Legenda de estados:',
        legendOk: 'Conexão OK / IP válido',
        legendApipa: 'APIPA (sem IP / sem DHCP)',
        legendError: 'Desconectado / Erro de sub-rede',
        aboutTitle: 'Sobre este simulador',
        type: {
            router: 'Roteador WiFi', routerDesc: 'Gateway + DHCP + WiFi',
            lrouter: 'Roteador (várias redes)', lrouterDesc: 'Interfaces + tabela de rotas',
            notebook: 'Notebook', notebookDesc: 'Cabo ou WiFi',
            netbook: 'Netbook', netbookDesc: 'Notebook pequeno, cabo ou WiFi',
            tv: 'Smart TV', tvDesc: 'WiFi ou cabo · navegador',
            vpncloud: 'VPN na nuvem (VPS)', vpncloudDesc: 'Tipo Tailscale / ZeroTier',
            vpnlocal: 'Servidor VPN local', vpnlocalDesc: 'Tipo WireGuard / OpenVPN',
            dns: 'Servidor DNS', dnsDesc: 'Tabela de nomes → IP',
            switch: 'Switch (L2 / L3)', switchDesc: 'Camada 2 ou Camada 3 (multicamada)',
            pc: 'Computador (PC)', pcDesc: 'Ethernet / Console / Web',
            phone: 'Smartphone WiFi', phoneDesc: 'Conexão sem fio',
            cloud: 'Internet (ISP Cloud)', cloudDesc: 'Acesso à World Wide Web'
        },
        // Nomes padrão dos equipamentos na tela ({id} = número).
        // São gerados no idioma ativo; ao exportar/importar são mantidos.
        defaultName: {
            notebook: 'Notebook_{id}',
            netbook: 'Netbook_{id}',
            tv: 'SmartTV_{id}',
            router: 'Roteador_WiFi_{id}',
            lrouter: 'Roteador_{id}',
            dns: 'DNS_{id}',
            vpnCloud: 'VPN_Nuvem_{id}',
            vpnLocal: 'VPN_Local_{id}',
            switch: 'Switch_LAN_{id}',
            pc: 'PC_Aluno_{id}',
            phone: 'Smartphone_{id}',
            cloud: 'Internet_ISP',
            other: 'Dispositivo_{id}'
        },
        layer2: 'Modo Camada 2'
    },
    canvas: {
        cableMode: 'Modo cabo: clique em dois dispositivos para conectá-los',
        deleteCableMode: 'Modo excluir cabo: clique em qualquer cabo da tela para cortá-lo',
        emptyTitle: 'Sua área de trabalho está vazia',
        emptyHintA: 'Adicione equipamentos pelo painel à esquerda, ou abra um exemplo em',
        zoomIn: 'Aproximar (tecla +)',
        zoomReset: 'Voltar para 100%',
        zoomOut: 'Afastar (tecla -)',
        fitView: 'Ver toda a rede (tecla 0)',
        projectExit: 'Sair da projeção'
    },
    sim: {
        title: 'Simular comunicação',
        hidePanel: 'Ocultar painel',
        start: 'Iniciar',
        pause: 'Pausar / continuar',
        stop: 'Parar simulação',
        all: 'Todos navegando ao mesmo tempo',
        allTitle: 'Todos os equipamentos se comunicam ao mesmo tempo, até você decidir parar',
        modeLabel: 'Modo de simulação',
        modeSimple: '🟢 Modo simples: apenas o percurso',
        modeAdvanced: '🔬 Modo avançado: camadas, ARP, MAC, DNS e rotas',
        source: 'Origem',
        destination: 'Destino',
        protocolLabel: 'Tipo de comunicação',
        protocol: {
            icmp: 'ICMP / Ping',
            arp: 'ARP / Buscar MAC',
            dns: 'DNS / Resolver nome',
            http: 'HTTP / Requisição web',
            dhcp: 'DHCP / Pedir IP'
        },
        auto: 'Automático',
        noDevices: 'Sem dispositivos',
        site: 'Nome do site (HTTP/DNS)',
        dnsServer: 'Servidor DNS',
        tcpHandshake: 'Mostrar o handshake TCP (SYN, SYN-ACK, ACK) antes do HTTP',
        speed: 'Velocidade',
        speedSlow: 'Mais lenta',
        speedFast: 'Mais rápida',
        speedLabel: 'Velocidade da simulação',
        layers: 'Ver camadas',
        vpn: 'Enviar pela VPN (túnel criptografado com IP de VPN)',
        vpnTitle: 'Se origem e destino estão na mesma VPN, o pacote viaja dentro do túnel criptografado',
        step: 'Passo a passo (espere meu OK em cada aviso)',
        stepTitle: 'A simulação para em cada passo até você pressionar ▶ (ou a barra de espaço)',
        clearTables: 'Limpar tabelas (ARP, MAC, DNS)',
        clearTablesTitle: 'Esvazia as tabelas ARP dos equipamentos e as tabelas MAC dos switches',
        statusIdle: 'Escolha origem, destino e protocolo para ver o percurso.',
        modeAdvancedHint: 'Modo avançado: você vê camadas, tabelas ARP/MAC/DNS e rotas.',
        modeSimpleHint: 'Modo simples: apenas o percurso do pacote.',
        paused: 'Pausado. Pressione ▶ para continuar.',
        stepOf: 'Passo {step} de {total}',
        stepHint: 'Passo a passo: leia o aviso e pressione ▶ (ou a barra de espaço) para continuar.',
        tablesCleared: 'Tabelas ARP e MAC limpas. A próxima comunicação começa do zero.',
        gatewayHint: ' (o gateway dele)',
        legNatRedirect: '{ip} → {public}:{port} (o roteador redireciona para {target})',
        table: {
            empty: '(vazia)',
            new: '● NOVA',
            arpTitle: 'Tabela ARP de {name}',
            macTitle: 'Tabela MAC de {name}',
            dnsTitle: 'Tabela DNS de {name}',
            routesTitle: 'Tabela de rotas de {name}',
            leaseTitle: 'Concessão DHCP de {name}',
            vpnMembersTitle: 'Equipamentos conectados a {name} ({preset})',
            headName: 'Nome',
            headIp: 'IP',
            headMac: 'MAC',
            headPort: 'Porta para',
            headDest: 'Destino',
            headOut: 'Saída',
            headData: 'Dado',
            headValue: 'Valor',
            headVpnIp: 'IP VPN',
            headDevice: 'Equipamento',
            dhcpIp: 'Endereço IP',
            dhcpMask: 'Máscara',
            dhcpGateway: 'Gateway',
            dhcpServer: 'Servidor DHCP',
            routeConnected: 'conectada · interface para {name}',
            routeVia: 'via {via}',
            routeLocal: 'rede local (conectada)',
            routeDefault: 'rota padrão → {name}'
        },
        // Textos de cada protocolo durante a simulação (pedido / destino / resposta).
        text: {
            icmp: {
                req: '{s} envia um ping para {d}: "você está aí?"',
                dest: '{d} recebe o ping e prepara a resposta',
                rep: '{d} responde "sim, estou aqui!" (echo reply)'
            },
            arp: {
                req: '{s} pergunta: "quem tem o IP {ip}? qual é o MAC?"',
                dest: '{d} reconhece o próprio IP e prepara a resposta',
                rep: '{d} responde: "esse IP é meu, este é o meu endereço MAC"'
            },
            dns: {
                req: '{s} pergunta: "qual é o IP de {site}?"',
                dest: '{d} procura o nome na tabela de domínios',
                rep: '{d} responde: {site} = {ip}',
                repUnknown: '{d} responde: "não conheço o nome {site}" (não existe)'
            },
            http: {
                req: '{s} pede uma página web para {d} (HTTP GET)',
                dest: '{d} prepara a página solicitada',
                rep: '{d} envia a página (200 OK)'
            },
            syn: {
                req: '1/3 SYN: {s} diz "quero abrir uma conexão TCP com {d}"',
                dest: '{d} aceita abrir a conexão e prepara a resposta',
                rep: '2/3 SYN-ACK: {d} responde "concordo, pode confirmar?"'
            },
            discover: {
                req: '1/4 Discover: {s} não tem IP e grita para a rede toda: "existe algum servidor DHCP?"',
                dest: '{d} (servidor DHCP) ouve o pedido e escolhe um IP livre do seu intervalo',
                rep: '2/4 Offer: {d} oferece o IP {ip} para {s}'
            },
            request: {
                req: '3/4 Request: {s} aceita a oferta: "quero usar o IP {ip}"',
                dest: '{d} reserva o IP {ip} para aquele equipamento',
                rep: '4/4 Ack: {d} confirma "é seu" e entrega máscara e gateway'
            }
        },
        node: {
            switch: '{name} (switch) recebe o quadro e o encaminha pela porta certa',
            router: '{name} (roteador) recebe o pacote e decide por onde enviá-lo',
            cloud: '{name} (Internet) recebe o pacote e o faz avançar',
            vpn: '{name} (servidor VPN) recebe o tráfego criptografado e o encaminha',
            default: '{name} recebe o pacote e o passa para o próximo equipamento'
        },
        // Avisos sobre a tela e linhas do log de tráfego.
        cap: {
            arpKnown: '{s} já conhece o MAC de {hop} ({ip}). Veja a tabela ARP dele: não precisa perguntar de novo.',
            arpUnknown: '{s} não conhece o MAC de {hop}{gw}. Antes de enviar dados, ele pergunta com ARP.',
            noPath: '{s} não consegue chegar em {d}: não há cabos nem WiFi ligando os dois',
            travel: '{from} → {to}: o pacote viaja pelo {link}',
            travelWifi: 'WiFi',
            travelCable: 'cabo',
            back: '{from} → {to}: a resposta volta',
            dnsKnown: '{s} já conhece o IP de {name} (tabela DNS): não precisa perguntar.',
            dnsAsk: '{s} conhece o nome {name} mas não o IP. Primeiro ele pergunta a um servidor DNS ({dns}).',
            dnsWrongHost: 'O nome {name} aponta para {real} ({ip}), não para {dest}. A página é pedida a {real}.'
        },
        log: {
            arpKnown: '{s} usa sua tabela ARP (já conhece {hop}).',
            arpUnknown: '{s} não tem {hop} na tabela ARP: faz uma consulta ARP antes.',
            noPath: 'FALHA: {s} não tem rota de enlaces até {d}.',
            route: '{label} · Percurso: {path}',
            arpSave: '{name} guarda na tabela ARP: {ip} → {mac}.',
            dnsSave: '{name} guarda na tabela DNS: {site} → {ip}.',
            dnsNeed: '{s} precisa resolver {name} com DNS.',
            dnsWrongHost: '{name} → {ip}: o pedido vai para {real}.',
            vpnForward: '{name} (servidor VPN) encaminha o tráfego do túnel para {ip}.',
            switchLearned: '{name} (switch) aprendeu o MAC de {mac} e encaminha por todas as portas.',
            switchKnew: '{name} (switch) já conhecia o MAC de {mac} e encaminha por todas as portas.',
            switchLearnedOne: '{name} (switch) aprendeu o MAC de {mac} e encaminha por uma única porta.',
            switchKnewOne: '{name} (switch) já conhecia o MAC de {mac} e encaminha por uma única porta.',
            routeNotFound: '{name} não tem rota para {ip}: pacote descartado.',
            routeWrongNext: 'Próximo salto incorreto em {name}.',
            routeConnected: '{name} procura {ip} na tabela de rotas: está em uma rede conectada a uma das interfaces dele.',
            routeStatic: '{name} procura {ip} na tabela de rotas: usa a rota {net}/{prefix} via {via}.',
            routeLocal: '{name} procura {ip} na tabela de rotas: está na rede local dele.',
            routeDefault: '{name} procura {ip} na tabela de rotas: usa a rota padrão.',
            end: 'Fim: {label} concluída com sucesso.'
        },
        layer: {
            encapTitle: 'Encapsulamento em {name}: cada camada acrescenta seu cabeçalho',
            decapTitle: 'Desencapsulamento em {name}: remove-se uma camada por vez, de fora para dentro',
            vpnDecrypt: 'O servidor VPN descriptografa o pacote, lê o IP de VPN de destino e o criptografa de novo para o outro equipamento',
            switchBroadcast: 'Difusão (FF:FF…): o switch envia por TODAS as portas',
            switchKnown: 'O switch já conhece o MAC de destino: envia por uma única porta',
            switchUnknown: 'O switch ainda não conhece o MAC de destino: envia por todas as portas (inundação)',
            routerArp: 'Atenção: o ARP normalmente não atravessa um roteador; só funciona dentro da mesma rede',
            routerNewFrame: 'O roteador lê o IP, descarta o quadro antigo e monta outro com MACs novos',
            routerRoute: 'O roteador lê o IP, escolhe a interface de saída e monta um quadro novo com outros MACs',
            travels: 'O pacote inteiro viaja, com todas as camadas juntas'
        },
        route: {
            notFound: '{name} procura {ip} na tabela de rotas e não encontra nenhuma: descarta o pacote. Falta uma rota.',
            wrongNext: 'A rota de {name} aponta para {via}, mas o próximo equipamento conectado é {next}. Revise a rota ou os cabos.'
        },
        done: {
            syn: 'Pronto! A conexão TCP entre {s} e {d} está aberta. Agora {s} confirma (ACK) e pede a página.',
            discover: 'Pronto! {s} recebeu uma oferta de {d}: o IP {ip}. Agora ele vai aceitar.',
            dns: 'Pronto! {s} já sabe que {site} é {ip}. Agora sim pode pedir a página web.',
            arp: 'Pronto! {s} sabe o MAC de {d} e guardou na tabela ARP. Agora sim envia o {pre}.',
            request: 'Pronto! {s} já tem IP: {ip}, gateway {gw}. Já pode se comunicar com a rede.',
            reply: 'Pronto! {s} recebeu a resposta de {d}. A comunicação funciona.'
        },
        fail: {
            noGateway: '{s} quer chegar em outra rede ({ip}) mas não tem gateway: não sabe por onde sair.',
            logNoGateway: '{s} não tem gateway configurado.',
            gatewayMissing: 'O gateway de {s} ({gw}) não existe nesta rede: o pacote não sabe por onde sair.',
            logGatewayMissing: 'O gateway {gw} não existe.',
            gatewayOtherNet: 'O gateway {gw} não está na mesma rede que {s} ({ip}): revise o IP e a máscara.',
            logGatewayOtherNet: 'Gateway fora da rede de {s}.',
            pathNotViaGw: 'O caminho até {d} não passa pelo gateway {gw}. Revise os cabos.',
            logPathNotViaGw: 'O caminho físico não passa por {gw}.',
            destNoGateway: '{d} receberia o pacote mas não sabe como responder: {reason}.',
            logDestNoGateway: '{d} não pode responder (gateway).',
            reasonGwMissing: 'o gateway {gw} dele não existe',
            reasonNoGw: 'não tem gateway',
            dnsOff: '{d} (servidor DNS) está desligado: ninguém responde à consulta.',
            logDnsOff: '{d} está desligado.',
            noDnsPath: '{s} não chega ao servidor DNS {dns}: não há caminho.',
            logNoDnsPath: 'Sem caminho até o servidor DNS {dns}.',
            noIpOwner: 'O nome {name} resolveu para {ip}, mas nenhum equipamento da rede tem esse IP.',
            logNoIpOwner: 'Nenhum equipamento tem o IP {ip}.',
            noPathToReal: '{name} aponta para {real} ({ip}), mas não há caminho até esse equipamento.',
            logNoPathToReal: 'Sem caminho até {real}.',
            dnsNameMissing: '{d} não conhece o nome {site} e responde "não existe". Adicione-o nos registros do servidor DNS.',
            logDnsNameMissing: '{d}: o nome {site} não existe.',
            dhcpStaticIp: '{s} tem IP fixo: não usa DHCP. Troque o modo para DHCP na configuração de IP.',
            logDhcpStaticIp: '{s} usa IP fixo, não pede IP por DHCP.',
            dhcpNotServer: '{s} não é um servidor DHCP (ou está desligado): ninguém responde ao Discover.',
            logDhcpNotServer: '{s} não responde DHCP.',
            dhcpNoIp: '{s} não conseguiu oferecer um IP para {target}: revise o intervalo DHCP do servidor (ou se o cabo chega até ele).',
            logDhcpNoIp: '{s} não tem IP para oferecer a {target}.'
        },
        status: {
            noPath: 'FALHA: não existe caminho físico entre origem e destino.',
            running: '{label}: {s} ⇄ {d} · {hops} salto(s) de ida e outros {hops} de volta',
            completed: 'CONCLUÍDO: {label} foi e voltou entre {s} e {d}.',
            stopped: 'Simulação parada. Você pode iniciar outra comunicação.'
        },
        toast: {
            needTwoDevices: 'Adicione pelo menos dois equipamentos para simular uma comunicação.',
            sameDevice: 'A origem e o destino devem ser diferentes.',
            noPath: 'Não há caminho conectado entre esses equipamentos.',
            completed: 'Simulação {label} concluída.'
        },
        req: {
            vpn: '{s} (IP VPN {srcIp}) escreve para {d} (IP VPN {dstIp}) pelo túnel {preset}{mode}',
            vpnRelay: ' · passa pelo servidor VPN',
            vpnDirect: ' · conexão direta entre os equipamentos',
            ackGet: '3/3 ACK: {s} confirma a conexão e pede a página para {d} (HTTP GET)'
        },
    },

    // Fase 3 · zona 3 — modais e diálogos:
    act: {
        close: 'Fechar atividade',
        verify: 'Verificar',
        hint: 'Dica',
        deliverTitle: 'Salvar e entregar',
        defaultTitle: 'Atividade',
        defaultHint: 'Use a simulação no modo avançado para ver onde ela falha.',
        tip: 'Dica: use a simulação no modo avançado para ver onde ela falha.',
        level: {
            easy: 'Fácil',
            medium: 'Médio',
            hard: 'Difícil'
        },
        goal: {
            prefix: '🎯 Objetivo: {goals}.',
            comm: 'que {a} e {b} consigam se comunicar',
            vpn: 'que {a} e {b} consigam se comunicar pela VPN',
            site: 'que {a} consiga abrir {site}',
            and: ' e '
        },
        student: {
            label: '👤 Aluno: {name}',
            prompt: '👤 Escreva seu nome com o botão acima para que ele fique na sua entrega.'
        },
        submission: {
            label: '📥 Entrega de {student} · salva {date} · o aluno marcou como {state}. Use "Verificar" para conferir agora.',
            solved: 'resolvida ✅',
            unsolved: 'não resolvida ❌'
        },
        msg: {
            solved: '✅ Resolvido{student}! A rede funciona. Salve a rede para entregar.',
            notYetLabel: 'Ainda não:',
            notYet: '{a} e {b} não conseguem se comunicar. Use a "Dica" se travar.',
            diagnosticLabel: 'Diagnóstico:',
            noProblems: '✅ Não resta nenhum problema: já está resolvido!',
            deviceRemoved: 'Um dos equipamentos da atividade foi removido.'
        },
        builtin: {
            1: {
                title: 'O PC que não sai',
                story: 'PC_A1 consegue falar com PC_A2, mas não se comunica com PC_B1, que está em outra rede.',
                hint: 'Para sair da sua rede, um PC precisa saber a quem entregar os pacotes. Verifique a configuração de IP dele.'
            },
            2: {
                title: 'O cabo solto',
                story: 'PC_B1 parou de responder. Tudo parece estar configurado corretamente.',
                hint: 'Olhe os cabos com atenção: cada equipamento está ligado ao seu switch? Use «Conectar Cabo» para corrigir.'
            },
            3: {
                title: 'Dois com o mesmo IP',
                story: 'PC_A1 e PC_A2 estão na mesma rede, mas a comunicação é um desastre.',
                hint: 'Cada equipamento precisa de um endereço IP único. Compare os IPs dos dois.'
            },
            4: {
                title: 'A máscara que não bate',
                story: 'PC_A1 acha que PC_A2 está na mesma rede que ele, mas PC_A2 pensa diferente.',
                hint: 'Veja a máscara de sub-rede de PC_A2 e compare a que rede cada IP pertence.'
            },
            5: {
                title: 'Chega mas não volta',
                story: 'Os pacotes de PC_A1 chegam a PC_B1, mas a resposta nunca volta.',
                hint: 'Uma resposta também tem que sair da rede de PC_B1. Verifique o gateway dele.'
            },
            6: {
                title: 'Falta uma rota',
                story: 'Dois roteadores unem as redes 192.168.1.0/24 e 192.168.2.0/24. A ida funciona, mas PC_A1 não recebe resposta de PC_B1.',
                hint: 'Veja a tabela de rotas dos dois roteadores: o segundo sabe como voltar para a rede 192.168.1.0/24? As rotas são adicionadas na aba «Interfaces e rotas».'
            },
            7: {
                title: 'O nome não existe',
                story: 'PC_A1 consegue fazer ping para Servidor_Web pelo IP, mas ao digitar www.exemplo.com a página não abre.',
                hint: 'O ping por IP funciona, então a rede está boa. Veja o que o servidor DNS sabe: existe um registro para esse nome?'
            },
            8: {
                title: 'O DNS que não responde',
                story: 'Ontem a página abria perfeitamente. Hoje ninguém consegue entrar em www.exemplo.com.',
                hint: 'Verifique o estado do servidor DNS: está ligado?'
            },
            9: {
                title: 'A página errada',
                story: 'Ao digitar www.exemplo.com abre uma página, mas não é a do Servidor_Web. Alguém mexeu no DNS.',
                hint: 'Compare o IP do registro DNS com o IP real do Servidor_Web.'
            },
            10: {
                title: 'O PC sem IP',
                story: 'Dois PCs da rede da sala não conseguem se comunicar. Os IPs deles começam com 169.254.',
                hint: 'Esses endereços aparecem quando ninguém dá um IP a eles. Verifique o servidor DHCP do roteador.'
            },
            11: {
                title: 'A saída para a Internet',
                story: 'Router_Central une a rede 192.168.1.0/24 ao provedor de Internet (203.0.113.1). PC_A1 não chega à Internet (8.8.8.8).',
                hint: 'O roteador não sabe onde fica a Internet. Falta uma rota padrão (0.0.0.0/0) apontando para o provedor: 203.0.113.1.'
            },
            12: {
                title: 'Duas falhas juntas',
                story: 'A rede de dois roteadores continua sem comunicar PC_A1 com PC_B1. Dessa vez há mais de um problema.',
                hint: 'Conserte um problema e verifique de novo: pode sobrar outro. Verifique o gateway de PC_B1 e as rotas dos dois roteadores.'
            },
            13: {
                title: 'A VPN do escritório não conecta',
                story: 'O escritório tem um servidor VPN (WireGuard) dentro da sua rede. De casa querem entrar na VPN, mas PC_Casa1 não consegue se conectar.',
                hint: 'O servidor está dentro da rede privada do escritório: da Internet não se chega até ele. Veja o painel do servidor VPN e o Port Forwarding do roteador do escritório.'
            },
            14: {
                title: 'A porta está aberta errada',
                story: 'Alguém abriu uma porta no roteador do escritório para a VPN, mas PC_Casa1 continua sem conseguir se conectar.',
                hint: 'A regra existe, mas tem um erro. Verifique o protocolo (é UDP ou TCP?), as duas portas e a qual equipamento ela redireciona.'
            },
            15: {
                title: 'O servidor VPN está desligado',
                story: 'Ontem a casa e o escritório se enxergavam pela VPN. Hoje nenhum PC consegue se comunicar com o outro.',
                hint: 'Abra as propriedades do servidor VPN na nuvem e verifique o estado dele.'
            },
            16: {
                title: 'Falta ligar um equipamento à VPN',
                story: 'PC_Casa1 já está na VPN, mas não consegue se comunicar com PC_Oficina1.',
                hint: 'Veja os dois PCs: um deles não tem o segundo IP (o da VPN). Abra as propriedades e procure a aba VPN.'
            },
            17: {
                title: 'Unir duas redes com uma VPN',
                story: 'A casa e o escritório têm cada um seu roteador e sua Internet, mas os PCs não se enxergam. Monte uma VPN para PC_Casa1 e PC_Oficina1 se comunicarem como se estivessem na mesma rede.',
                hint: 'Duas redes privadas não se enxergam pela Internet. Adicione uma «VPN na nuvem», conecte-a com um cabo à Internet e una os dois PCs pela aba VPN de cada um.'
            },
            18: {
                title: 'A VPN com dois problemas',
                story: 'O escritório tem um servidor VPN local. PC_Casa1 e PC_Oficina1 deveriam se comunicar pela VPN, mas não conseguem. Dessa vez há mais de um problema.',
                hint: 'Conserte um problema e verifique de novo: pode sobrar outro. Pense em como se chega de fora ao servidor e se os dois PCs estão na VPN.'
            }
        }
    },

    // Fase 3 · zona 4 — mensagens dinâmicas (toasts e diagnósticos):
    toast: {
        deviceAdded: 'Equipamento adicionado: {name}',
        clickCableToDelete: 'Clique direto na linha do cabo para excluí-lo',
        cableSourceSelected: 'Equipamento de origem selecionado. Escolha o destino.',
        selfConnection: 'Não é possível conectar um equipamento a ele mesmo',
        linkExists: 'Já existe um enlace entre esses equipamentos',
        connectionOk: 'Conexão física realizada com sucesso',
        cableDeleted: 'Cabo/Conexão excluído com sucesso',
        invalidIp: 'IP ou máscara inválida. Use um endereço de host e uma máscara contígua.',
        ipAlreadyAssigned: 'Esse endereço IP já está atribuído a outro equipamento.',
        invalidGateway: 'O gateway não é um endereço IPv4 válido.',
        gatewayWrongSubnet: 'O gateway precisa estar na mesma sub-rede do equipamento.',
        ipConfigApplied: 'Configuração de IP aplicada com sucesso.',
        activityLoaded: 'Atividade carregada: {title}',
        activitySolved: 'Atividade resolvida!'
    },
    diag: {
        dnsUnreachable: '{src} não chega ao servidor DNS ({dns}): {reason}',
        dnsOffline: 'O servidor DNS {dns} está desligado.',
        dnsUnknownName: 'O servidor DNS {dns} não conhece o nome {site}.',
        nameNoOwner: 'O nome {site} aponta para {ip}, que não pertence a nenhum equipamento.',
        nameWrongHost: 'O nome {site} aponta para {owner} ({ip}), mas a página está em {dst}.',
        noDhcp: '{name} não conseguiu IP: nenhum servidor DHCP respondeu (ficou com um endereço automático 169.254.x.x).',
        noPhysicalPath: 'Não há caminho físico entre {src} e {dst}: falta um cabo.',
        duplicateIp: '{a} e {b} têm o mesmo IP ({ip}).',
        privateIp: 'O endereço {ip} é privado: de outra rede, a Internet não consegue chegar nele. Para comunicar redes diferentes é preciso uma VPN (ou um IP público).',
        subnetMismatch: '{src} e {dst} não concordam se estão na mesma rede: as máscaras de sub-rede são diferentes.',
        noRoute: '{name} não tem nenhuma rota para {ip}.',
        noGateway: '{name} não tem gateway: não sabe como sair da rede dele.',
        gatewayMissing: 'O gateway de {name} ({gateway}) não existe na rede.',
        gatewayWrongNetwork: 'O gateway {gateway} não está na mesma rede que {name} ({ip}): revise o IP e a máscara.',
        pathNotViaGateway: 'O caminho de {name} não passa pelo gateway {gateway}.',
        routeWrongNextHop: 'A rota de {name} aponta para {via}, que não é o próximo equipamento.'
    },
    file: {
        myNetwork: 'Minha rede',
        saved: 'Rede "{name}" salva.',
        loaded: 'Rede "{name}" carregada.',
        submissionOpened: 'Entrega de {student} aberta.',
        cannotOpen: 'Não foi possível abrir o arquivo: {error}',
        unknownFormat: 'Formato não reconhecido',
        invalidDevices: 'Há equipamentos ou endereços IP inválidos',
        invalidConnections: 'Há conexões inválidas',
        demoLoaded: 'Topologia de exemplo carregada',
        confirmClear: 'Tem certeza de que quer apagar todos os equipamentos e conexões?',
        cleared: 'Área de trabalho limpa'
    },

    // Detalhe do pacote na vista por camadas (camadas OSI e conteúdo).
    packet: {
        link: 'Enlace · Ethernet',
        net: 'Rede · IP',
        vpn: 'Túnel VPN (criptografado)',
        inet: 'Rede interna · IP VPN',
        tr: 'Transporte',
        app: 'Aplicação',
        broadcastMac: '{mac} → FF:FF:FF:FF:FF:FF (todos)',
        tunnel: '{preset}: túnel UDP porta {port} · tudo o que está dentro vai criptografado',
        icmp: '{src} → {dst} · ICMP {type}',
        icmpReply: 'Echo Reply',
        icmpRequest: 'Echo Request',
        arpReply: ' · "{ip} está no {mac}"',
        arpRequest: ' · "quem tem {ip}?"',
        dnsResolved: 'DNS: {name} = {ip}',
        dnsNxdomain: 'DNS: {name} não existe (NXDOMAIN)',
        dnsQuery: 'DNS: qual é o IP de {name}?',
        udp53to: 'UDP porta 53 → {port}',
        udpTo53: 'UDP porta {port} → 53',
        tcp80to: 'TCP porta 80 → {port} · flags SYN + ACK',
        tcpTo80: 'TCP porta {port} → 80 · flag SYN',
        dhcpOffer: 'DHCP Offer: IP {ip}/{prefix} · gateway {gw}',
        dhcpAck: 'DHCP Ack: IP {ip}/{prefix} · gateway {gw}',
        dhcpDiscover: 'DHCP Discover: existe algum servidor DHCP?',
        dhcpRequest: 'DHCP Request: quero o IP {ip}',
        udp67to68: 'UDP porta 67 → 68',
        udp68to67: 'UDP porta 68 → 67',
        dhcpNet: '{src} → {ip}',
        broadcastNet: '0.0.0.0 → 255.255.255.255 (difusão)',
        httpOk: 'HTTP 200 OK + página web',
        httpGet: 'HTTP GET / (pedindo a página)',
        tcp80: 'TCP porta 80 → {port}',
        tcpTo80ack: 'TCP porta {port} → 80 · flag ACK (confirma a conexão)',
        arpWho: 'ARP quem?',
        arpMyMac: 'ARP meu MAC',
        dnsIp: 'DNS qual IP?',
        dnsIpOk: 'DNS IP'
    },
    studentUi: {
        default: 'Aluno',
        title: 'Aluno: {name} (clique para mudar)',
        titleEmpty: 'Escreva seu nome: ele fica guardado no que você entregar',
        needName: 'Escreva seu nome para poder entregar.',
        hello: 'Olá, {name}. Seu nome vai ficar no que você salvar.'
    },
    teacher: {
        needNetwork: 'Monte primeiro uma rede com pelo menos dois equipamentos.',
        needTitle: 'Dê um título à atividade.',
        needGoals: 'Escolha pelo menos um objetivo: dois equipamentos diferentes que devam se comunicar.',
        alreadySolved: 'Com a rede como está, os objetivos JÁ são cumpridos: o aluno não teria nada para corrigir. Salvar assim mesmo?',
        goalPlaceholder: 'site web, ou escreva VPN',
        activityName: 'Atividade - {title}',
        saved: 'Atividade «{title}» salva. Passe o arquivo aos seus alunos: eles abrem com Arquivo → Abrir rede.'
    },
    grade: {
        noFiles: 'Você ainda não escolheu arquivos.',
        teacherFile: '(arquivo do professor)',
        noName: '(sem nome)',
        freeNetwork: 'Rede livre',
        invalidFile: 'Arquivo inválido',
        freeNetworkResult: 'Rede livre (sem atividade)',
        solved: '✅ Resolvida',
        notSolved: '❌ Não resolvida',
        viewNetwork: 'Ver rede',
        summary: '{count} arquivo(s) · {done} de {graded} atividades resolvidas',
        headStudent: 'Aluno',
        headActivity: 'Atividade / Rede',
        headResult: 'Resultado (verificado agora)',
        headSaved: 'Salvo',
        cannotOpen: 'Não foi possível abrir: {error}',
        needFiles: 'Escolha primeiro os arquivos dos seus alunos.',
        csvHead: {
            student: 'Aluno',
            activity: 'Atividade / Rede',
            result: 'Resultado',
            detail: 'Detalhe',
            attempts: 'Tentativas de verificação',
            saved: 'Salvo',
            file: 'Arquivo'
        },
        csvResult: { invalid: 'Arquivo inválido', free: 'Rede livre', solved: 'Resolvida', notSolved: 'Não resolvida' }
    },
    tour: {
        prev: 'Anterior',
        next: 'Próximo',
        closeTitle: 'Fechar o tour',
        needDemo: 'Carregue primeiro o exemplo para ver um ping.',
        done: 'Pronto! Você pode ver o tour de novo pelo menu «Ver».',
        step: 'Passo {step} de {total}',
        finish: 'Terminar',
        steps: {
            1: {
                title: 'Bem-vindo ao NetSim Lab!',
                text: 'Aqui você vai montar redes, fazer elas se comunicarem e ver como os dados viajam. Este tour dura um minuto.'
            },
            2: {
                title: '1 · Adicione equipamentos',
                text: 'No painel da esquerda, clique em um equipamento para adicioná-lo: PC, notebook, celular, roteador, switch, servidor DNS…'
            },
            3: {
                title: '2 · Mova e configure',
                text: 'Arraste um equipamento para movê-lo e o fundo para percorrer o esquema. A roda do mouse aproxima e afasta; o botão da esquerda enquadra toda a rede. Duplo clique abre as propriedades; Supr apaga; Ctrl+Z desfaz.'
            },
            4: {
                title: '3 · Conecte com cabos',
                text: 'Escolha «Conectar Cabo» e clique em dois equipamentos. Celulares, notebooks e Smart TV também se conectam por WiFi nas propriedades.'
            },
            5: {
                title: '4 · Teste com um exemplo',
                text: 'Carregamos uma rede de exemplo para você ver tudo funcionando. Depois pode montar a sua.',
                action: 'Carregar exemplo'
            },
            6: {
                title: '5 · Simule uma comunicação',
                text: 'Escolha origem, destino e tipo (ping, web, DNS…) e pressione ▶ Iniciar. Pode pausar, parar e mudar a velocidade.',
                action: 'Mostre-me um ping'
            },
            7: {
                title: '6 · Modo avançado',
                text: 'No modo avançado você vê as camadas do pacote, o ARP, a tabela MAC do switch, DNS, DHCP, TCP e as rotas dos roteadores.'
            },
            8: {
                title: '7 · Todos ao mesmo tempo',
                text: '«Todos navegando ao mesmo tempo» faz todos os equipamentos se comunicarem simultaneamente. As falhas aparecem em vermelho (✕).'
            },
            9: {
                title: '8 · Seu nome e as atividades',
                text: 'Escreva seu nome neste botão: ele fica dentro do que você salvar. Em «Atividades» há redes com falhas para corrigir; ao terminar, salve a rede e entregue o arquivo ao seu professor.'
            }
        }
    },
    deliver: {
        freeNetwork: 'Rede livre',
        empty: 'Não há nada para entregar: monte primeiro sua rede.',
        solved: '✅ Resolvida: a rede funciona',
        notSolved: '❌ Ainda sem resolver',
        notSolvedHint: 'Você pode entregar assim mesmo, ou continuar tentando e entregar depois.',
        freeNetworkState: 'Rede livre (sem atividade)',
        student: 'Aluno:',
        activity: 'Atividade',
        work: 'Trabalho',
        status: 'Estado:',
        devices: 'Equipamentos na rede:',
        file: 'Arquivo:',
        keepWorking: 'Continuar trabalhando',
        download: 'Baixar minha entrega',
        doneTitle: '✔ Pronto! Sua entrega foi baixada.',
        doneHint: 'Procure o arquivo {file} na sua pasta de Downloads e envie ao seu professor (por e-mail, WhatsApp ou a sala de aula virtual).',
        close: 'Fechar',
        downloaded: '📤 Entrega baixada. Envie o arquivo ao seu professor.'
    },
    autosave: {
        network: '«{name}» · ',
        deviceCount: '{count} equipamentos',
        activity: ' · atividade: {title}',
        savedAt: ' · salvo {when}.',
        restored: 'Pronto: você continua de onde parou.',
        cannotRestore: 'Não foi possível recuperar: {error}'
    },
    offline: {
        downloading: 'Baixando as bibliotecas… (é preciso internet só esta vez)',
        done: 'Cópia baixada: esse arquivo funciona sem conexão. Guarde em uma pasta ou pendrive.',
        failed: 'Não foi possível montar a cópia ({error}). Tente com internet ou salve a página pelo navegador (Ctrl+S).'
    },
    demo: {
        twoNetworks: 'Exemplo carregado: duas redes (192.168.1.0/24 e 192.168.2.0/24) unidas por um roteador. Experimente um ping de PC_A1 para PC_B1 no modo avançado.',
        vpnLocal: 'Exemplo: a VPN está dentro da rede do Escritório (WireGuard). PC_Oficina1 conecta, mas PC_Casa1 não chega: falta abrir a porta UDP 51820 no Router_Oficina. Abra as propriedades do servidor VPN ou do roteador.',
        vpnCloud: 'Exemplo: Casa e Escritório têm redes diferentes, cada uma com internet. PC_Casa1 e PC_Oficina1 estão unidas pela VPN (100.64.0.x). Experimente um ping entre os IPs de VPN delas.'
    },
    export: {
        empty: 'Não há nada para exportar: adicione equipamentos primeiro.',
        pdfDone: 'Documento PDF gerado.',
        imageDone: 'Imagem {format} exportada.',
        type: {
            vpn: 'VPN',
            vpnCloud: 'VPN na nuvem',
            vpnLocal: 'VPN local',
            laptop: 'Notebook',
            netbook: 'Netbook',
            tv: 'Smart TV',
            dns: 'DNS',
            router: 'Roteador WiFi',
            lrouter: 'Roteador',
            switch: 'Switch',
            pc: 'PC',
            phone: 'Celular',
            cloud: 'Internet'
        },
        heads: {
            device: 'Equipamento',
            type: 'Tipo',
            ip: 'IP',
            mask: 'Máscara',
            gateway: 'Gateway'
        },
        exportedAt: 'Exportado em {date} · {count} equipamentos',
        continuation: 'Equipamentos (continuação)',
        page: 'Página {page} de {total}'
    },
    live: {
        stop: 'Parar o tráfego geral',
        start: 'Todos navegando ao mesmo tempo',
        stats: '🌐 Tráfego ao vivo · ✔ {ok} corretos · ✖ {fail} com falha',
        needClients: 'Adicione PCs, notebooks, celulares ou Smart TVs (e algo com quem se comunicar) para gerar tráfego.',
        hint: 'Tráfego geral: cada equipamento navega por conta própria. ✔ chega e responde, ✖ não consegue se comunicar. Pressione ■ quando quiser parar.'
    },
    dev: {
        subtitle: 'Tipo: {type}{layer} | MAC: {mac}',
        tab: {
            layer: 'Modo de Camada (L2/L3)',
            ip: 'Configuração de IP',
            ipSvi: 'Configuração de IP / SVI',
            connections: 'Conexões / Portas',
            dhcp: 'Servidor DHCP',
            dhcpWifi: 'DHCP / WiFi',
            portForwarding: 'Port Forwarding',
            wifiNetworks: 'Redes WiFi',
            routes: 'Interfaces e rotas',
            dnsRecords: 'Registros DNS',
            vpn: 'VPN',
            pingTerminal: 'Terminal Ping',
            webBrowser: 'Navegador Web'
        },
        layerTab: {
            intro: 'Escolha o modo de operação do switch:',
            l2: 'Camada 2 (switch L2)',
            l2Desc: 'Comuta quadros por MAC. Não faz roteamento.',
            l3: 'Camada 3 (L3 multicamada)',
            l3Desc: 'Suporta roteamento IP entre VLANs e serviço de servidor DHCP.'
        },
        ipTab: {
            obtain: 'Obtenção de IP:',
            static: 'Estático',
            name: 'Nome do dispositivo',
            ip: 'Endereço IP',
            mask: 'Máscara de sub-rede',
            gateway: 'Gateway',
            apply: 'Aplicar configuração de IP',
            validationHint: 'São validados IPv4, máscara, gateway e endereços duplicados.'
        },
        dhcpTab: {
            title: 'Servidor DHCP',
            start: 'IP inicial do DHCP',
            end: 'IP final do DHCP',
            apply: 'Aplicar configuração do DHCP',
            wifiTitle: 'Configuração do ponto de acesso WiFi',
            ssid: 'Nome SSID',
            password: 'Senha WPA2',
            showPassword: 'Mostrar senha',
            changeHint: 'Ao mudar o nome ou a senha, os equipamentos conectados se desconectam e precisam se conectar de novo.'
        },
        pf: {
            publicIp: 'IP público (lado Internet) deste roteador:',
            publicIpHint: 'Os equipamentos da rede saem para a Internet com este IP (NAT). De fora só se chega a um equipamento de dentro se houver uma regra de encaminhamento de portas.',
            rules: 'Regras de encaminhamento de portas (Port Forwarding):',
            defaultRuleName: 'Regra',
            noRules: 'Não há regras: da Internet não é possível entrar em nenhum equipamento desta rede.',
            addTitle: 'Adicionar regra',
            name: 'Nome',
            proto: 'Protocolo',
            extPort: 'Porta externa',
            intPort: 'Porta interna',
            redirectTo: 'Redirecionar para o equipamento',
            noDevices: '(não há equipamentos nesta rede)',
            add: 'Adicionar regra',
            vpnHint: 'Para chegar a um servidor VPN local pela Internet: UDP, a mesma porta fora e dentro (WireGuard 51820 · OpenVPN 1194 · ZeroTier 9993), apontando para o IP do servidor VPN.'
        },
        wifi: {
            networks: 'Redes WiFi ao alcance:',
            none: 'Nenhuma rede WiFi disponível foi encontrada.',
            signal: 'Sinal: Excelente | Canal 6',
            connected: 'Conectado',
            connect: 'Conectar',
            prompt: 'Senha da rede WiFi "{ssid}":'
        },
        conn: {
            list: 'Lista de conexões ativas ligadas às portas de {name}:',
            none: 'Não há cabos nem redes sem fio conectadas a este dispositivo.',
            linkType: 'Tipo de enlace: {type} | IP: {ip}',
            typeWifi: 'WiFi sem fio',
            typeEthernet: 'Cabo Ethernet',
            disconnect: 'Desconectar',
            connectNew: 'Conectar novo cabo'
        },
        dnsTab: {
            online: 'Servidor ligado (se você desligar, ninguém recebe resposta)',
            records: 'Registros (nome → IP)',
            recordsHint: 'Um registro por linha: {format}. Exemplo: {example}. Se um nome não estiver aqui, o servidor responde «não existe».',
            apply: 'Aplicar',
            invalidRecord: 'Registro inválido: «{line}». Use: www.exemplo.com 192.168.2.10',
            recordsApplied: '{name}: registros aplicados ({count}).'
        },
        routesTab: {
            toward: 'Para {name}',
            noNeighbors: 'Conecte este roteador com cabos a outros equipamentos (por exemplo, a um switch): cada cabo cria uma interface.',
            interfaces: 'Interfaces (uma por cabo)',
            interfacesHint: 'Cada interface tem seu próprio IP e pertence a uma rede diferente.',
            staticRoutes: 'Rotas estáticas',
            staticRoutesHint: 'Uma por linha: {format}. Rota padrão: {default}. As redes das suas interfaces já são conhecidas.',
            apply: 'Aplicar',
            invalidIface: 'IP ou máscara inválida na interface para {name}.',
            invalidRoute: 'Rota inválida: «{line}». Use: 10.0.0.0/24 via 192.168.2.2',
            applied: '{name}: interfaces e rotas aplicadas.'
        },
        browser: {
            go: 'Ir',
            hint: 'Digite uma URL como {example} ou o IP do roteador para navegar.',
            noIp: 'O equipamento não tem um IP válido atribuído (endereço APIPA ou sem rede).',
            emptyUrl: 'URL vazia',
            emptyUrlMsg: 'Escreva um endereço, por exemplo www.exemplo.com ou um IP.',
            dnsUnreachable: 'Não foi possível consultar o servidor DNS ({dns}): está desligado ou é inacessível.',
            dnsUnknownHost: 'O servidor DNS ({dns}) não conhece o nome «{host}».',
            pageLoaded: 'Página carregada com sucesso',
            pageLoadedCloud: 'Conexão com a Internet estabelecida através da nuvem do ISP.',
            noDnsNoInternet: 'Não há servidor DNS nem saída para a Internet acessível a partir desta rede.',
            nameNotResolved: 'Não foi possível resolver o nome.',
            timeout: 'O equipamento {ip} não responde. Verifique cabos, IP, máscara, gateway e rotas.',
            mgmtPanel: 'Painel de administração ({name})',
            connectedTo: 'Conexão estabelecida com {name} ({ip}).',
            statusOnline: 'Estado: ONLINE',
            dhcpActive: 'DHCP: ATIVO',
            dhcpInactive: 'DHCP: INATIVO',
            pageLoadedIp: 'Conexão com a Internet estabelecida ({ip}).',
            responded: '{name} ({ip}) respondeu.'
        },
        vpn: {
            statusOk: '● Conectado',
            statusOff: '○ Sem VPN',
            statusError: '✖ Sem conexão',
            serverCloud: 'Servidor VPN {cloud} (como o coordenador do Tailscale ou do ZeroTier): conecte-o ao acesso à Internet. Os equipamentos se encontram por ele; se conseguem se ver, falam direto, e se não, o tráfego passa por este servidor.',
            serverLocal: 'Servidor VPN {local} (como WireGuard ou OpenVPN): conecte-o à rede da escola ou do escritório. Todos os equipamentos se conectam a ele e o tráfego da VPN passa por ele.',
            inCloud: 'na nuvem',
            local: 'local',
            service: 'Serviço',
            network: 'Rede VPN',
            serverOn: 'Servidor ligado',
            members: 'Equipamentos nesta VPN ({count})',
            noMembers: 'Ainda não há equipamentos. Abra as propriedades de um PC, notebook ou celular e escolha esta VPN na aba «VPN».',
            clientIntro: 'Uma VPN dá a este equipamento um segundo IP, o da VPN, além do da rede local. Com ele é possível se comunicar com outros equipamentos da VPN como se estivessem na mesma rede, estejam onde estiverem.',
            connectTo: 'Conectar-se à VPN',
            noVpn: 'Sem VPN',
            noServers: 'Não há servidores VPN na rede. Adicione um pela barra lateral («VPN na nuvem» ou «Servidor VPN local») e conecte-o com um cabo.',
            localIp: 'IP da rede local:',
            vpnIp: 'IP da VPN:',
            status: 'Estado:',
            serverGone: 'o servidor VPN já não existe',
            serverOff: 'o servidor VPN está desligado',
            behindRouter: 'o servidor VPN está atrás de {router} (rede privada) e da Internet não se chega até ele: é preciso abrir a porta UDP {port} em {router} e redirecioná-la para {ip} (Port Forwarding)',
            noRouter: 'não se chega ao roteador {router} ({ip}) pela Internet: {error}',
            notConnected: '{name} não está conectado a nenhuma VPN.',
            serverGoneFor: 'O servidor VPN de {name} já não existe.',
            cannotConnect: '{name} não consegue se conectar à VPN ({vpn}): {reason}',
            otherVpn: '{name} é outra VPN, diferente da de {other}.',
            notSameVpn: '{name} não está na mesma VPN que {other}.'
        },
        msg: {
            switchLayer: 'Switch configurado na Camada {layer}',
            nameEmpty: 'O nome não pode ficar vazio.',
            dhcpRangeInvalid: 'Faixa DHCP inválida: deve estar dentro da sub-rede e não incluir o IP do gateway.',
            dhcpRangeApplied: 'Faixa DHCP aplicada.',
            portsInvalid: 'As portas têm que ser números entre 1 e 65535.',
            portTargetMissing: 'Escolha a qual equipamento da rede você quer redirecionar a porta.',
            portRuleExists: 'Já existe uma regra para {proto} {port}.',
            portRuleAdded: 'Regra adicionada: {proto} {ext} → {ip}:{port}.',
            wifiNameEmpty: 'O nome da rede não pode ficar vazio.',
            wifiNameTaken: 'Já existe outra rede WiFi com esse nome.',
            wifiPassShort: 'A senha WPA2 deve ter pelo menos 8 caracteres.',
            wifiRenamed: 'Rede WiFi renomeada para «{ssid}». Os equipamentos precisam se reconectar.',
            wifiPassUpdated: 'Senha do WiFi atualizada. Os equipamentos precisam se reconectar.',
            wifiWrongPass: 'Senha incorreta. A conexão WiFi não foi estabelecida.',
            wifiConnected: 'Conectado à rede WiFi {ssid}',
            deviceDeleted: '«{name}» excluído. Você pode desfazer com Ctrl+Z.',
            vpnTwoIps: '{name} agora tem dois IPs: {local} (local) e {vpn} (VPN).',
            vpnLeft: '{name} saiu da VPN.',
            portOpened: 'Porta UDP {port} aberta em {router} → {ip}.'
        }
    },
    modal: {
        close: 'Fechar',
        closeTitle: 'Fechar (Esc)',
        deliver: {
            title: 'Entregar meu trabalho'
        },
        about: {
            subtitle: 'Simulador de Redes Educativo · versão 35',
            license: 'Distribuído sob a Licença MIT',
            donation: 'Se você gostar do simulador, fica a seu critério uma Menção ou uma Doação para o autor.',
            cafecito: 'Me pague um Cafecito',
            kofi: 'Apoiar no Ko-fi'
        },
        restore: {
            title: 'Encontramos o seu trabalho anterior',
            hint: 'O simulador salva a sua rede automaticamente neste navegador. Para entregar ou compartilhar, use Arquivo → Salvar rede.',
            startOver: 'Começar do zero',
            continue: 'Continuar de onde parei'
        },
        student: {
            title: 'Como você se chama?',
            hint: 'Seu nome fica guardado dentro das redes e atividades que você salvar, assim seu professor sabe de quem é cada entrega.',
            placeholder: 'Ex.: Ana Souza',
            notNow: 'Agora não',
            save: 'Salvar nome'
        },
        mkact: {
            title: 'Criar atividade com esta rede',
            hint: 'Monte a rede, quebre algo de propósito (um IP, um cabo, uma rota…) e defina o que o aluno tem que conseguir. Fica salvo como um arquivo que o aluno abre com «Abrir rede».',
            labelTitle: 'Título',
            placeholderTitle: 'Ex.: O PC da Secretaria não sai para a Internet',
            labelLevel: 'Dificuldade',
            level: {
                easy: 'Fácil',
                medium: 'Médio',
                hard: 'Difícil'
            },
            labelStory: 'Enunciado (o que acontece com a rede)',
            placeholderStory: 'Ex.: Desde ontem, ninguém do laboratório consegue abrir a página da escola.',
            labelHint: 'Pista (opcional)',
            placeholderHint: 'Ex.: Verifique o gateway dos PCs.',
            goals: 'Objetivos: quem tem que conseguir se comunicar?',
            save: 'Salvar atividade'
        },
        grade: {
            title: 'Corrigir entregas',
            hint: 'Escolha um ou vários arquivos que seus alunos salvaram. O simulador verifica cada rede de novo e mostra quem resolveu. Com «Ver» você abre a rede do aluno para revisar.',
            chooseFiles: 'Escolher arquivos…',
            downloadCsv: 'Baixar resumo (Excel)'
        },
        activities: {
            title: 'Atividades: conserte a rede!',
            hint: 'Cada atividade carrega uma rede com uma falha escondida. Encontre-a, corrija e verifique.'
        },
        save: {
            title: 'Salvar rede',
            hint: 'Escolha um nome para identificar a sua rede.',
            placeholder: 'Ex.: Rede da sala',
            save: 'Salvar'
        },
        device: {
            delete: 'Excluir',
            deleteTitle: 'Excluir este equipamento da rede'
        }
    },
    log: {},     // log de tráfego (claves + variáveis)
    error: {},   // validações e alertas
};
