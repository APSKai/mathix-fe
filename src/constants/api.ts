export const AUTH_API = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
}

export const USER_API = {
    GET_CURRENT_USER: '/auth/me',
    UPDATE_USER: (id: any) => `/user/${id}`,
    DELETE_USER: (id: any) => `/user/${id}`,
}

export const QUIZ_API = {
    TAXONOMIES: '/taxonomies',
    EXAMS: '/exams',
    EXAM: (slug: string) => `/exams/${slug}`,
    EXAM_OVERVIEW: (slug: string, code: string) => `/exams/${slug}/variants/${code}/overview`,
    START_ATTEMPT: (examId: string) => `/exams/${examId}/attempts`,
    ATTEMPT: (attemptId: string) => `/attempts/${attemptId}`,
    ANSWERS: (attemptId: string) => `/attempts/${attemptId}/answers`,
    SUBMIT: (attemptId: string) => `/attempts/${attemptId}/submit`,
    RESULT: (attemptId: string) => `/attempts/${attemptId}/result`,
    HISTORY: '/me/attempts',
    LEADERBOARD: '/leaderboard',
}

export const ADMIN_QUIZ_API = {
    EXAM_GROUPS: '/admin/exam-groups',
    EXAM_GROUP: (id: string) => `/admin/exam-groups/${id}`,
    EXAM_GROUP_PUBLISH: (id: string) => `/admin/exam-groups/${id}/publish`,
    EXAM_GROUP_VARIANTS: (id: string) => `/admin/exam-groups/${id}/variants`,
    TAXONOMIES: '/admin/taxonomies',
    QUESTIONS: '/admin/questions',
    QUESTION: (id: string) => `/admin/questions/${id}`,
    EXAMS: '/admin/exams',
    EXAM: (id: string) => `/admin/exams/${id}`,
    GENERATE: (id: string) => `/admin/exams/${id}/generate`,
    PUBLISH: (id: string) => `/admin/exams/${id}/publish`,
    MEDIA_IMAGES: '/admin/media/images',
}
