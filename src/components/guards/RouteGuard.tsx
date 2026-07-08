import React from 'react'

import { notification } from 'antd'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { PATHS } from '@/routers/path'

const RouteGuard = ({ children }: any) => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )
    const location = useLocation()

    if (!isAuthenticated) {
        notification.error({
            message: 'Unauthorized',
            description: 'Please sign in to continue.',
        })
        return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default RouteGuard
