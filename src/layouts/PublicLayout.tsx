import React from 'react'

import { Layout } from 'antd'

import { Outlet } from 'react-router-dom'

import SiteHeader from '@/components/commons/SiteHeader'

const PublicLayout: React.FC = () => {
    return (
        <Layout className="user-layout">
            <SiteHeader />
            <Layout.Content className="user-layout__content">
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}

export default PublicLayout
