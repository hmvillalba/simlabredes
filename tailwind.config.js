/** Tailwind CSS v3.4.17 — configuración del build de producción (Fase 6).
 *
 * La versión se fija a la misma que servía el Play CDN (cdn.tailwindcss.com),
 * para que el CSS compilado sea equivalente al que se veía antes.
 *
 * `content` incluye TODO el lugar donde aparece una clase de Tailwind:
 *  - index.html: el HTML estático + el JavaScript inline (las clases que el
 *    JS genera en runtime son literales dentro del archivo, p.ej. los valores
 *    que devuelve getDeviceIconColor()).
 *  - js/** y lang/**: por si en el futuro se agregan clases desde ahí.
 */
module.exports = {
    content: [
        './index.html',
        './js/**/*.js',
        './lang/**/*.js'
    ],
    // El proyecto usa su propio modo claro con la clase `light-mode` en <body>,
    // no las variantes `dark:` de Tailwind, así que no hace falta darkMode.
    darkMode: 'class',
    corePlugins: {
        // El proyecto no usa las variantes de print.
        printVariants: false
    },
    theme: {
        extend: {}
    },
    plugins: []
};
