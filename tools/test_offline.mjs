// tools/test_offline.mjs — Fase 6: prueba la copia autocontenida sin navegador ni red.
//
// Uso: node tools/test_offline.mjs (también se ejecuta con `npm run check`).
//
// Ejecuta el código REAL de saveOfflineCopy() extraído de index.html dentro de
// un DOM mínimo; después vuelve a evaluar los <script> de la copia generada
// para comprobar que arranca en el idioma elegido y que puede regenerarse.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const html = read('index.html');

let ok = 0, fail = 0;
function check(label, condition, detail = '') {
    if (condition) { ok++; console.log(`  ok  - ${label}`); }
    else { fail++; console.log(`  FAIL - ${label}${detail ? ': ' + detail : ''}`); }
}

// --- 1. La página normal solo usa archivos locales -------------------------
const linked = [...html.matchAll(/<(?:link|script)[^>]*(?:href|src)="([^"]+)"/g)].map(m => m[1]);
check('index.html no referencia CDNs', !linked.some(u => /^(?:https?:)?\/\//.test(u)), linked.filter(u => /^(?:https?:)?\/\//.test(u)).join(', '));
check('index.html carga Tailwind, Font Awesome y tipografías locales',
    ['assets/tailwind.css', 'assets/fontawesome/css/all.min.css', 'assets/fonts/fonts.css'].every(u => linked.includes(u)));

// --- 2. Generar la copia con saveOfflineCopy() ----------------------------
const pristineStyle = (html.match(/<style id="app-style">([\s\S]*?)<\/style>/) || [, ''])[1];
const bodyTag = html.match(/<body[^>]*>/)[0];
const pristineBody = html.slice(html.indexOf(bodyTag) + bodyTag.length, html.lastIndexOf('</body>'));
const bundleWin = { I18N_DICTS: {} };
vm.runInNewContext(read('assets/offline-bundle.js'), { window: bundleWin });
for (const lang of ['es', 'en', 'pt', 'fr']) vm.runInNewContext(read(`lang/${lang}.js`), { window: bundleWin });
vm.runInNewContext(read('js/i18n.js'), {
    window: Object.assign(bundleWin, {
        navigator: { language: 'de-DE', languages: ['de-DE'] },
        localStorage: { getItem: () => 'es', setItem() { } }
    }),
    document: { readyState: 'complete', documentElement: { setAttribute() { } }, querySelectorAll: () => [], getElementById: () => null, addEventListener() { }, dispatchEvent() { }, createElement: () => ({ setAttribute() { } }) },
    console: { warn() { }, error() { } },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } }
});
bundleWin.I18N.setLang('fr');

let captured = null;
const offlineSrc = html.match(/ {8}\/\/ ===== COPIA PARA USAR SIN INTERNET \(Fase 6\) =====([\s\S]*?)\n {8}\/\/ ===== DERECHOS DE AUTOR =====/);
if (!offlineSrc) { console.error('No se encontró el bloque de saveOfflineCopy() en index.html'); process.exit(1); }
const sandbox = {
    window: bundleWin,
    document: {
        head: { appendChild(el) { el.onload(); } },
        createElement: () => ({ set src(v) { this._src = v; }, get src() { return this._src; } }),
        getElementById: id => id === 'app-style' ? { textContent: pristineStyle } : null,
        documentElement: { get className() { return ''; }, setAttribute() { } },
        body: { get innerHTML() { return pristineBody; }, className: '' },
        querySelectorAll: () => []
    },
    I18N: bundleWin.I18N,
    PRISTINE_BODY: pristineBody,
    PRISTINE_BODY_CLASS: '',
    PRISTINE_HTML_CLASS: '',
    PRISTINE_STYLE: pristineStyle,
    showToast() { },
    downloadBlob(blob, name) { captured = { blob, name }; },
    Blob: class { constructor(parts, options) { this.parts = parts; this.type = options.type; } },
    Promise, Error, JSON, Object, Date, String, RegExp
};
vm.runInNewContext(offlineSrc[1], sandbox);
await sandbox.saveOfflineCopy();

