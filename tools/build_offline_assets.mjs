// tools/build_offline_assets.mjs — Fase 6: arma el paquete de la "copia sin internet".
//
// Uso: node tools/build_offline_assets.mjs
//
// Genera assets/offline-bundle.js, que contiene TODO lo que necesita el archivo
// autocontenido que produce el botón "Guardar copia para usar sin internet":
//
//   - css:    Tailwind compilado + Font Awesome + tipografías, con las fuentes
//             incrustadas como data URI (así el archivo final no depende de nadie).
//   - scripts: los diccionarios (es/en/pt/fr) y el motor i18n, para que la copia
//             tenga los cuatro idiomas y no solo el texto ya renderizado.
//
// El bundle se carga bajo demanda (solo cuando el usuario pide la copia), así
// que no pesa en la carga normal de la página.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const A = (...p) => path.join(ROOT, 'assets', ...p);

function dataUri(file, mime) {
    return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

// --- 1. Tipografías: las locales, con las fuentes incrustadas como data URI ---
function fontsCss() {
    const src = fs.readFileSync(A('fonts', 'fonts.css'), 'utf8');
    const blocks = [...src.matchAll(/@font-face\s*\{[^}]*\}/g)].map(m => m[0]);
    if (!blocks.length) throw new Error('No se encontraron @font-face en assets/fonts/fonts.css');
    return blocks.map(b => {
        const m = b.match(/url\('\.\/([^']+\.woff2)'\)/);
        if (!m) throw new Error(`Un @font-face no apunta a un archivo local: ${b.slice(0, 80)}`);
        return b.replace(/url\('\.\/[^']+'\)/, `url('${dataUri(A('fonts', m[1]), 'font/woff2')}')`);
    }).join('\n');
}

// --- 2. Font Awesome: fuentes incrustadas ---
// El archivo de FA declara 10 @font-face: los de "Font Awesome 6 Free/Brands"
// (los que usan las clases .fa-solid/.fa-regular/.fa-brands) y 7 más de
// compatibilidad con las versiones 4 y 5 ("Font Awesome 5 *", "FontAwesome").
// Nada del CSS los referencia (las clases .fas/.fab/.far apuntan a las familias
// 6), así que incrustarlos triplicaba cada .woff2 dentro del bundle. Se quitan.
const FA_FAMILIES = ['"Font Awesome 6 Free"', '"Font Awesome 6 Brands"'];
function fontAwesomeCss() {
    let css = fs.readFileSync(A('fontawesome', 'css', 'all.min.css'), 'utf8');
    const faces = css.match(/@font-face\{[^}]*\}/g) || [];
    css = css.replace(/@font-face\{[^}]*\}/g, block => {
        const m = block.match(/font-family:("[^"]+"|FontAwesome)/);
        return m && FA_FAMILIES.includes(m[1]) ? block : '';
    });
    css = css.replace(/,\s*url\([^)]*\.ttf[^)]*\)\s*format\(["']truetype["']\)/g, '');
    css = css.replace(/url\(\.\.\/webfonts\/([^)]+)\)/g, (m, file) => {
        // Solo se distribuyen los .woff2: si aparece otro formato, se deja la
        // ruta como estaba (así el error se ve en la consola, no se oculta).
        if (!file.endsWith('.woff2')) return m;
        return `url(${dataUri(A('fontawesome', 'webfonts', file), 'font/woff2')})`;
    });
    console.log(`Font Awesome: ${faces.length} @font-face en origen, ${(css.match(/@font-face/g) || []).length} incrustados (se omiten los de compatibilidad v4/v5).`);
    return css;
}

// --- Comprobación final: el paquete no debe apuntar a ningún servidor ---
function assertNoExternalRefs(css) {
    // Ojo: el base64 puede contener "//" (p. ej. "...//..."), así que solo se
    // buscan direcciones explícitas (http/https o // al inicio de la url).
    const bad = [...css.matchAll(/url\(\s*['"]?(?:https?:)?\/\/[^)]*/gi)].map(m => m[0].slice(0, 80));
    if (bad.length) throw new Error('El paquete offline todavía referencia recursos externos:\n  ' + bad.join('\n  '));
    const leftovers = [...css.matchAll(/url\(\s*['"]?(?!data:)([^)'"]+)/g)].map(m => m[1]);
    if (leftovers.length) throw new Error('Quedan url() sin incrustar en el paquete offline:\n  ' + leftovers.slice(0, 10).join('\n  '));
}

async function main() {
    const tailwind = fs.readFileSync(A('tailwind.css'), 'utf8');
    const fa = fontAwesomeCss();
    const fonts = fontsCss();

    const css = [
        '/* --- Tailwind CSS compilado --- */',
        tailwind,
        '/* --- Font Awesome --- */',
        fa,
        '/* --- Tipografías --- */',
        fonts
    ].join('\n');

    assertNoExternalRefs(css);

    const scripts = {};
    for (const f of ['es', 'en', 'pt', 'fr']) scripts[`lang/${f}.js`] = fs.readFileSync(path.join(ROOT, 'lang', `${f}.js`), 'utf8');
    scripts['js/i18n.js'] = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');

    const bundle = { version: 1, css, scripts };
    const out = '/* assets/offline-bundle.js — generado por tools/build_offline_assets.mjs. NO editar a mano. */\n'
        + 'window.OFFLINE_BUNDLE = ' + JSON.stringify(bundle) + ';\n';
    fs.writeFileSync(A('offline-bundle.js'), out, 'utf8');

    console.log(`Bundle offline: ${(out.length / 1024).toFixed(1)} KB (css ${(css.length / 1024).toFixed(1)} KB + ${Object.keys(scripts).length} scripts)`);
    console.log('Comprobado: sin CDNs ni url() sin incrustar.');
    console.log('Archivo: assets/offline-bundle.js');
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
