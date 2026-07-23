import { Avatar, Dropdown } from 'antd'

import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ThemeButton from '@/components/core/theme-button'
import { PATHS } from '@/routers/path'
import { AppDispatch } from '@/stores'
import { logoutAction } from '@/stores/auth/authAction'
import { logout } from '@/stores/auth/authSlice'

import './styles/Header.css'

const HeaderComponent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((store: any) => store.auth.user)
    const items = [
        {
            key: 'profile',
            label: <Link to={PATHS.PROFILE}>Trang cá nhân</Link>,
        },
        {
            key: 'logout',
            label: (
                <span
                    onClick={() =>
                        dispatch(logoutAction()).finally(() =>
                            dispatch(logout())
                        )
                    }
                >
                    Đăng xuất
                </span>
            ),
        },
    ]
    return (
        <div className="header-content">
            <ThemeButton />
            <div style={{ width: 12 }} />
            {user ? (
                <Dropdown menu={{ items }} trigger={['click']}>
                    <div className="user-info" style={{ cursor: 'pointer' }}>
                        <Avatar src={user.avatar} icon={<UserOutlined />} />
                        <span className="username">
                            {user.username || user.fullName}
                        </span>
                    </div>
                </Dropdown>
            ) : null}
        </div>
    )
}

export default HeaderComponent
