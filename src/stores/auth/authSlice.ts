import { createSlice } from '@reduxjs/toolkit'

import { CREDENTIALS } from '@/constants/storage'
import { AuthSliceState } from '@/interfaces/store/auth.interface'
import { User } from '@/interfaces/user/user.interface'
import { clearAuthSession } from '@/utils/authSession'
import { getLocalStorage, putLocalStorage } from '@/utils/storage'

import { loginAction } from './authAction'

const initialUser: User = {
    operator_id: '',
    full_name: '',
    team_id: '',
    role_id: 0,
    access_level: '',
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
                state.isAuthenticated = true
                state.user = action.payload.user
                putLocalStorage(
                    CREDENTIALS.AUTHENTICATION_TOKEN,
                    action.payload.token
                )
                putLocalStorage(
                    CREDENTIALS.USER_INFO,
                    JSON.stringify(action.payload.user)
                )
                putLocalStorage(CREDENTIALS.IS_LOGIN, 'true')
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.isAuthenticated = false
                state.user = null
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
