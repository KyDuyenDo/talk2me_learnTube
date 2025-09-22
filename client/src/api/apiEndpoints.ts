export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Course endpoints
  COURSES: {
    LIST: "/courses",
    DETAIL: (id: string) => `/courses/${id}`,
    CREATE: "/courses",
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
    LESSONS: (courseId: string) => `/courses/${courseId}/lessons`,
  },

  // User endpoints
  USERS: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    REPORTS: "/users/reports",
  },

  // Quiz endpoints
  QUIZ: {
    START: (courseId: string) => `/courses/${courseId}/quiz/start`,
    SUBMIT: (courseId: string) => `/courses/${courseId}/quiz/submit`,
    RESULTS: (courseId: string) => `/courses/${courseId}/quiz/results`,
  },
} as const
