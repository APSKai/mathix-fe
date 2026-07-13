import { AxiosResponse } from 'axios'

import { AUTH_API } from '@/constants/api'
import { LoginRequest, LoginResponse } from '@/interfaces/auth/auth.interface'
import http from '@/services/http'

export class AuthService {
    async login(payload: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        return await http.post(AUTH_API.LOGIN, payload)
    }

    async register(payload: any): Promise<AxiosResponse<any>> {
        return await http.post(AUTH_API.REGISTER, payload)
    }

    async logout(): Promise<AxiosResponse<any>> {
        return await http.get(AUTH_API.LOGOUT)
    }

    async me(): Promise<AxiosResponse<any>> {
        return await http.get(AUTH_API.ME)
    }
}

export default new AuthService()
