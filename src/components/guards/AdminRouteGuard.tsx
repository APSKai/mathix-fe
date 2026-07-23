import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { PATHS } from '@/routers/path'

const AdminRouteGuard = ({ children }: { children?: React.ReactNode }) => {
    const user = useSelector((state: any) => state.auth.user)
    if (user?.role !== 'admin') return <Navigate to={PATHS.GENERAL} replace />
    return children ? <>{children}</> : <Outlet />
}

export default AdminRouteGuard
