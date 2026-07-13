import { createSlice } from '@reduxjs/toolkit'

import { CREDENTIALS } from '@/constants/storage'
import { AuthSliceState } from '@/interfaces/store/auth.interface'
import { User } from '@/interfaces/user/user.interface'
import { clearAuthSession } from '@/utils/authSession'
import { getLocalStorage, putLocalStorage } from '@/utils/storage'

import { getCurrentUserAction, loginAction, logoutAction } from './authAction'

const initialUser: User = {
    uid: '',
    username: '',
    fullName: '',
    email: '',
    role: 'user',
    verify: false,
    avatar: '',
    createdAt: '',
    updatedAt: '',
}

const initialState: AuthSliceState = {
    isAuthenticated: Boolean(getLocalStorage(CREDENTIALS.IS_LOGIN)) || false,
    user: getLocalStorage(CREDENTIALS.USER_INFO)
        ? JSON.parse(getLocalStorage(CREDENTIALS.USER_INFO) as string)
        : initialUser,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            clearAuthSession()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action: any) => {
                putLocalStorage(
                    CREDENTIALS.AUTHENTICATION_TOKEN,
                    action.payload.accessToken
                )
            })
            .addCase(getCurrentUserAction.fulfilled, (state, action) => {
                state.isAuthenticated = true
                putLocalStorage(CREDENTIALS.IS_LOGIN, 'true')
                putLocalStorage(
                    CREDENTIALS.USER_INFO,
                    JSON.stringify(action.payload.user)
                )
                state.user = action.payload.user
            })
            .addCase(getCurrentUserAction.rejected, (state, action) => {
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.isAuthenticated = false
                state.user = null
                clearAuthSession()
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
