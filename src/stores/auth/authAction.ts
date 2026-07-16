import { createAsyncThunk } from '@reduxjs/toolkit'

import { AUTH_API } from '@/constants/api'
import {
    LoginRequest,
    RegisterRequest,
} from '@/interfaces/auth/auth.interface'
import AuthService from '@/services/auth'

export const loginAction = createAsyncThunk(
    AUTH_API.LOGIN,
    async (credentials: LoginRequest, { rejectWithValue }) => {
        const res = await AuthService.login(credentials)
        return res.data
    }
)

export const registerAction = createAsyncThunk(
    AUTH_API.REGISTER,
    async (credentials: RegisterRequest, { rejectWithValue }) => {
        try {
            const res = await AuthService.register(credentials)
            return res.data
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || {
                    message: 'Không thể đăng ký tài khoản',
                }
            )
        }
    }
)

export const getCurrentUserAction = createAsyncThunk(AUTH_API.ME, async () => {
    const res = await AuthService.me()
    return res.data
})

export const logoutAction = createAsyncThunk(AUTH_API.LOGOUT, async () => {
    const res = await AuthService.logout()
    return res.data
})
