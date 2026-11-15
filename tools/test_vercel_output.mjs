// Valida que la salida declarada para Vercel contenga el simulador y las cinco portadas
// y todos sus recursos locales, sin exigir Vercel CLI ni conexión de red.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.resolve(process.env.VERCEL_OUTPUT_DIR || path.join(ROOT, 'public'));
const LANGS = ['es', 'ar', 'en', 'pt', 'fr'];
let ok = 0;
let fail = 0;

function check(label, condition) {
    if (condition) {
        ok++;
        console.log(`  ok  - ${label}`);
    } else {
        fail++;
        console.error(`  FAIL - ${label}`);
    }
}

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
check('Vercel publica el directorio public/', config.outputDirectory === 'public');
check('Vercel redirige la raíz al español neutro',
    config.redirects.some(r => r.source === '/' && r.destination === '/es/'));

for (const file of ['index.html', 'LICENSE', 'robots.txt', 'sitemap.xml']) {
    check(`public/${file} está incluido`, fs.existsSync(path.join(OUT, file)));
}

const htmlFiles = [
    'index.html',
    ...LANGS.map(lang => `${lang}/index.html`)
];
for (const htmlFile of htmlFiles) {
    const file = path.join(OUT, htmlFile);
    check(`public/${htmlFile} está incluido`, fs.existsSync(file));
    if (!fs.existsSync(file)) continue;

    const html = fs.readFileSync(file, 'utf8');
    const refs = [...html.matchAll(/<(?:link|script|img)[^>]*(?:href|src)="([^"]+)"/g)]
        .map(match => match[1]);
    for (const ref of refs) {
        if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(ref)) continue;
        const pathname = decodeURIComponent(ref.split(/[?#]/, 1)[0]);
        check(`${htmlFile}: recurso local ${ref}`, fs.existsSync(path.resolve(path.dirname(file), pathname)));
    }
}

console.log(`\nResultado: ${ok} ok, ${fail} fallidos`);
process.exit(fail ? 1 : 0);
