// tools/test_landing.mjs — Fase 7: valida la landing generada.
//
// Uso: node tools/test_landing.mjs (también corre con `npm run check`)
//
// Comprueba, sin navegador ni red:
//   - que las páginas de los 4 idiomas existan y sean HTML completo;
//   - que los diccionarios de landing/i18n tengan exactamente las mismas claves;
//   - que no quede ningún token {{...}} sin resolver;
//   - hreflang completo (4 idiomas + x-default) y canónica por idioma;
//   - metadatos OG/Twitter con imagen y locale;
//   - que no haya recursos de CDNs (todo local, como el simulador);
//   - que las imágenes y el CSS referenciados existan en disco;
//   - que el enlace al simulador apunte a un index.html que exista;
//   - que sitemap.xml y robots.txt sean coherentes con las páginas.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const L = (...p) => path.join(ROOT, 'landing', ...p);
const LANGS = ['es', 'en', 'pt', 'fr'];
const SITE = (process.env.SITE_URL || 'https://simlabredes.vercel.app').replace(/\/+$/, '');

let ok = 0, fail = 0;
function check(label, condition, detail = '') {
    if (condition) { ok++; console.log(`  ok  - ${label}`); }
    else { fail++; console.log(`  FAIL - ${label}${detail ? ': ' + detail : ''}`); }
}

// --- 1. Diccionarios de la landing ---------------------------------------
const dicts = {};
for (const lang of LANGS) {
    const file = L('i18n', lang + '.js');
    check(`landing/i18n/${lang}.js existe`, fs.existsSync(file));
    if (!fs.existsSync(file)) continue;
    const win = {};
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), { window: win }, { filename: file });
    dicts[lang] = (win.LANDING_DICTS || {})[lang];
    check(`landing/i18n/${lang}.js define LANDING_DICTS.${lang}`, !!dicts[lang]);
}

const flat = (obj, prefix = '', out = {}) => {
    for (const [k, v] of Object.entries(obj || {})) {
        const key = prefix ? prefix + '.' + k : k;
        if (typeof v === 'string') out[key] = v;
        else if (v && typeof v === 'object' && !Array.isArray(v)) flat(v, key, out);
    }
    return out;
};

const esFlat = flat(dicts.es);
const esKeys = new Set(Object.keys(esFlat));
for (const lang of LANGS) {
    if (lang === 'es') continue;
    const keys = new Set(Object.keys(flat(dicts[lang])));
    const missing = [...esKeys].filter(k => !keys.has(k) && !k.startsWith('_meta.'));
    const extra = [...keys].filter(k => !esKeys.has(k) && !k.startsWith('_meta.'));
    check(`[${lang}] mismas claves que es`, !missing.length && !extra.length,
        (missing.length ? `faltan ${missing.length}: ${missing.slice(0, 4).join(', ')} ` : '') +
        (extra.length ? `sobran ${extra.length}: ${extra.slice(0, 4).join(', ')}` : ''));
}

// Los textos no deben quedar sin traducir (copia literal del español). Se
// excluyen los que son iguales por naturaleza y se listan las coincidencias
// legítimas (misma palabra en los dos idiomas) para que el chequeo siga siendo
// estricto con el resto.
const SAME_ALLOWED = {
    pt: ['nav.simulator', 'hero.ctaPrimary']   // "Abrir simulador" se escribe igual
};
for (const lang of LANGS) {
    if (lang === 'es') continue;
    const allowed = new Set(SAME_ALLOWED[lang] || []);
    const other = flat(dicts[lang]);
    const same = Object.keys(esFlat).filter(k =>
        !k.startsWith('_meta.') && !allowed.has(k) &&
        esFlat[k].length > 12 && esFlat[k] === other[k]);
    check(`[${lang}] no hay textos sin traducir`, !same.length, same.slice(0, 3).join(' | '));
}

