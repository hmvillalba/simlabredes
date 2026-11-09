/**
 * js/i18n.js — Motor de internacionalización (Fase 2 del plan de i18n).
 *
 * - Diccionarios en window.I18N_DICTS, cargados desde lang/*.js con <script>
 *   (así funciona también abriendo el archivo directo con file://).
 * - t(clave, vars): resuelve en el idioma actual; si falta la clave, cae al
 *   español; si falta ahí, devuelve la clave y avisa en consola.
 * - Interpolación {variable} y plurales con vars.count (clave_one / clave_other).
 * - Atributos para HTML estático: data-i18n, data-i18n-title,
 *   data-i18n-placeholder, data-i18n-aria-label. Si una clave NO existe en el
 *   diccionario, el contenido original del elemento no se toca (fase segura).
 * - Idioma inicial: localStorage('sim_lang') > navigator.language > 'es'.
 *   Al cambiar se guarda, se actualiza <html lang> y se emite 'i18n:change'.
 * - Log de tráfico: I18N.log(clave, vars, color) / I18N.logEntry({...}) guardan
 *   las entradas como clave+variables y las re-renderizan al cambiar de idioma.
 */
(function () {
    'use strict';

    const FALLBACK = 'es';
    const SUPPORTED = ['es', 'en', 'pt', 'fr'];
    const LOG_MAX = 20;

    let current = FALLBACK;
    const listeners = [];
    const logEntries = [];

    function normalize(code) {
        if (!code) return null;
        const c = String(code).toLowerCase().split('-')[0].trim();
        return SUPPORTED.includes(c) ? c : null;
    }

    function detectInitial() {
        try {
            const n = normalize(window.localStorage.getItem('sim_lang'));
            if (n) return n;
        } catch (e) { /* file:// o navegación privada */ }
        const nav = normalize(window.navigator.language) || normalize((window.navigator.languages || [])[0]);
        return nav || FALLBACK;
    }

    function lookup(lang, key) {
        const d = (window.I18N_DICTS && window.I18N_DICTS[lang]) || {};
        let node = d;
        for (const part of key.split('.')) {
            if (node === null || typeof node !== 'object') return undefined;
            node = node[part];
        }
        return typeof node === 'string' ? node : undefined;
    }

    function interpolate(str, vars) {
        if (!vars) return str;
        return str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : m));
    }

    function t(key, vars) {
        vars = vars || {};
        let str;
        if (vars.count !== undefined) {
            const suffix = vars.count === 1 ? '_one' : '_other';
            str = lookup(current, key + suffix) || lookup(FALLBACK, key + suffix) || lookup(current, key) || lookup(FALLBACK, key);
        } else {
            str = lookup(current, key) || lookup(FALLBACK, key);
        }
        if (str === undefined) {
            console.warn('[i18n] clave faltante:', key, '(idioma actual:', current + ')');
            return key;
        }
        return interpolate(str, vars);
    }

    function applyAttr(root, attr, apply) {
        root.querySelectorAll('[' + attr + ']').forEach(el => {
            const v = lookup(current, el.getAttribute(attr));
            if (v !== undefined) apply(el, v);
        });
    }

    function applyI18n(root) {
        root = root || document;
        applyAttr(root, 'data-i18n', (el, v) => { el.textContent = v; });
        applyAttr(root, 'data-i18n-title', (el, v) => { el.setAttribute('title', v); });
        applyAttr(root, 'data-i18n-placeholder', (el, v) => { el.setAttribute('placeholder', v); });
        applyAttr(root, 'data-i18n-aria-label', (el, v) => { el.setAttribute('aria-label', v); });
    }

    function renderLog() {
        const el = document.getElementById('traffic-log');
        if (!el) return;
        el.innerHTML = '';
        for (const e of logEntries) {
            const li = document.createElement('li');
            li.className = e.color;
            const msg = e.i18n ? t(e.i18n.key, e.i18n.vars) : e.text;
            li.textContent = e.time.toLocaleTimeString() + '  ' + msg;
            el.appendChild(li);
        }
        el.scrollTop = el.scrollHeight;
    }

    // entry: { text?, i18n?: {key, vars}, color? }
    function logEntry(entry) {
        logEntries.push({
            time: new Date(),
            color: entry.color || 'text-slate-300',
            i18n: entry.i18n || null,
            text: entry.text || ''
        });
        while (logEntries.length > LOG_MAX) logEntries.shift();
        renderLog();
    }

    function log(key, vars, color) {
        logEntry({ i18n: { key, vars: vars || {} }, color });
    }

    function setLang(lang) {
        const n = normalize(lang);
        if (!n) return;
        current = n;
        try { window.localStorage.setItem('sim_lang', n); } catch (e) { /* sin storage */ }
        document.documentElement.setAttribute('lang', n);
        applyI18n(document);
        renderLog();
        const sel = document.getElementById('lang-select');
        if (sel) sel.value = n;
        document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: n } }));
        listeners.forEach(fn => { try { fn(n); } catch (e) { console.error(e); } });
    }

    function init() {
        current = detectInitial();
        document.documentElement.setAttribute('lang', current);
        applyI18n(document);
        const sel = document.getElementById('lang-select');
        if (sel) sel.value = current;
    }

    window.I18N = {
        t,
        setLang,
        applyI18n,
        log,
        logEntry,
        renderLog,
        onChange(fn) { listeners.push(fn); },
        get lang() { return current; },
        get supported() { return SUPPORTED.slice(); },
        FALLBACK,
        _entries: logEntries
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
