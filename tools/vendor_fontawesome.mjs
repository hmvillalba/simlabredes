// tools/vendor_fontawesome.mjs — Fase 6: baja Font Awesome y lo deja local en
// assets/fontawesome/ (sin CDN, para que el simulador funcione sin internet).
//
// Uso: node tools/vendor_fontawesome.mjs
//
// Qué hace:
//  1. Descarga all.min.css de la versión 6.4.0 (la misma que usaba el CDN).
//  2. Descarga los .woff2 de las familias que el proyecto usa.
//  3. Limpia el CSS: quita el fallback a .ttf (no se distribuyen los .ttf,
//     así que dejarlos provocaría errores 404 en la consola del navegador).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0';
const CSS_OUT = path.join(ROOT, 'assets', 'fontawesome', 'css');
const FONTS_OUT = path.join(ROOT, 'assets', 'fontawesome', 'webfonts');
const FONTS = ['fa-solid-900.woff2', 'fa-regular-400.woff2', 'fa-brands-400.woff2', 'fa-v4compatibility.woff2'];

async function get(url, kind) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${kind}: ${url} respondió ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
}

async function main() {
    fs.mkdirSync(CSS_OUT, { recursive: true });
    fs.mkdirSync(FONTS_OUT, { recursive: true });

    let css = (await get(`${BASE}/css/all.min.css`, 'Font Awesome')).toString('utf8');
    // El CSS original ofrece woff2 y, como respaldo, ttf. Solo se distribuyen
    // los woff2: el respaldo a ttf se elimina para no dejar rutas rotas.
    css = css.replace(/,url\(\.\.\/webfonts\/[^)]+\.ttf\)\s*format\("truetype"\)/g, '');

    let bytes = 0;
    for (const font of FONTS) {
        const dest = path.join(FONTS_OUT, font);
        if (!fs.existsSync(dest)) fs.writeFileSync(dest, await get(`${BASE}/webfonts/${font}`, 'fuente'));
        bytes += fs.statSync(dest).size;
    }

    fs.writeFileSync(path.join(CSS_OUT, 'all.min.css'), css, 'utf8');

    // Comprobación: toda url() del CSS debe apuntar a un archivo que exista.
    const urls = [...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map(m => m[1].replace(/["']/g, '')))];
    const faltan = urls.filter(u => !fs.existsSync(path.resolve(CSS_OUT, u)));
    if (faltan.length) throw new Error(`El CSS referencia archivos que no existen: ${faltan.join(', ')}`);

    console.log(`Font Awesome local: ${FONTS.length} fuentes, ${(bytes / 1024).toFixed(1)} KB`);
    console.log('CSS: assets/fontawesome/css/all.min.css');
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
