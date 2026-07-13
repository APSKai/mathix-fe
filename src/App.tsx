import {ConfigProvider, theme} from 'antd'

import {useSelector} from 'react-redux'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {SCREEN, THEMES} from '@/constants/theme'
import {useWindowSize} from '@/hooks/useWindowSize'
import AppRouter from '@/routers/router'

import NotFound from './pages/commons/NotFound'

function App() {
    const {innerWidth, innerHeight} = useWindowSize()
    const themeState = useSelector((state: any) => state.theme.theme)
    const {defaultAlgorithm, darkAlgorithm} = theme

    if (innerWidth < SCREEN.WIDTH || innerHeight < SCREEN.HEIGHT) {
        document.documentElement.style.setProperty('--font-size-base', '13px')
    } else {
        document.documentElement.style.setProperty('--font-size-base', '16px')
    }

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    themeState === THEMES.DARK
                        ? darkAlgorithm
                        : defaultAlgorithm,
                token:
                    themeState === THEMES.DARK
                        ? {
                            colorBgBase: '#141414',
                            colorTextBase: '#ffffff',
                        }
                        : {
                            colorBgBase: '#ffffff',
                            colorTextBase: '#141414',
                        },
            }}
        >
            <div>
                <>
                    <Router>
                        <Routes>
                            {AppRouter}
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Router>
                </>
            </div>
        </ConfigProvider>
    )
}

export default App
