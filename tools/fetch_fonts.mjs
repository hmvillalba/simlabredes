// tools/fetch_fonts.mjs — Fase 6: baja las tipografías de Google Fonts y las deja
// locales en assets/fonts/ (sin CDN, para que el simulador funcione sin internet).
//
// Uso: node tools/fetch_fonts.mjs
//
// Qué hace:
//  1. Pide el CSS de Google Fonts con un User-Agent moderno (devuelve .woff2).
//  2. Se queda solo con los subconjuntos que necesita el proyecto: latin y
//     latin-ext (suficiente para español, inglés, portugués y francés).
//  3. Descarga cada .woff2 a assets/fonts/ y reescribe las url() a rutas locales.
//  4. Escribe assets/fonts/fonts.css, que es el archivo que carga index.html.
//
// El archivo generado es determinista: si el CSS de Google cambia, basta con
// volver a ejecutar este script (no hace falta tocar index.html).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(ROOT, 'assets', 'fonts');
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap';
const KEEP = new Set(['latin', 'latin-ext']);
// User-Agent de navegador moderno: Google responde con .woff2 en vez de .ttf.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
    fs.mkdirSync(OUT_DIR, { recursive: true });

    const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Google Fonts respondió ${res.status}`);
    const raw = await res.text();

    // Cada bloque va precedido por un comentario con el nombre del subconjunto.
    const blocks = [...raw.matchAll(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
    const kept = blocks.filter(b => KEEP.has(b[1]));
    if (!kept.length) throw new Error('No se encontró ningún @font-face en la respuesta de Google Fonts');

    const out = [];
    let bytes = 0;

    for (const [, subset, block] of kept) {
        const family = (block.match(/font-family:\s*'([^']+)'/) || [])[1] || 'font';
        const weight = (block.match(/font-weight:\s*(\d+)/) || [])[1] || '400';
        const url = (block.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
        if (!url) continue;

        const file = `${slug(family)}-${weight}-${subset}.woff2`;
        const dest = path.join(OUT_DIR, file);
        if (!fs.existsSync(dest)) {
            const fr = await fetch(url, { headers: { 'User-Agent': UA } });
            if (!fr.ok) throw new Error(`No se pudo bajar ${url} (${fr.status})`);
            fs.writeFileSync(dest, Buffer.from(await fr.arrayBuffer()));
        }
        bytes += fs.statSync(dest).size;

        out.push(block.replace(/url\(https:[^)]+\.woff2\)/, `url('./${file}')`));
    }

    const header = [
        '/* assets/fonts/fonts.css — tipografías locales (Fase 6).',
        ' * Generado por tools/fetch_fonts.mjs; NO editar a mano.',
        ` * Familias: ${[...new Set(kept.map(b => (b[2].match(/font-family:\s*'([^']+)'/) || [])[1]).filter(Boolean))].join(', ')}`,
        ' * Subconjuntos: ' + [...KEEP].join(', ') + ' (suficiente para es/en/pt/fr).',
        ' */',
        ''
    ].join('\n');

    fs.writeFileSync(path.join(OUT_DIR, 'fonts.css'), header + out.join('\n') + '\n', 'utf8');

    console.log(`Fuentes locales listas: ${kept.length} archivos, ${(bytes / 1024).toFixed(1)} KB`);
    console.log('CSS: assets/fonts/fonts.css');
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
