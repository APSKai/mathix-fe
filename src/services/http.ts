import axios from 'axios'

import { notification } from 'antd'

import { AUTH_API } from '@/constants/api'
import { CREDENTIALS } from '@/constants/storage'
import { PATHS } from '@/routers/path'
import { clearAuthSession } from '@/utils/authSession'
import { getLocalStorage } from '@/utils/storage'

let isHandlingUnauthorized = false

const http = axios.create({
    withCredentials: false,
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
        return config?.data
    },
    (error: any) => {
        const status = error?.response?.status
        const requestUrl = error?.config?.url ?? ''
        const isLoginRequest = requestUrl.includes(AUTH_API.LOGIN)

        if (
            [401, 403].includes(status) &&
            !isLoginRequest &&
            !isHandlingUnauthorized &&
            window.location.pathname !== PATHS.LOGIN
        ) {
            isHandlingUnauthorized = true
            clearAuthSession()
            notification.error({
                message: 'Unauthorized',
                description: 'Please sign in to continue.',
            })
            window.location.href = PATHS.LOGIN
        }
        return Promise.reject(error)
    }
)

export default http