check('saveOfflineCopy() genera un archivo HTML', !!captured && captured.name.endsWith('.html'));
if (!captured) { console.error(`\nResultado: ${ok} ok, ${fail} fallidos`); process.exit(1); }
const copy = captured.blob.parts[0];
check('la copia fija el idioma elegido (fr)', copy.includes('window.I18N_INITIAL_LANG = "fr"') && copy.includes('<html lang="fr"'));
check('la copia incrusta los 4 diccionarios y el motor i18n',
    ['lang/es.js', 'lang/en.js', 'lang/pt.js', 'lang/fr.js', 'js/i18n.js'].every(n => copy.includes(`data-offline-src="${n}"`)));
check('la copia incrusta CSS y fuentes como data URI', copy.includes('<style id="offline-css">') && copy.includes('url(data:font/woff2;base64,'));
check('la copia no deja url() externas', !/url\(\s*['"]?(?:https?:)?\/\//i.test(copy) && !/url\(\s*['"]?(?!data:)[^)'"]+\)/.test(copy));
check('la copia no referencia hojas ni scripts relativos', !/<(?:link|script)[^>]*(?:href|src)="assets\//.test(copy));
check('la copia puede reconstruir OFFLINE_BUNDLE', copy.includes('window.OFFLINE_BUNDLE') && copy.includes("getElementById('offline-css')"));


// --- 3. La copia arranca en su idioma fijo, no en el del navegador ----------
// Solo se evalúan los scripts incrustados (inicial, diccionarios, motor i18n y
// restauración del bundle). El script principal de la app queda afuera: para
// ejecutarlo haría falta un navegador completo, no un DOM de prueba.
const scriptTags = [...copy.matchAll(/<script data-offline-src="[^"]+">([\s\S]*?)<\/script>/g)].map(m => m[1]);
const strip = s => s.replace(/^<script[^>]*>|<\/script>$/g, '');
const restoreTag = (copy.match(/<script>window\.OFFLINE_BUNDLE[\s\S]*?<\/script>/) || [])[0];
const initialTag = (copy.match(/<script>window\.I18N_INITIAL_LANG[\s\S]*?<\/script>/) || [])[0];
const scriptsToRun = [
    ...(initialTag ? [strip(initialTag)] : []),
    ...scriptTags,
    ...(restoreTag ? [strip(restoreTag)] : [])
];
const copyWin = { I18N_DICTS: {}, navigator: { language: 'de-DE', languages: ['de-DE'] }, localStorage: { getItem: () => 'es', setItem() { } } };
const copyState = { lang: 'fr' };
const offlineScripts = [...copy.matchAll(/<script data-offline-src="([^"]+)">([\s\S]*?)<\/script>/g)]
    .map(m => ({ getAttribute: () => m[1], textContent: m[2] }));
const copyDoc = {
    readyState: 'complete',
    documentElement: { setAttribute(k, v) { if (k === 'lang') copyState.lang = v; }, getAttribute(k) { return k === 'lang' ? copyState.lang : ''; } },
    querySelectorAll: selector => selector.includes('data-offline-src') ? offlineScripts : [],
    getElementById: id => id === 'lang-select' ? { value: '' } : id === 'offline-css' ? { textContent: '' } : null,
    createElement: () => ({ setAttribute() { } }),
    addEventListener() { }, dispatchEvent() { }
};
for (const code of scriptsToRun) {
    vm.runInNewContext(code, {
        window: copyWin, document: copyDoc, console: { warn() { }, error() { } },
        CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } }
    });
}
check('la copia arranca en fr aunque el navegador/preferencia digan otra cosa', copyWin.I18N.lang === 'fr' && copyState.lang === 'fr');
check('la copia trae los 4 idiomas y permite cambiar en vivo', Object.keys(copyWin.I18N_DICTS).sort().join(',') === 'en,es,fr,pt' && (copyWin.I18N.setLang('pt'), copyWin.I18N.t('menu.file') !== ''));
check('OFFLINE_BUNDLE se reconstruye para re-guardar la copia', !!copyWin.OFFLINE_BUNDLE && Object.keys(copyWin.OFFLINE_BUNDLE.scripts).length === 5);

console.log(`\nResultado: ${ok} ok, ${fail} fallidos`);
process.exit(fail ? 1 : 0);
