import { Navigate, Route } from 'react-router-dom'

import RouteGuard from '@/components/guards/RouteGuard'
import MainLayout from '@/layouts/MainLayout'
import NotAuthenticatedLayout from '@/layouts/NotAuthenticatedLayout'
import GeneralPage from '@/pages/commons/GeneralPage'
import LoginPage from '@/pages/commons/LoginPage'
import ProfilePage from '@/pages/commons/ProfilePage'
import FileManagementPage from '@/pages/upload/FileManagementPage'
import UploadPage from '@/pages/upload/UploadPage'

import { PATHS } from './path'

const AppRouter = [
    <Route element={<NotAuthenticatedLayout />} key="not-auth">
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
    </Route>,
    <Route
        element={
            <RouteGuard>
                <MainLayout />
            </RouteGuard>
        }
        key="main"
    >
        <Route path="/" element={<Navigate to={PATHS.GENERAL} replace />} />
        <Route path={PATHS.GENERAL} element={<GeneralPage />} />
        <Route path={PATHS.UPLOAD} element={<UploadPage />} />
        <Route path={PATHS.FILE_MANAGEMENT} element={<FileManagementPage />} />
        <Route path={PATHS.PROFILE} element={<ProfilePage />} />
    </Route>,
]

export default AppRouter
