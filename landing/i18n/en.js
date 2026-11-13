// landing/i18n/en.js — Landing page texts in English.
//
// The Spanish dictionary (landing/i18n/es.js) is the source of truth and the
// fallback. Every key here must exist there with the same name.
// The simulator dictionaries (lang/*.js) are separate: this site has its own.
window.LANDING_DICTS = window.LANDING_DICTS || {};
window.LANDING_DICTS.en = {
    _meta: { name: 'English', dir: 'ltr' },

    meta: {
        title: 'SimLab Redes — Network simulator for teaching and learning',
        description: 'Free interactive network simulator, no install needed. Build topologies, set IP, DHCP and VLAN, and watch ARP, DNS and HTTP traffic in the classroom.',
        ogImageAlt: 'Screenshot of the simulator with two networks joined by a router'
    },

    nav: {
        langLabel: 'Language',
        features: 'Features',
        teachers: 'For teachers',
        start: 'Get started',
        repo: 'Repository',
        simulator: 'Open simulator'
    },

    hero: {
        badge: 'Free · No install · Works offline',
        title: 'Learn networks by building networks',
        lead: 'SimLab Redes is a simulator built for class: students build topologies, configure devices and watch packets travel layer by layer, without installing anything.',
        ctaPrimary: 'Open simulator',
        ctaSecondary: 'View the code',
        note: 'Runs in the browser: it also works from a folder or a USB stick, with no server.'
    },

    features: {
        title: 'What you get',
        lead: 'Everything a networking unit needs, with no licences or accounts.',
        f1Title: 'Topologies in the browser',
        f1Text: 'WiFi and L3 routers, switches, PCs, laptops, web and DNS servers, and VPN. Cables are drawn and cut with the mouse.',
        f2Title: 'Simulated real traffic',
        f2Text: 'ARP, ICMP, DHCP, DNS, HTTP and VPN tunnels with packet animation and the detail of every OSI layer.',
        f3Title: 'Tables and consoles',
        f3Text: 'ARP, MAC, DNS and routing tables that update themselves, plus a per-device console to practise commands.',
        f4Title: 'Ready for the classroom',
        f4Text: 'Activities with faults to solve, work hand-in with the student name, and grading for the teacher.'
    },

    shots: {
        title: 'How it looks',
        lead: 'Screenshots of the real simulator, on desktop and on a phone.',
        desktopCaption: 'Two networks joined by an L3 router, with the tables and the simulation panel open.',
        mobileCaption: 'The same interface on a phone: toolbar and panels rearrange.',
        altDesktop: 'Simulator with two networks (192.168.1.0/24 and 192.168.2.0/24) joined by a router',
        altMobile: 'Simulator view on a phone with the toolbar stacked'
    },

    teachers: {
        title: 'For teachers',
        lead: 'The simulator already ships material you can teach with tomorrow.',
        p1Title: 'Activities with faults',
        p1Text: 'Scenarios with a configuration mistake so the student has to diagnose and fix it.',
        p2Title: 'Submit and grade',
        p2Text: 'Students save their network with their name and you open it from “Grade submissions”.',
        p3Title: 'Project in class',
        p3Text: 'Fullscreen mode with large text and high contrast for the projector.',
        classTitle: 'A 45-minute lesson',
        class1: 'Open an example or an activity and project it while you explain the topology.',
        class2: 'Students rebuild it on their machine and test with ping until it answers.',
        class3: 'Everyone saves the network with their name and you open it in “Grade submissions”.',
        exercisesTitle: 'Four exercises to start with',
        ex1: 'Change a PC network so it can ping the other side of the router.',
        ex2: 'Repair a DHCP server that hands out no addresses and check it with ipconfig.',
        ex3: 'Split two groups of devices into VLANs and verify they cannot see each other.',
        ex4: 'Publish a web server behind the router and reach it from the Internet.'
    },

    start: {
        title: 'Get started in a minute',
        lead: 'No sign-up, no install and no dependency on the classroom connection.',
        s1Title: 'Open the simulator',
        s1Text: 'It opens in the browser and that is it: no accounts, no downloads.',
        s2Title: 'Load an example',
        s2Text: 'The File menu has example networks so you can see the tool in action.',
        s3Title: 'Save your work',
        s3Text: 'Save as .json, export to PNG, JPG and PDF, or download an offline copy.'
    },

    repo: {
        title: 'Open source',
        lead: 'The project is MIT: use it in class, change it and share it.',
        license: 'MIT licence',
        contribute: 'How to contribute',
        issues: 'Report a bug',
        support: 'Support the project',
        star: 'Star it on GitHub'
    },

    footer: {
        madeBy: 'Made by Hugo Martín Villalba',
        rights: '© {year} Hugo Martín Villalba · MIT licence',
        otherLanguages: 'Other languages'
    }
};
