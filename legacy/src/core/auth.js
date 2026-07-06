// ==========================================================================
// AUTH MODULE — Mock authentication, interface-ready for JWT/OAuth
// ==========================================================================
import { USERS } from '../../data/users.js';
import { eventBus } from './eventBus.js';

const SESSION_KEY = 'lc_session';

export const auth = {
    login(userId) {
        const user = USERS.find(u => u.id === userId);
        if (!user) return false;
        const session = {
            userId: user.id,
            loginTime: Date.now(),
            // Future: token: 'jwt_token_here'
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        eventBus.emit('auth:login', user);
        return true;
    },

    logout() {
        localStorage.removeItem(SESSION_KEY);
        eventBus.emit('auth:logout');
    },

    isLoggedIn() {
        return !!this.getSession();
    },

    getSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    getCurrentUser() {
        const session = this.getSession();
        if (!session) return null;
        return USERS.find(u => u.id === session.userId) || null;
    },

    // Future hook: replace with API call
    // async loginWithCredentials(email, password) { ... }
};
