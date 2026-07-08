export const AUTH_API = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
}

export const USER_API = {
    GET_CURRENT_USER: 'user/me',
    UPDATE_USER: (id: any) => `/user/${id}`,
    DELETE_USER: (id: any) => `/user/${id}`,
}

export const UPLOAD_API = {
    UPLOAD: '/upload',
    FILES: '/upload/files',
    FILE_DETAIL: (id: string) => `/upload/files/${id}`,
}