// --- 2. Páginas generadas ------------------------------------------------
const pages = {};
for (const lang of LANGS) {
    const file = path.join(ROOT, lang, 'index.html');
    const exists = fs.existsSync(file);
    check(`${lang}/index.html existe`, exists);
    if (!exists) continue;
    const html = fs.readFileSync(file, 'utf8');
    pages[lang] = html;

    check(`[${lang}] es un documento HTML completo`,
        html.startsWith('<!DOCTYPE html>') && html.includes('</html>'));
    check(`[${lang}] <html lang> y dir correctos`,
        html.includes(`<html lang="${lang}" dir="ltr"`), (html.match(/<html[^>]*>/) || [''])[0]);
    check(`[${lang}] no quedan tokens sin resolver`,
        !/\{\{[\w.]+\}\}/.test(html), (html.match(/\{\{[\w.]+\}\}/g) || []).slice(0, 3).join(', '));

    // hreflang y canónica
    for (const other of LANGS) {
        check(`[${lang}] hreflang ${other}`, html.includes(`hreflang="${other}" href="${SITE}/${other}/"`));
    }
    check(`[${lang}] hreflang x-default`, html.includes('hreflang="x-default"'));
    check(`[${lang}] canónica propia`, html.includes(`<link rel="canonical" href="${SITE}/${lang}/">`));

    // metadatos sociales
    check(`[${lang}] Open Graph completo`,
        ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:locale']
            .every(p => html.includes(`property="${p}"`)));
    check(`[${lang}] Twitter Card`,
        ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']
            .every(n => html.includes(`name="${n}"`)));
    check(`[${lang}] tiene <title> y description no vacíos`,
        /<title>[^<]{10,}<\/title>/.test(html) && /name="description" content="[^"]{20,}"/.test(html));

    // navegación entre idiomas
    check(`[${lang}] enlaces a los otros idiomas`, LANGS.filter(l => l !== lang)
        .every(l => html.includes(`href="../${l}/"`)));

    // Sin CDNs: los únicos recursos que se pueden cargar son locales. Las URLs
    // absolutas de canonical/hreflang/og:* son datos, no recursos, así que solo
    // se revisan <link rel="stylesheet">, <script src> e <img src>.
    const external = [...html.matchAll(/<(?:link|script|img)\b([^>]*)>/g)]
        .filter(m => {
            const attrs = m[1];
            if (/rel="(?:canonical|alternate|icon)"/.test(attrs)) return false;
            return /(?:href|src)="(?:https?:)?\/\//.test(attrs);
        })
        .map(m => m[0].slice(0, 90));
    check(`[${lang}] sin recursos externos (CSS, JS, imágenes locales)`, !external.length,
        external.slice(0, 3).join(' | '));

    // recursos locales referenciados y presentes en disco
    for (const asset of ['assets/landing.css', 'assets/fontawesome/css/all.min.css', 'assets/fonts/fonts.css']) {
        check(`[${lang}] referencia y existe ${asset}`,
            html.includes(`../${asset}`) && fs.existsSync(path.join(ROOT, asset)));
    }
    for (const img of ['simulator-desktop.png', 'simulator-mobile.png', 'og.png']) {
        check(`[${lang}] imagen ${img} referenciada y en disco`,
            (img === 'og.png' ? html.includes('/assets/landing/og.png') : html.includes(`../assets/landing/${img}`))
            && fs.existsSync(path.join(ROOT, 'assets', 'landing', img)));
    }

    // enlaces al simulador y a la licencia (la raíz del sitio es el simulador)
    check(`[${lang}] enlaza al simulador con ../index.html`,
        html.includes('href="../index.html"') && fs.existsSync(path.join(ROOT, 'index.html')));
    check(`[${lang}] enlaza a la licencia`,
        html.includes('href="../LICENSE"') && fs.existsSync(path.join(ROOT, 'LICENSE')));

    // accesibilidad mínima
    check(`[${lang}] todas las imágenes tienen alt`, !/<img(?![^>]*\balt=)[^>]*>/.test(html));
    check(`[${lang}] enlaces externos con rel de seguridad`,
        !/<a[^>]+target="_blank"(?![^>]*rel="noopener)/.test(html));
    check(`[${lang}] exactamente un <h1>`, (html.match(/<h1[\s>]/g) || []).length === 1);
}


// --- 3. Redirección por idioma en la raíz -------------------------------
// La raíz es el simulador (/index.html). Para que una URL corta como /es/
// redirija al idioma del visitante no hace falta servidor: la página en español
// ofrece el cambio de idioma y el sitio declara hreflang + x-default.
check('la raíz del sitio sigue siendo el simulador', fs.existsSync(path.join(ROOT, 'index.html')));
check('/es/ es el x-default de hreflang',
    LANGS.every(l => (pages[l] || '').includes('hreflang="x-default" href="' + SITE + '/es/"')));

// --- 4. sitemap.xml y robots.txt ----------------------------------------
const sitemap = path.join(ROOT, 'sitemap.xml');
check('sitemap.xml existe', fs.existsSync(sitemap));
if (fs.existsSync(sitemap)) {
    const xml = fs.readFileSync(sitemap, 'utf8');
    check('sitemap declara los 4 idiomas', LANGS.every(l => xml.includes(`<loc>${SITE}/${l}/</loc>`)));
    check('sitemap incluye la raíz (simulador)', xml.includes(`<loc>${SITE}/</loc>`));
    check('sitemap con anotaciones hreflang', LANGS.every(l => xml.includes(`hreflang="${l}"`)));
    check('sitemap es XML bien formado (declaración y urlset)',
        xml.startsWith('<?xml') && xml.includes('</urlset>'));
}
const robots = path.join(ROOT, 'robots.txt');
check('robots.txt existe', fs.existsSync(robots));
if (fs.existsSync(robots)) {
    check('robots.txt apunta al sitemap',
        fs.readFileSync(robots, 'utf8').includes(`Sitemap: ${SITE}/sitemap.xml`));
}

// --- 5. El CSS de la landing está compilado ------------------------------
const css = path.join(ROOT, 'assets', 'landing.css');
check('assets/landing.css existe (npm run build:landing)', fs.existsSync(css));
if (fs.existsSync(css)) {
    const src = fs.readFileSync(css, 'utf8');
    check('assets/landing.css es liviano (menos de 200 KB)', src.length < 200 * 1024,
        `${(src.length / 1024).toFixed(1)} KB`);
    for (const cls of ['rounded-2xl', 'bg-emerald-500', 'grid-cols-3']) {
        check(`assets/landing.css incluye .${cls}`, src.includes(cls));
    }
    check('assets/landing.css no incluye clases exclusivas del simulador',
        !src.includes('.cable-active') && !src.includes('#network-svg'));
}

// --- 6. La plantilla no se sirve por accidente ---------------------------
check('landing/template.html queda fuera de las URLs publicadas',
    !pages.es || !pages.es.includes('plantilla de la landing'));

console.log(`\nResultado: ${ok} ok, ${fail} fallidos`);
process.exit(fail ? 1 : 0);

