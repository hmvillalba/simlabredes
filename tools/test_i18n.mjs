// tools/test_i18n.mjs — Tests del motor i18n (Fase 2). Uso: node tools/test_i18n.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// ---- stubs mínimos de navegador ----
function makeBrowser({ lang = 'es-ES', saved = null } = {}) {
    const store = new Map(saved ? [['sim_lang', saved]] : []);
    const documentElementAttrs = {};
    const listeners = {};
    const logEl = {
        _children: [], _html: '', scrollTop: 0, scrollHeight: 0,
        get children() { return this._children; },
        get innerHTML() { return this._html; },
        set innerHTML(v) { this._html = v; if (v === '') this._children = []; }, // como en el navegador real
        appendChild(li) { this._children.push(li); }
    };
    const document = {
        readyState: 'complete',
        documentElement: {
            setAttribute(k, v) { documentElementAttrs[k] = v; },
            getAttribute(k) { return documentElementAttrs[k]; }
        },
        getElementById(id) {
            if (id === 'traffic-log') return logEl;
            if (id === 'lang-select') return { value: '' };
            return null;
        },
        createElement(tag) {
            return {
                tag, className: '', textContent: '', attrs: {},
                setAttribute(k, v) { this.attrs[k] = v; },
                getAttribute(k) { return this.attrs[k]; }
            };
        },
        querySelectorAll() { return []; },
        addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
        dispatchEvent(ev) { (listeners[ev.type] || []).forEach(fn => fn(ev)); return true; }
    };
    const window = {
        localStorage: {
            getItem: k => (store.has(k) ? store.get(k) : null),
            setItem: (k, v) => store.set(k, String(v))
        },
        navigator: { language: lang, languages: [lang] },
        console
    };
    class CustomEvent {
        constructor(type, opts) { this.type = type; this.detail = opts && opts.detail; }
    }
    return { window, document, CustomEvent, store, logEl, documentElementAttrs, listeners };
}

function loadEngine(browser) {
    globalThis.window = browser.window;
    globalThis.document = browser.document;
    // en Node >= 21 globalThis.navigator existe y es de solo lectura: hay que redefinirlo
    Object.defineProperty(globalThis, 'navigator', {
        value: browser.window.navigator, configurable: true, writable: true
    });
    globalThis.CustomEvent = browser.CustomEvent;
    for (const f of ['lang/es.js', 'js/i18n.js']) {
        const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
        vm.runInThisContext(code, { filename: f });
    }
    return browser.window.I18N;
}

let passed = 0, failed = 0;
function ok(cond, name) {
    if (cond) { passed++; console.log('  ok  -', name); }
    else { failed++; console.error('  FAIL-', name); }
}

console.log('\n[1] idioma inicial y resolución en español');
{
    const b = makeBrowser({ lang: 'es-ES' });
    const I18N = loadEngine(b);
    ok(I18N.lang === 'es', 'navigator es-ES -> es');
    ok(I18N.t('app.title') === 'Simulador de Redes Educativo', "t('app.title') resuelve clave anidada");
    ok(b.documentElementAttrs.lang === 'es', '<html lang> puesto en es');
}

console.log('\n[2] fallback a español y clave faltante');
{
    const b = makeBrowser({ lang: 'en-US' });
    const I18N = loadEngine(b);
    ok(I18N.lang === 'en', 'navigator en-US -> en');
    ok(I18N.t('app.title') === 'Simulador de Redes Educativo', 'falta en en -> cae a español');
    ok(I18N.t('clave.inexistente') === 'clave.inexistente', 'clave faltante devuelve la clave');
}

console.log('\n[3] interpolación y plurales');
{
    const b = makeBrowser({});
    const I18N = loadEngine(b);
    window.I18N_DICTS.es.log = {
        packetSent: 'Paquete de {from} a {to}',
        packets_one: '1 paquete',
        packets_other: '{count} paquetes'
    };
    ok(I18N.t('log.packetSent', { from: 'PC1', to: 'Router' }) === 'Paquete de PC1 a Router', 'interpolación {var}');
    ok(I18N.t('log.packets', { count: 1 }) === '1 paquete', 'plural count=1 -> _one');
    ok(I18N.t('log.packets', { count: 7 }) === '7 paquetes', 'plural count=7 -> _other');
}

console.log('\n[4] setLang: normaliza, guarda, actualiza <html lang>, ignora no soportados');
{
    const b = makeBrowser({});
    const I18N = loadEngine(b);
    I18N.setLang('pt-BR');
    ok(I18N.lang === 'pt', 'pt-BR -> pt');
    ok(b.store.get('sim_lang') === 'pt', 'guarda sim_lang=pt en localStorage');
    ok(b.documentElementAttrs.lang === 'pt', '<html lang> = pt');
    I18N.setLang('xx');
    ok(I18N.lang === 'pt', 'idioma no soportado se ignora');
    I18N.setLang('fr');
    ok(b.document.documentElement.getAttribute('lang') === 'fr', 'cambio a fr funciona');
}

console.log('\n[5] prioridad: localStorage > navegador > es');
{
    const b = makeBrowser({ lang: 'en-US', saved: 'fr' });
    const I18N = loadEngine(b);
    ok(I18N.lang === 'fr', 'guardado (fr) gana sobre navigator (en-US)');
    const b2 = makeBrowser({ lang: 'de-DE' });
    const I18N2 = loadEngine(b2);
    ok(I18N2.lang === 'es', 'navegador no soportado (de) -> es por defecto');
}

console.log('\n[6] log como claves+variables: re-render en vivo al cambiar idioma + tope 20');
{
    const b = makeBrowser({});
    const I18N = loadEngine(b);
    window.I18N_DICTS.es.log = { sent: 'Enviado de {from} a {to}' };
    window.I18N_DICTS.en = { log: { sent: 'Sent from {from} to {to}' } };
    I18N.log('log.sent', { from: 'PC1', to: 'SW1' });
    ok(b.logEl.children.length === 1, 'se creó 1 entrada de log');
    ok(/Enviado de PC1 a SW1/.test(b.logEl.children[0].textContent), 'render inicial en español');
    I18N.setLang('en');
    ok(/Sent from PC1 to SW1/.test(b.logEl.children[0].textContent), 'al cambiar a en re-renderiza en inglés');
    for (let i = 0; i < 30; i++) I18N.log('log.sent', { from: 'a', to: 'b' });
    ok(b.logEl.children.length === 20, 'tope de 20 entradas en el log');
}

console.log(`\nResultado: ${passed} ok, ${failed} fallidos`);
process.exit(failed ? 1 : 0);
