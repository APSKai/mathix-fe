import React, { useState } from 'react'

import { Button, Layout } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router-dom'

import HeaderComponent from '@/components/commons/HeaderComponent'
import NavBar from '@/components/commons/NavBar'

const { Header, Sider, Content } = Layout

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="admin-layout__header">
                <div className="admin-layout__brand">
                    <img src="/logo.png" alt="Mathix" />
                    <span>Khu quản trị</span>
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
                />
                <HeaderComponent />
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                    width={240}
                    className="admin-layout__sider"
                >
                    <NavBar collapsed={collapsed} />
                </Sider>
                <Content className="admin-layout__content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
