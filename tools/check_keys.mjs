// tools/check_keys.mjs — Control de claves i18n (adelanto de la Fase 5).
//
// Uso: node tools/check_keys.mjs [idioma]
//   - Comprueba que toda clave usada en index.html (data-i18n*, I18N.t('...'),
//     I18N.log('...')) exista en lang/<idioma>.js (por defecto es).
//   - Avisa si el texto "fallback" escrito en el HTML difiere del diccionario
//     (eso indicaría que el HTML y lang/ dejaron de ser la misma fuente).
//   - Con --all compara las claves de todos los idiomas contra es.
//
// Exit code 1 si hay claves faltantes o textos divergentes.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const checkAll = args.includes('--all');
const lang = args.find(a => !a.startsWith('--')) || 'es';

function loadDict(code) {
    global.window = global.window || {};
    global.window.I18N_DICTS = global.window.I18N_DICTS || {};
    // lang/*.js asignan window.I18N_DICTS[lang] = {...}
    const fn = new Function('window', code);
    fn(global.window);
    return global.window.I18N_DICTS;
}

function flat(obj, prefix, out) {
    out = out || {};
    for (const k of Object.keys(obj)) {
        const v = obj[k];
        const key = prefix ? prefix + '.' + k : k;
        if (typeof v === 'string') out[key] = v;
        else if (v && typeof v === 'object' && !Array.isArray(v)) flat(v, key, out);
    }
    return out;
}

// El motor t() solo resuelve strings: si una "hoja" del diccionario es un array
// o un objeto, I18N.t() devolvería la clave y avisaría por consola.
function nonStringLeaves(obj, prefix, out) {
    out = out || [];
    for (const k of Object.keys(obj)) {
        const v = obj[k];
        const key = prefix ? prefix + '.' + k : k;
        if (Array.isArray(v)) out.push(key);
        else if (v && typeof v === 'object') nonStringLeaves(v, key, out);
    }
    return out;
}

// Zonas de primer nivel del diccionario (para detectar duplicados: la última pisa).
function topLevelZones(code) {
    const re = /^\s{4}([A-Za-z_][A-Za-z0-9_]*):/gm;
    const out = [];
    let m;
    while ((m = re.exec(code))) out.push(m[1]);
    return out;
}

const dicts = {};
const dictIssues = [];
for (const f of fs.readdirSync(path.join(root, 'lang'))) {
    if (f.endsWith('.js')) {
        const code = fs.readFileSync(path.join(root, 'lang', f), 'utf8');
        const d = loadDict(code);
        for (const l of Object.keys(d)) dicts[l] = flat(d[l]);
        // hojas no-string
        for (const l of Object.keys(d)) {
            for (const key of nonStringLeaves(d[l])) dictIssues.push(`lang/${f}: '${key}' no es un texto (array u objeto): I18N.t() no la puede resolver`);
        }
        // zonas duplicadas
        const seen = new Set();
        for (const z of topLevelZones(code)) {
            if (seen.has(z)) dictIssues.push(`lang/${f}: la zona '${z}' está definida dos veces (la segunda pisa a la primera)`);
            seen.add(z);
        }
    }
}
const esKeys = new Set(Object.keys(dicts.es || {}));
if (!esKeys.size) { console.error('FAIL: no se cargó lang/es.js'); process.exit(1); }

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1) claves usadas en atributos data-i18n*
const used = new Map(); // clave -> {attr, htmlText}
const attrRe = /data-i18n(?:-title|-placeholder|-aria-label)?="([^"]+)"/g;
let m;
while ((m = attrRe.exec(html))) used.set(m[1], { attr: m[0].slice(0, 20), line: html.slice(0, m.index).split('\n').length });

// 2) claves usadas en JS inline: I18N.t('x' / I18N.log('x' / t('x'
const jsRe = /(?:I18N\.t|I18N\.log|\bt)\(\s*'([a-zA-Z0-9_.]+)'/g;
while ((m = jsRe.exec(html))) if (!used.has(m[1])) used.set(m[1], { attr: 'js-inline', line: html.slice(0, m.index).split('\n').length });

let errors = 0;

if (dictIssues.length) {
    errors++;
    console.log('PROBLEMAS DEL DICCIONARIO:');
    dictIssues.forEach(i => console.log('  *', i));
} else {
    console.log('OK: el diccionario solo contiene textos y no repite zonas');
}

if (checkAll) {
    for (const [l, keys] of Object.entries(dicts)) {
        if (l === 'es') continue;
        const set = new Set(Object.keys(keys));
        const missing = [...esKeys].filter(k => !set.has(k));
        const extra = [...set].filter(k => !esKeys.has(k));
        if (missing.length) { errors++; console.log(`[${l}] faltan ${missing.length} claves vs es: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`); }
        if (extra.length) { errors++; console.log(`[${l}] sobran ${extra.length} claves vs es: ${extra.slice(0, 10).join(', ')}${extra.length > 10 ? '…' : ''}`); }
        if (!missing.length && !extra.length) console.log(`[${l}] OK (${set.size} claves, igual que es)`);
    }
} else {
    const keys = new Set(Object.keys(dicts[lang] || {}));
    // Clave que termina en '.' = prefijo dinámico (I18N.t('prefijo.' + var)):
    // vale si existe al menos una clave con ese prefijo en el diccionario.
    const missing = [...used.keys()].filter(k => {
        if (keys.has(k)) return false;
        if (k.endsWith('.')) return ![...keys].some(x => x.startsWith(k));
        return true;
    });
    if (missing.length) { errors++; console.log(`FALTAN en lang/${lang}.js (usadas en index.html):`); for (const k of missing) console.log('  -', k, '(línea ~' + used.get(k).line + ')'); }
    else console.log(`OK: las ${used.size} claves usadas en index.html existen en lang/${lang}.js`);

    // 3) divergencia entre el texto fallback del HTML y el diccionario (solo data-i18n de texto)
    const esFlat = dicts.es;
    const textRe = /data-i18n="([^"]+)">([^<]*)<\/(?:span|div|p|h1|h2|h3|button|title)>/g;
    let mm, diverge = [];
    while ((mm = textRe.exec(html))) {
        const key = mm[1];
        const htmlText = (mm[2] || '').replace(/\s+/g, ' ').trim();
        const dictText = (esFlat[key] || '').replace(/\s+/g, ' ').trim();
        if (dictText && htmlText && dictText !== htmlText) diverge.push(`${key}\n    HTML: ${htmlText}\n    es.js: ${dictText}`);
    }
    if (diverge.length) { errors++; console.log(`DIVERGENCIAS texto HTML vs lang/es.js (${diverge.length}):`); diverge.forEach(d => console.log('  *', d)); }
    else console.log('OK: el texto fallback del HTML coincide con lang/es.js en todos los data-i18n');
}

process.exit(errors ? 1 : 0);
