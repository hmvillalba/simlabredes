// Prepara el directorio estático que Vercel publica tras `npm run build`.
// El árbol de fuentes y el acceso local permanecen en la raíz del repositorio.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'public');
const FILES = ['index.html', 'LICENSE', 'robots.txt', 'sitemap.xml'];
const DIRS = ['assets', 'en', 'es', 'fr', 'js', 'lang', 'pt'];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const file of FILES) {
    const source = path.join(ROOT, file);
    if (!fs.existsSync(source)) throw new Error(`Falta archivo requerido para Vercel: ${source}`);
    fs.copyFileSync(source, path.join(OUT, file));
}

for (const dir of DIRS) {
    const source = path.join(ROOT, dir);
    if (!fs.existsSync(source)) throw new Error(`Falta directorio requerido para Vercel: ${source}`);
    fs.cpSync(source, path.join(OUT, dir), { recursive: true });
}

console.log(`Vercel: salida estática preparada en ${path.relative(ROOT, OUT)}/`);
