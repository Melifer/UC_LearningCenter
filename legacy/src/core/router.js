// ==========================================================================
// ROUTER — Simple hash-based SPA router
// ==========================================================================
import { auth } from './auth.js';
import { eventBus } from './eventBus.js';

const routes = {};
let notFoundHandler = null;
let beforeEachHook = null;

export const router = {
    register(path, handler) {
        routes[path] = handler;
        return this;
    },

    notFound(handler) {
        notFoundHandler = handler;
        return this;
    },

    beforeEach(hook) {
        beforeEachHook = hook;
        return this;
    },

    navigate(path, replaceState = false) {
        const newHash = `#${path}`;
        if (replaceState) {
            history.replaceState(null, '', newHash);
        } else {
            window.location.hash = path;
        }
        this._resolve();
    },

    init() {
        window.addEventListener('hashchange', () => this._resolve());
        this._resolve();
    },

    _resolve() {
        const raw = window.location.hash.replace(/^#\/?/, '') || '';
        const [base, ...params] = raw.split('/');

        const to = { path: raw, base, params };

        // Global guard — redirect to login if not authenticated
        if (beforeEachHook) {
            const redirect = beforeEachHook(to);
            if (redirect) {
                this.navigate(redirect, true);
                return;
            }
        }

        const handler = routes[base] || routes['*'];
        if (handler) {
            handler(params, to);
            eventBus.emit('route:changed', to);
        } else if (notFoundHandler) {
            notFoundHandler(to);
        }
    },

    getCurrentPath() {
        return window.location.hash.replace(/^#\/?/, '') || '';
    }
};
