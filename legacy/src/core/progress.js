// ==========================================================================
// PROGRESS MODULE — Track course completion in localStorage
// ==========================================================================
import { eventBus } from './eventBus.js';

const PROGRESS_KEY = 'lc_progress';

function loadAll() {
    try {
        return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch {
        return {};
    }
}

function saveAll(data) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function getKey(userId, courseId) {
    return `${userId}::${courseId}`;
}

export const progress = {
    getCourseProgress(userId, courseId) {
        const all = loadAll();
        return all[getKey(userId, courseId)] || {
            visitedSlides: [],
            completedModules: [],
            quizScore: null,
            quizCompleted: false,
            certificateIssued: false,
            startedAt: null,
            completedAt: null
        };
    },

    markSlideVisited(userId, courseId, slideId) {
        const all = loadAll();
        const key = getKey(userId, courseId);
        if (!all[key]) all[key] = this.getCourseProgress(userId, courseId);
        if (!all[key].visitedSlides.includes(slideId)) {
            all[key].visitedSlides.push(slideId);
            if (!all[key].startedAt) all[key].startedAt = Date.now();
        }
        saveAll(all);
    },

    markModuleComplete(userId, courseId, moduleId) {
        const all = loadAll();
        const key = getKey(userId, courseId);
        if (!all[key]) all[key] = this.getCourseProgress(userId, courseId);
        if (!all[key].completedModules.includes(moduleId)) {
            all[key].completedModules.push(moduleId);
        }
        saveAll(all);
        eventBus.emit('progress:moduleComplete', { userId, courseId, moduleId });
    },

    saveQuizResult(userId, courseId, score, passed) {
        const all = loadAll();
        const key = getKey(userId, courseId);
        if (!all[key]) all[key] = this.getCourseProgress(userId, courseId);
        all[key].quizScore = score;
        all[key].quizCompleted = true;
        if (passed) all[key].completedAt = Date.now();
        saveAll(all);
        eventBus.emit('progress:quizComplete', { userId, courseId, score, passed });
    },

    issueCertificate(userId, courseId) {
        const all = loadAll();
        const key = getKey(userId, courseId);
        if (!all[key]) all[key] = this.getCourseProgress(userId, courseId);
        all[key].certificateIssued = true;
        saveAll(all);
    },

    getOverallCompletion(userId, courseId, totalSlides) {
        const p = this.getCourseProgress(userId, courseId);
        return totalSlides > 0
            ? Math.round((p.visitedSlides.length / totalSlides) * 100)
            : 0;
    },

    resetCourse(userId, courseId) {
        const all = loadAll();
        delete all[getKey(userId, courseId)];
        saveAll(all);
    }
};
