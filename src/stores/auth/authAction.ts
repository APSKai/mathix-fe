import { createAsyncThunk } from '@reduxjs/toolkit'

import { AUTH_API } from '@/constants/api'
import { LoginRequest } from '@/interfaces/auth/auth.interface'
import AuthService from '@/services/auth'

export const loginAction = createAsyncThunk(
    AUTH_API.LOGIN,
    async (credentials: LoginRequest, { rejectWithValue }) => {
        const res = await AuthService.login(credentials)
        return res.data
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