import axios from 'axios'

import { notification } from 'antd'

import { AUTH_API } from '@/constants/api'
import { CREDENTIALS } from '@/constants/storage'
import { PATHS } from '@/routers/path'
import { clearAuthSession } from '@/utils/authSession'
import { getLocalStorage } from '@/utils/storage'

let isHandlingUnauthorized = false

const http = axios.create({
    withCredentials: true,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.request.use(
    (config: any) => {
        const accessToken = getLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }

        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (config: any) => {
        return config
    },
    async (error: any) => {
        const status = error?.response?.status
        const requestUrl = error?.config?.url ?? ''
        const isLoginRequest = requestUrl.includes(AUTH_API.LOGIN)
        const isRefreshRequest = requestUrl.includes(AUTH_API.REFRESH)

        if (
            status === 401 &&
            !isLoginRequest &&
            !isRefreshRequest &&
            (!error.config || !error.config._retry)
        ) {
            if (error.config) error.config._retry = true
            try {
                const refresh = await axios.post(
                    `${String(import.meta.env.VITE_APP_ROOT_API || '').replace(/\/+$/, '')}${AUTH_API.REFRESH}`,
                    {},
                    { withCredentials: true }
                )
                const accessToken = refresh.data?.accessToken
                if (accessToken) {
                    window.localStorage.setItem(
                        CREDENTIALS.AUTHENTICATION_TOKEN,
                        accessToken
                    )
                    error.config.headers = error.config.headers || {}
                    error.config.headers.Authorization = `Bearer ${accessToken}`
                    return http(error.config)
                }
            } catch {
                // The refresh cookie is invalid; continue with the normal sign-out flow.
            }
        }

        if (
            [401, 403].includes(status) &&
            !isLoginRequest &&
            !isHandlingUnauthorized &&
            window.location.pathname !== PATHS.LOGIN
        ) {
            isHandlingUnauthorized = true
            clearAuthSession()
            notification.error({
                message: 'Phiên đăng nhập không hợp lệ',
                description: 'Vui lòng đăng nhập để tiếp tục.',
            })
            window.location.href = PATHS.LOGIN
        }
        return Promise.reject(error)
    }
)

export default http
