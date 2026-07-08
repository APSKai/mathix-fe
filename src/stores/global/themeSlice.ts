import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { VIEW_MODE } from '@/constants/storage'
import { THEMES } from '@/constants/theme'
import { State } from '@/interfaces/store/theme.interface'
import { getLocalStorage, putLocalStorage } from '@/utils/storage'

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT
const userTheme =
    (getLocalStorage(VIEW_MODE.THEME) as State['theme']) || THEMES.LIGHT

const initialState: State = {
    theme: userTheme || systemTheme,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setGlobalThemeState(state: any, action: PayloadAction<Partial<State>>) {
            Object.assign(state, action.payload)

            if (action.payload.theme) {
                putLocalStorage(VIEW_MODE.THEME, action.payload.theme)
                const body = document.body

                if (action.payload.theme === 'dark') {
                    if (!body.hasAttribute('theme-mode')) {
                        body.setAttribute('theme-mode', 'dark')
                    }
                } else {
                    if (body.hasAttribute('theme-mode')) {
                        body.removeAttribute('theme-mode')
                    }
                }
            }
        },
        toggleTheme(state: any) {
            state.theme =
                state.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
            putLocalStorage(VIEW_MODE.THEME, state.theme)
        },
    },
})

export const { setGlobalThemeState, toggleTheme } = themeSlice.actions

export default themeSlice.reducer
