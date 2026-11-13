/** Tailwind CSS v3.4.17 — configuración del build de la landing (Fase 7).
 *
 * Separada de la del simulador (tailwind.config.js) a propósito: cada salida
 * lleva solo las clases que realmente usa. La plantilla es `landing/template.html`
 * y los diccionarios de la landing también se revisan por si en el futuro se
 * agregan clases desde ahí.
 */
module.exports = {
    content: [
        './landing/template.html',
        './landing/i18n/*.js'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'ui-monospace', 'monospace']
            }
        }
    },
    plugins: []
};
