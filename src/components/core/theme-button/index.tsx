import React from 'react'

import { Button, Tooltip } from 'antd'

import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { toggleTheme } from '@/stores/global/themeSlice'

const ThemeButton: React.FC = () => {
    const dispatch = useDispatch()
    const themeMode = useSelector((state: any) => state.theme.theme)

    const handleToggle = () => {
        dispatch(toggleTheme())
    }

    return (
        <Tooltip
            title={
                themeMode === 'dark'
                    ? 'Switch to Light Mode'
                    : 'Switch to Dark Mode'
            }
        >
            <Button
                shape="circle"
                type="text"
                size="large"
                onClick={handleToggle}
                icon={
                    themeMode === 'dark' ? (
                        <SunOutlined
                            style={{ color: '#fadb14', fontSize: 18 }}
                        />
                    ) : (
                        <MoonOutlined
                            style={{ color: '#1890ff', fontSize: 18 }}
                        />
                    )
                }
                style={{
                    transition: 'all 0.3s ease',
                    backgroundColor:
                        themeMode === 'dark' ? '#1f1f1f' : '#f5f5f5',
                    border: 'none',
                }}
            />
        </Tooltip>
    )
}

export default ThemeButton
