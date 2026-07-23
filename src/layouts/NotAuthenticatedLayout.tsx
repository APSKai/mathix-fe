import React from 'react'

import { Layout } from 'antd'

import { Link, Outlet } from 'react-router-dom'

import { PATHS } from '@/routers/path'

const { Content } = Layout

const NotAuthenticatedLayout: React.FC = () => {
    return (
        <Layout className="auth-layout">
            <Link className="auth-layout__brand" to={PATHS.EXAMS}>
                <img src="/logo.png" alt="Mathix" />
                <span>Mathix</span>
            </Link>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default NotAuthenticatedLayout
