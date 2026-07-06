// ==========================================================================
// USERS DATA — Mock user registry with course assignments
// Future: Replace with API call to /api/users/me after JWT login
// ==========================================================================

export const USERS = [
    {
        id: 'sylwia.szuba',
        name: 'Sylwia Szuba',
        role: 'AI Governance Lead',
        avatar: 'SS',
        // Base course IDs (without language suffix — resolved by i18n.resolveCourseId)
        assignedCourses: ['ai-governance'],
        // Courses fully unlocked (paid/authorized) — others show in demo mode
        unlockedCourses: ['ai-governance'],
        language: 'pl'   // preferred language
    },
    {
        id: 'jan.kowalski',
        name: 'Jan Kowalski',
        role: 'IT Risk Analyst',
        avatar: 'JK',
        assignedCourses: ['ai-governance'],
        unlockedCourses: [],   // Demo mode only
        language: 'pl'
    },
    {
        id: 'anna.nowak',
        name: 'Anna Nowak',
        role: 'Compliance Officer',
        avatar: 'AN',
        assignedCourses: ['ai-governance'],
        unlockedCourses: ['ai-governance'],
        language: 'en'
    }
];

// Default user for development — replace with auth API response
export const DEFAULT_USER_ID = null;
