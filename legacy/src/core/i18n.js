// ==========================================================================
// I18N MODULE — Language management (PL default, EN supported)
// ==========================================================================
import { eventBus } from './eventBus.js';

const LANG_KEY = 'lc_language';
const SUPPORTED = ['pl', 'en'];
const DEFAULT_LANG = 'pl';

export const i18n = {
    current: null,

    init() {
        const stored = localStorage.getItem(LANG_KEY);
        this.current = SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
        return this.current;
    },

    setLanguage(lang) {
        if (!SUPPORTED.includes(lang)) return;
        this.current = lang;
        localStorage.setItem(LANG_KEY, lang);
        eventBus.emit('lang:changed', lang);
    },

    getLanguage() {
        return this.current || DEFAULT_LANG;
    },

    // Resolve courseId to language-specific variant
    // e.g. 'ai-governance' + 'pl' → 'ai-governance-pl'
    resolveCourseId(baseCourseId, lang = null) {
        const l = lang || this.getLanguage();
        return `${baseCourseId}-${l}`;
    },

    // Get opposing language
    getAlternateLanguage() {
        return this.current === 'pl' ? 'en' : 'pl';
    },

    getAlternateLangLabel() {
        return this.current === 'pl' ? '🇺🇸 ENGLISH' : '🇵🇱 POLSKI';
    }
};
