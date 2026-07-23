import { useEffect, useMemo, useState } from 'react'

import { Avatar, Button, Drawer, Dropdown, Input, Menu, Space } from 'antd'

import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'
import type { AppDispatch } from '@/stores'
import { logoutAction } from '@/stores/auth/authAction'
import { logout } from '@/stores/auth/authSlice'

import './styles/SiteHeader.css'

const SiteHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const authUser = useSelector((state: any) => state.auth.user)
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )
    const user = isAuthenticated ? authUser : null
    const [mobileOpen, setMobileOpen] = useState(false)
    const [search, setSearch] = useState(
        new URLSearchParams(location.search).get('search') || ''
    )

    useEffect(() => {
        setSearch(new URLSearchParams(location.search).get('search') || '')
    }, [location.search])

    const navItems = useMemo(() => {
        const items = [
            { key: PATHS.EXAMS, label: 'Kho đề' },
            { key: PATHS.LEADERBOARD, label: 'Xếp hạng' },
        ]
        if (user)
            items.splice(
                1,
                0,
                { key: PATHS.GENERAL, label: 'Tổng quan' },
                { key: PATHS.HISTORY, label: 'Lịch sử' }
            )
        return items
    }, [user])

    const selectedKey =
        navItems.find((item) => location.pathname.startsWith(item.key))?.key ||
        ''
    const submitSearch = () => {
        const value = search.trim()
        navigate(
            value
                ? `${PATHS.EXAMS}?search=${encodeURIComponent(value)}`
                : PATHS.EXAMS
        )
        setMobileOpen(false)
    }

    const accountItems = [
        {
            key: 'profile',
            label: <Link to={PATHS.PROFILE}>Trang cá nhân</Link>,
        },
        ...(user?.role === 'admin'
            ? [
                  {
                      key: 'admin',
                      label: <Link to={PATHS.ADMIN_EXAMS}>Quản trị</Link>,
                  },
              ]
            : []),
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
        <header className="site-header">
            <div className="site-header__inner">
                <Link
                    to={user ? PATHS.GENERAL : PATHS.EXAMS}
                    className="site-brand"
                    onClick={() => setMobileOpen(false)}
                >
                    <img src="/logo.png" alt="Mathix" />
                    <span>Mathix</span>
                </Link>
                <div className="site-header__search">
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onPressEnter={submitSearch}
                        prefix={<SearchOutlined />}
                        placeholder="Tìm đề Toán, lớp, chủ đề..."
                        allowClear
                        onClear={() => {
                            setSearch('')
                            navigate(PATHS.EXAMS)
                        }}
                    />
                </div>
                <nav className="site-header__nav">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[selectedKey]}
                        items={navItems}
                        onClick={({ key }) => navigate(key)}
                    />
                </nav>
                <div className="site-header__account">
                    <Button
                        className="site-header__mobile-button"
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setMobileOpen(true)}
                        aria-label="Mở menu"
                    />
                    <Space size={12}>
                        {user ? (
                            <Dropdown
                                menu={{ items: accountItems }}
                                trigger={['click']}
                            >
                                <button
                                    className="account-trigger"
                                    type="button"
                                >
                                    <Avatar
                                        size={34}
                                        src={user.avatar}
                                        icon={<UserOutlined />}
                                    />
                                    <span>
                                        {user.username || user.fullName}
                                    </span>
                                </button>
                            </Dropdown>
                        ) : (
                            <Button
                                type="primary"
                                onClick={() => navigate(PATHS.LOGIN)}
                            >
                                Đăng nhập
                            </Button>
                        )}
                    </Space>
                </div>
            </div>
            <Drawer
                title="Điều hướng"
                placement="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
            >
                <div className="mobile-search">
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onPressEnter={submitSearch}
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm..."
                    />
                </div>
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    items={navItems}
                    onClick={({ key }) => {
                        navigate(key)
                        setMobileOpen(false)
                    }}
                />
                {user?.role === 'admin' && (
                    <Button
                        block
                        style={{ marginTop: 16 }}
                        onClick={() => {
                            navigate(PATHS.ADMIN_EXAMS)
                            setMobileOpen(false)
                        }}
                    >
                        Khu quản trị
                    </Button>
                )}
            </Drawer>
        </header>
    )
}

export default SiteHeader
