import React, { useMemo } from 'react'

import { Menu, Tooltip } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'

interface NavBarProps {
    collapsed: boolean
}

const NavBar: React.FC<NavBarProps> = ({ collapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const role = useSelector((state: any) => state.auth.user?.role)
    const items = useMemo(() => {
        const base =
            role === 'admin'
                ? [
                      {
                          key: PATHS.ADMIN_QUESTIONS,
                          icon: <EditOutlined />,
                          label: 'Ngân hàng câu hỏi',
                      },
                      {
                          key: PATHS.ADMIN_EXAMS,
                          icon: <EditOutlined />,
                          label: 'Nhóm đề và mã đề',
                      },
                  ]
                : []
        return base.map((item) => ({
            ...item,
            label: collapsed ? (
                <Tooltip title={item.label}>
                    <span>{item.label}</span>
                </Tooltip>
            ) : (
                item.label
            ),
        }))
    }, [collapsed, role])

    const selected = location.pathname.startsWith('/admin/questions')
        ? PATHS.ADMIN_QUESTIONS
        : location.pathname.startsWith('/admin/exams')
          ? PATHS.ADMIN_EXAMS
          : location.pathname
    return (
        <Menu
            mode="vertical"
            selectedKeys={[selected]}
            style={{ borderRight: 0, height: '100%' }}
            onClick={({ key }) => navigate(key)}
            items={items as any}
        />
    )
}

export default NavBar
