import { Avatar, Button, Dropdown } from 'antd'

import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import ThemeButton from '@/components/core/theme-button'
import { PATHS } from '@/routers/path'
import { logout } from '@/stores/auth/authSlice'

import './styles/Header.css'

const HeaderComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(
        (store: any) => store.auth.isAuthenticated
    )
    const user = useSelector((store: any) => store.auth.user)

    const items = [
        {
            key: 'profile',
            label: <Link to={PATHS.PROFILE}>Profile</Link>,
        },
        {
            key: 'logout',
            label: (
                <div
                    onClick={() => {
                        dispatch(logout())
                    }}
                >
                    Log out
                </div>
            ),
        },
    ]

    return (
        <div className="header-content">
            <ThemeButton />
            <div style={{ width: 12 }}></div>
            {isAuthenticated ? (
                <Dropdown menu={{ items }} trigger={['click']}>
                    <div className="user-info">
                        <Avatar icon={<UserOutlined />} />
                        <span className="username">{user?.full_name}</span>
                    </div>
                </Dropdown>
            ) : (
                <Button onClick={() => navigate(PATHS.LOGIN)} type="primary">
                    Sign In
                </Button>
            )}
        </div>
    )
}

export default HeaderComponent
