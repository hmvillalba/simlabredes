// tools/check_vars.mjs — Control de variables de interpolación i18n.
//
// Uso: node tools/check_vars.mjs
//
//   Comprueba que cada llamada I18N.t('clave', { ... }) pase TODAS las variables
//   que la clave necesita en lang/es.js. Si falta alguna, la interfaz muestra
//   el texto con el {variable} literal.
//
// Exit code 1 si hay variables faltantes.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

global.window = global.window || {};
global.window.I18N_DICTS = global.window.I18N_DICTS || {};
for (const f of fs.readdirSync(path.join(root, 'lang')).filter(f => f.endsWith('.js'))) {
    new Function('window', fs.readFileSync(path.join(root, 'lang', f), 'utf8'))(global.window);
}
const dicts = global.window.I18N_DICTS;
if (!dicts.es) { console.error('FAIL: no se cargó lang/es.js'); process.exit(1); }

function flat(o, p = '') {
    const out = {};
    for (const [k, v] of Object.entries(o)) {
        const key = p ? p + '.' + k : k;
        if (typeof v === 'string') out[key] = v;
        else if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(out, flat(v, key));
    }
    return out;
}

const need = {};
for (const [lang, d] of Object.entries(dicts)) {
    const F = flat(d);
    for (const [k, v] of Object.entries(F)) {
        const vars = new Set([...v.matchAll(/\{(\w+)\}/g)].map(m => m[1]));
        if (vars.size) (need[lang] ||= {})[k] = vars;
    }
}

// I18N.t('clave', { a: 1, b, c: `x ${y}` })  ->  clave + argumentos balanceados
function scanCall(html, start) {
    const head = /I18N\.t\(\s*'([a-zA-Z0-9_.]+)'/.exec(html.slice(start));
    if (!head) return null;
    const key = head[1];
    const afterKey = start + head[0].length;
    const ob = html.indexOf('{', afterKey);
    if (ob === -1) return { key, args: null };
    let depth = 0, j = ob;
    for (; j < html.length; j++) {
        const c = html[j];
        if (c === '{') depth++;
        else if (c === '}') { depth--; if (depth === 0) break; }
    }
    return { key, args: html.slice(ob + 1, j) };
}

const problems = [];
let calls = 0;
const callRe = /I18N\.t\(\s*'/g;
let m;
while ((m = callRe.exec(html))) {
    const call = scanCall(html, m.index);
    if (!call) continue;
    calls++;
    const args = call.args || '';
    const given = new Set([...args.matchAll(/([a-zA-Z_$][\w$]*)\s*(?=[,:}]|$)/g)].map(x => x[1]));
    const wanted = need.es && need.es[call.key];
    if (!wanted) continue;
    const miss = [...wanted].filter(v => !given.has(v));
    if (miss.length) {
        const line = html.slice(0, m.index).split('\n').length;
        problems.push(`${call.key}: faltan {${miss.join('}, {')}} (línea ~${line})`);
    }
    // La misma clave puede existir en otros idiomas: sus variables también
    // tienen que estar entre las que se pasan.
    for (const [lang, keys] of Object.entries(need)) {
        if (lang === 'es' || !keys[call.key]) continue;
        const missLang = [...keys[call.key]].filter(v => !given.has(v));
        if (missLang.length) {
            const line = html.slice(0, m.index).split('\n').length;
            problems.push(`${call.key} [${lang}]: faltan {${missLang.join('}, {')}} (línea ~${line})`);
        }
    }
}

console.log(`claves con variables en lang/es.js: ${Object.keys(need.es || {}).length}`);
console.log(`llamadas I18N.t revisadas: ${calls}`);
if (problems.length) {
    console.log(`FALTAN VARIABLES (${problems.length}):`);
    problems.forEach(p => console.log('  *', p));
} else {
    console.log('OK: todas las llamadas I18N.t() pasan las variables que necesita su clave');
}
process.exit(problems.length ? 1 : 0);
