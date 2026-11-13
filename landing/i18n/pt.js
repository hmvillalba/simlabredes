// landing/i18n/pt.js — Textos da landing em português.
//
// O dicionário em espanhol (landing/i18n/es.js) é a fonte de verdade e o fallback.
// Toda chave aqui precisa existir lá com o mesmo nome.
window.LANDING_DICTS = window.LANDING_DICTS || {};
window.LANDING_DICTS.pt = {
    _meta: { name: 'Português', dir: 'ltr' },

    meta: {
        title: 'SimLab Redes — Simulador de redes para ensinar e aprender',
        description: 'Simulador de redes interativo, gratuito e sem instalação. Monte topologias, configure IP, DHCP e VLAN e veja o tráfego ARP, DNS e HTTP na sala de aula.',
        ogImageAlt: 'Captura do simulador com duas redes ligadas por um roteador'
    },

    nav: {
        langLabel: 'Idioma',
        features: 'O que inclui',
        teachers: 'Para professores',
        start: 'Começar',
        support: 'Apoiar',
        repo: 'Repositório',
        simulator: 'Abrir simulador'
    },

    hero: {
        badge: 'Grátis · Sem instalar · Funciona sem internet',
        title: 'Aprender redes montando redes',
        lead: 'SimLab Redes é um simulador pensado para a aula: os estudantes montam topologias, configuram equipamentos e veem os pacotes viajar camada por camada, sem instalar nada.',
        ctaPrimary: 'Abrir simulador',
        ctaSecondary: 'Ver o código',
        note: 'Roda no navegador: também funciona abrindo o arquivo de uma pasta ou pendrive, sem servidor.'
    },

    features: {
        title: 'O que inclui',
        lead: 'Tudo o que uma unidade de redes precisa, sem licenças nem contas.',
        f1Title: 'Topologias no navegador',
        f1Text: 'Roteadores WiFi e L3, switches, PCs, notebooks, servidores Web e DNS, e VPN. Os cabos são ligados e cortados com o mouse.',
        f2Title: 'Tráfego real simulado',
        f2Text: 'ARP, ICMP, DHCP, DNS, HTTP e túneis VPN com animação dos pacotes e o detalhe de cada camada OSI.',
        f3Title: 'Tabelas e consoles',
        f3Text: 'Tabelas ARP, MAC, DNS e de roteamento que se atualizam sozinhas, e console por equipamento para praticar comandos.',
        f4Title: 'Pronto para a sala',
        f4Text: 'Atividades com falhas para resolver, entrega do trabalho com o nome do aluno e correção para o professor.'
    },

    shots: {
        title: 'Como fica',
        lead: 'Capturas do simulador real, no computador e no celular.',
        desktopCaption: 'Duas redes ligadas por um roteador L3, com as tabelas e o painel de simulação abertos.',
        mobileCaption: 'A mesma interface no celular: a barra e os painéis se reorganizam.',
        altDesktop: 'Simulador com duas redes (192.168.1.0/24 e 192.168.2.0/24) ligadas por um roteador',
        altMobile: 'Vista do simulador no celular com a barra de ferramentas empilhada'
    },

    teachers: {
        title: 'Para professores',
        lead: 'O simulador já traz material para dar aula amanhã mesmo.',
        p1Title: 'Atividades com falhas',
        p1Text: 'Cenários montados com um erro de configuração para o aluno diagnosticar e corrigir.',
        p2Title: 'Entrega e correção',
        p2Text: 'O aluno salva a rede com o nome dele e você abre em «Corrigir entregas».',
        p3Title: 'Projetar na aula',
        p3Text: 'Modo tela cheia com textos grandes e alto contraste para projetar.',
        classTitle: 'Uma aula de 45 minutos',
        class1: 'Abra um exemplo ou uma atividade e projete enquanto explica a topologia.',
        class2: 'Os alunos a reconstroem no computador e testam com ping até responder.',
        class3: 'Cada um salva a rede com o nome e você abre em «Corrigir entregas».',
        exercisesTitle: 'Quatro exercícios para começar',
        ex1: 'Trocar a rede de um PC para que ele faça ping do outro lado do roteador.',
        ex2: 'Consertar um DHCP que não entrega endereços e conferir com ipconfig.',
        ex3: 'Separar dois grupos de equipamentos em VLANs e verificar que não se vejam.',
        ex4: 'Publicar um servidor web atrás do roteador e alcançá-lo a partir da Internet.'
    },

    start: {
        title: 'Começar em um minuto',
        lead: 'Sem cadastro, sem instalação e sem depender da conexão da escola.',
        s1Title: 'Abra o simulador',
        s1Text: 'Abre no navegador e pronto: sem contas nem downloads.',
        s2Title: 'Escolha um exemplo',
        s2Text: 'No menu Arquivo há redes de exemplo para ver a ferramenta em ação.',
        s3Title: 'Salve seu trabalho',
        s3Text: 'Salva em .json, exporta para PNG, JPG e PDF, e também como cópia para usar sem internet.'
    },

    repo: {
        title: 'Código aberto',
        lead: 'O projeto é MIT: use na aula, modifique e compartilhe.',
        license: 'Licença MIT',
        contribute: 'Como colaborar',
        issues: 'Relatar um erro',
        support: 'Apoiar o projeto',
        star: 'Dar uma estrela no GitHub'
    },

    support: {
        title: 'Apoiar o projeto',
        lead: 'O simulador é gratuito e sem publicidade. Se ele ajuda nas suas aulas, estas são as formas de retribuir.',
        mentionTitle: 'Mencione o projeto',
        mentionText: 'Conte a colegas e estudantes de onde você tirou, ou compartilhe o link no seu material de aula.',
        starTitle: 'Deixe uma estrela',
        starText: 'Uma estrela no GitHub ajuda outros professores a encontrá-lo.',
        donateTitle: 'Doação (opcional)',
        donateText: 'Se você gostar do simulador, fica a seu critério uma Menção ou uma Doação para o autor.',
        cafecito: 'Me pague um Cafecito',
        kofi: 'Apoiar no Ko-fi',
        donateNote: 'Cafecito: Argentina e Mercado Pago · Ko-fi: internacional.'
    },

    rights: {
        title: 'Licença e direitos',
        license: 'Distribuído sob a Licença MIT',
        donation: 'Se você gostar do simulador, fica a seu critério uma Menção ou uma Doação para o autor.',
        mit: 'O código pode ser usado, copiado, modificado e redistribuído, inclusive em aula, mantendo o aviso de copyright. É fornecido como está, sem garantias.',
        read: 'Ler a licença completa'
    },

    footer: {
        madeBy: 'Feito por Hugo Martín Villalba',
        rights: '© {year} Hugo Martín Villalba · Licença MIT',
        otherLanguages: 'Outros idiomas'
    }
};
