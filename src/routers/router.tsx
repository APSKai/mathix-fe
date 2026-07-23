import { Navigate, Route } from 'react-router-dom'

import AdminRouteGuard from '@/components/guards/AdminRouteGuard'
import RouteGuard from '@/components/guards/RouteGuard'
import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import NotAuthenticatedLayout from '@/layouts/NotAuthenticatedLayout'
import PublicLayout from '@/layouts/PublicLayout'
import AdminExamPage from '@/pages/admin/AdminExamPage'
import AdminQuestionPage from '@/pages/admin/AdminQuestionPage'
import GeneralPage from '@/pages/commons/GeneralPage'
import LoginPage from '@/pages/commons/LoginPage'
import ProfilePage from '@/pages/commons/ProfilePage'
import RegisterPage from '@/pages/commons/RegisterPage'
import LeaderboardPage from '@/pages/leaderboard/LeaderboardPage'
import AttemptPage from '@/pages/quiz/AttemptPage'
import ExamCatalogPage from '@/pages/quiz/ExamCatalogPage'
import ExamDetailPage from '@/pages/quiz/ExamDetailPage'
import ExamOverviewPage from '@/pages/quiz/ExamOverviewPage'
import HistoryPage from '@/pages/quiz/HistoryPage'
import ResultPage from '@/pages/quiz/ResultPage'

import { PATHS } from './path'

const AppRouter = [
    <Route element={<PublicLayout />} key="public">
        <Route
            path={PATHS.HOME}
            element={<Navigate to={PATHS.EXAMS} replace />}
        />
        <Route path={PATHS.EXAMS} element={<ExamCatalogPage />} />
        <Route path="/exams/:slug" element={<ExamDetailPage />} />
        <Route
            path="/exams/:slug/:code/overview"
            element={<ExamOverviewPage />}
        />
        <Route path={PATHS.LEADERBOARD} element={<LeaderboardPage />} />
    </Route>,
    <Route element={<NotAuthenticatedLayout />} key="not-auth">
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />
    </Route>,
    <Route
        element={
            <RouteGuard>
                <MainLayout />
            </RouteGuard>
        }
        key="main"
    >
        <Route path={PATHS.GENERAL} element={<GeneralPage />} />
        <Route path={PATHS.PROFILE} element={<ProfilePage />} />
        <Route path={PATHS.ATTEMPT(':attemptId')} element={<AttemptPage />} />
        <Route path={PATHS.RESULT(':attemptId')} element={<ResultPage />} />
        <Route path={PATHS.HISTORY} element={<HistoryPage />} />
    </Route>,
    <Route
        element={
            <RouteGuard>
                <AdminRouteGuard>
                    <AdminLayout />
                </AdminRouteGuard>
            </RouteGuard>
        }
        key="admin"
    >
        <Route path={PATHS.ADMIN_QUESTIONS} element={<AdminQuestionPage />} />
        <Route path={PATHS.ADMIN_EXAMS} element={<AdminExamPage />} />
    </Route>,
]

export default AppRouter
