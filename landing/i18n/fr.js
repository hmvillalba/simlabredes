// landing/i18n/fr.js — Textes de la page d'accueil en français.
//
// Le dictionnaire espagnol (landing/i18n/es.js) est la source de vérité et le repli.
// Toute clé d'ici doit exister là-bas avec le même nom.
window.LANDING_DICTS = window.LANDING_DICTS || {};
window.LANDING_DICTS.fr = {
    _meta: { name: 'Français', dir: 'ltr' },

    meta: {
        title: 'SimLab Redes — Simulateur de réseaux pour enseigner et apprendre',
        description: 'Simulateur de réseaux interactif, gratuit et sans installation. Créez des topologies, configurez IP, DHCP et VLAN, et suivez le trafic ARP, DNS et HTTP en classe.',
        ogImageAlt: 'Capture du simulateur avec deux réseaux reliés par un routeur'
    },

    nav: {
        langLabel: 'Langue',
        features: 'Contenu',
        teachers: 'Pour les enseignants',
        start: 'Commencer',
        repo: 'Dépôt',
        simulator: 'Ouvrir le simulateur'
    },

    hero: {
        badge: 'Gratuit · Sans installation · Fonctionne hors ligne',
        title: 'Apprendre les réseaux en créant des réseaux',
        lead: 'SimLab Redes est un simulateur pensé pour la classe : les élèves créent des topologies, configurent les appareils et regardent les paquets voyager couche par couche, sans rien installer.',
        ctaPrimary: 'Ouvrir le simulateur',
        ctaSecondary: 'Voir le code',
        note: 'Il tourne dans le navigateur : il fonctionne aussi depuis un dossier ou une clé USB, sans serveur.'
    },

    features: {
        title: 'Ce qu’il contient',
        lead: 'Tout ce qu’il faut pour une séquence sur les réseaux, sans licence ni compte.',
        f1Title: 'Topologies dans le navigateur',
        f1Text: 'Routeurs WiFi et L3, commutateurs, PC, portables, serveurs Web et DNS, et VPN. Les câbles se posent et se coupent à la souris.',
        f2Title: 'Trafic réel simulé',
        f2Text: 'ARP, ICMP, DHCP, DNS, HTTP et tunnels VPN avec animation des paquets et le détail de chaque couche OSI.',
        f3Title: 'Tables et consoles',
        f3Text: 'Tables ARP, MAC, DNS et de routage qui se mettent à jour seules, et une console par appareil pour pratiquer les commandes.',
        f4Title: 'Prêt pour la classe',
        f4Text: 'Activités avec pannes à résoudre, rendu du travail avec le nom de l’élève et correction pour l’enseignant.'
    },

    shots: {
        title: 'À quoi ça ressemble',
        lead: 'Captures du simulateur réel, sur ordinateur et sur téléphone.',
        desktopCaption: 'Deux réseaux reliés par un routeur L3, avec les tables et le panneau de simulation ouverts.',
        mobileCaption: 'La même interface sur téléphone : la barre et les panneaux se réorganisent.',
        altDesktop: 'Simulateur avec deux réseaux (192.168.1.0/24 et 192.168.2.0/24) reliés par un routeur',
        altMobile: 'Vue du simulateur sur téléphone avec la barre d’outils empilée'
    },

    teachers: {
        title: 'Pour les enseignants',
        lead: 'Le simulateur contient déjà de quoi faire cours dès demain.',
        p1Title: 'Activités avec pannes',
        p1Text: 'Des scénarios avec une erreur de configuration que l’élève doit diagnostiquer et corriger.',
        p2Title: 'Rendu et correction',
        p2Text: 'L’élève enregistre son réseau avec son nom et vous l’ouvrez depuis « Corriger les rendus ».',
        p3Title: 'Projeter en classe',
        p3Text: 'Mode plein écran avec grands textes et fort contraste pour le vidéoprojecteur.',
        classTitle: 'Une séance de 45 minutes',
        class1: 'Ouvrez un exemple ou une activité et projetez-le pendant que vous expliquez la topologie.',
        class2: 'Les élèves la reconstruisent sur leur poste et testent au ping jusqu’à ce qu’elle réponde.',
        class3: 'Chacun enregistre le réseau avec son nom et vous l’ouvrez dans « Corriger les rendus ».',
        exercisesTitle: 'Quatre exercices pour commencer',
        ex1: 'Changer le réseau d’un PC pour qu’il fasse un ping de l’autre côté du routeur.',
        ex2: 'Réparer un serveur DHCP qui ne distribue pas d’adresses et vérifier avec ipconfig.',
        ex3: 'Séparer deux groupes d’appareils en VLAN et vérifier qu’ils ne se voient pas.',
        ex4: 'Publier un serveur web derrière le routeur et l’atteindre depuis Internet.'
    },

    start: {
        title: 'Commencer en une minute',
        lead: 'Sans inscription, sans installation et sans dépendre de la connexion de la salle.',
        s1Title: 'Ouvrez le simulateur',
        s1Text: 'Il s’ouvre dans le navigateur, c’est tout : ni compte ni téléchargement.',
        s2Title: 'Chargez un exemple',
        s2Text: 'Le menu Fichier propose des réseaux d’exemple pour voir l’outil en action.',
        s3Title: 'Enregistrez votre travail',
        s3Text: 'Enregistrement en .json, export en PNG, JPG et PDF, et copie à utiliser hors ligne.'
    },

    repo: {
        title: 'Code ouvert',
        lead: 'Le projet est sous MIT : utilisez-le en classe, modifiez-le et partagez-le.',
        license: 'Licence MIT',
        contribute: 'Comment contribuer',
        issues: 'Signaler un bug',
        support: 'Soutenir le projet',
        star: 'Mettre une étoile sur GitHub'
    },

    footer: {
        madeBy: 'Réalisé par Hugo Martín Villalba',
        rights: '© {year} Hugo Martín Villalba · Licence MIT',
        otherLanguages: 'Autres langues'
    }
};
