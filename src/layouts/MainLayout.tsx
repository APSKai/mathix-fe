import React, { useState } from 'react'

import { Button, Layout } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import HeaderComponent from '@/components/commons/HeaderComponent'
import NavBar from '@/components/commons/NavBar'
import { THEMES } from '@/constants/theme'

const { Header, Sider, Content } = Layout

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true)
    const themeMode = useSelector((state: any) => state.theme.theme)

    return (
        <Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 64,
                    backgroundColor:
                        themeMode === THEMES.DARK ? '#282828' : '#EDEDED',
                    padding: '0 20px',
                    position: 'fixed',
                    width: '100%',
                    zIndex: 6,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div className="logo">
                        <img src="/logo.png" alt="Logo" style={{ height: 36, width: 'auto' }} />
                    </div>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '18px',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            marginRight: 8,
                            transition: 'background 0.3s ease',
                        }}
                    />
                    <HeaderComponent />
                </div>
            </Header>

            <Layout style={{ marginTop: 64 }}>
                {' '}
                <Sider
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                    width={220}
                    style={{
                        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                        transition: 'width 0.3s ease-in-out',
                        position: 'fixed',
                        height: 'calc(100vh - 64px)',
                        overflowY: 'auto',
                        top: 64,
                        zIndex: 1,
                    }}
                >
                    <NavBar collapsed={collapsed} />
                </Sider>
                <Content
                    style={{
                        marginLeft: collapsed ? 80 : 220,
                        padding: '24px',
                        minHeight: 'calc(100vh - 64px)',
                        transition: 'margin-left 0.3s ease-in-out',
                        overflowY: 'auto',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout
