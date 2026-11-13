// tools/vendor_fonts.mjs — Fase 6: baja las tipografías y las deja locales en
// assets/fonts/ (sin Google Fonts), para que el simulador funcione sin internet.
//
// Uso: node tools/vendor_fonts.mjs
//
// Qué hace:
//  1. Pide el CSS de Google Fonts con el User-Agent de un navegador moderno
//     (así llegan los .woff2 y no los .ttf).
//  2. Se queda solo con los subconjuntos 'latin' y 'latin-ext': cubren de sobra
//     los caracteres del español, inglés, portugués y francés (incluido 'œ').
//  3. Deduplica los archivos: Inter y Fira Code son fuentes variables, así que
//     Google entrega el MISMO .woff2 para todos los pesos. Sin deduplicar se
//     descargarían 5 copias idénticas de Inter.
//  4. Reescribe fonts.css con rutas locales y con el rango de peso real
//     (font-weight: 300 700), que es lo correcto para una fuente variable.
//
// Si el CSS de Google cambia de formato, este script avisa en vez de generar
// un CSS roto.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'assets', 'fonts');
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const SUBSETS = ['latin', 'latin-ext'];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

async function main() {
    fs.mkdirSync(OUT, { recursive: true });

    const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Google Fonts respondió ${res.status}`);
    const css = await res.text();

    // Cada bloque va precedido del comentario con el nombre del subconjunto.
    const blocks = [...css.matchAll(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
    if (!blocks.length) throw new Error('No se reconocieron bloques @font-face en el CSS de Google Fonts');

    const wanted = blocks.filter(b => SUBSETS.includes(b[1]));
    if (!wanted.length) throw new Error('No se encontró ningún subconjunto latin/latin-ext');

    // --- descarga y deduplicación de los .woff2 ---
    const byHash = new Map();          // hash -> nombre de archivo local
    const downloads = new Map();       // url -> hash
    let bytes = 0;

    for (const [, subset, block] of wanted) {
        const url = (block.match(/url\((https:\/\/[^)]+\.woff2)\)/) || [])[1];
        if (!url) continue;
        if (!downloads.has(url)) {
            const r = await fetch(url, { headers: { 'User-Agent': UA } });
            if (!r.ok) throw new Error(`Fuente ${url} respondió ${r.status}`);
            const buf = Buffer.from(await r.arrayBuffer());
            const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
            const family = (block.match(/font-family:\s*'([^']+)'/) || [, 'font'])[1];
            const name = `${slug(family)}-${hash}.woff2`;
            fs.writeFileSync(path.join(OUT, name), buf);
            downloads.set(url, hash);
            byHash.set(hash, name);
            bytes += buf.length;
        }
    }

    // --- reescritura del CSS: una regla por archivo, con el rango de peso ---
    const rules = new Map(); // "familia|archivo" -> { weights:[], unicode, subset }
    for (const [, subset, block] of wanted) {
        const url = (block.match(/url\((https:\/\/[^)]+\.woff2)\)/) || [])[1];
        if (!url || !downloads.has(url)) continue;
        const family = (block.match(/font-family:\s*'([^']+)'/) || [, 'font'])[1];
        const weight = parseInt((block.match(/font-weight:\s*(\d+)/) || [, '400'])[1], 10);
        const unicode = (block.match(/unicode-range:\s*([^;]+);/) || [, ''])[1].trim();
        const file = byHash.get(downloads.get(url));
        const key = `${family}|${file}`;
        if (!rules.has(key)) rules.set(key, { family, file, weights: [], unicode, subset });
        rules.get(key).weights.push(weight);
    }

    const cssOut = [
        '/* assets/fonts/fonts.css — generado por tools/vendor_fonts.mjs. NO editar a mano.',
        ' * Tipografías locales: Inter (variable 300-700) y Fira Code (variable 400-600).',
        ' * Subconjuntos: latin + latin-ext (cubren es/en/pt/fr).',
        ' */',
        ...[...rules.values()].map(r => [
            '@font-face {',
            `  font-family: '${r.family}';`,
            '  font-style: normal;',
            `  font-weight: ${Math.min(...r.weights)} ${Math.max(...r.weights)};`,
            '  font-display: swap;',
            `  src: url('./${r.file}') format('woff2');`,
            r.unicode ? `  unicode-range: ${r.unicode};` : '',
            '}'
        ].filter(Boolean).join('\n'))
    ].join('\n\n');

    fs.writeFileSync(path.join(OUT, 'fonts.css'), cssOut, 'utf8');

    // Limpieza: se borran los .woff2 viejos que no estén en el CSS final.
    const used = new Set([...rules.values()].map(r => r.file));
    for (const f of fs.readdirSync(OUT)) {
        if (f.endsWith('.woff2') && !used.has(f)) fs.unlinkSync(path.join(OUT, f));
    }

    console.log(`Tipografías locales: ${rules.size} reglas, ${used.size} archivos, ${(bytes / 1024).toFixed(1)} KB`);
    console.log('CSS: assets/fonts/fonts.css');
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
