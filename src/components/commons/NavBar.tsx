import React, {useMemo} from 'react'

import {Menu, Tooltip} from 'antd'

import {
    AppstoreOutlined,
    CloudUploadOutlined,
    FolderOpenOutlined,
} from '@ant-design/icons'
import {useLocation, useNavigate} from 'react-router-dom'
import {PATHS} from '@/routers/path'

interface NavBarProps {
    collapsed: boolean
}

const NavBar: React.FC<NavBarProps> = ({collapsed}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const items = useMemo(() => {
        return [
            {
                key: PATHS.GENERAL,
                icon: <AppstoreOutlined/>,
                label: collapsed ? (
                    <Tooltip title={'Chung'}>
                        <span>{'Chung'}</span>
                    </Tooltip>
                ) : (
                    'Chung'
                ),
            },
            {
                key: PATHS.UPLOAD,
                icon: <CloudUploadOutlined/>,
                label: collapsed ? (
                    <Tooltip title={'Upload'}>
                        <span>{'Upload'}</span>
                    </Tooltip>
                ) : (
                    'Upload'
                ),
            },
            {
                key: PATHS.FILE_MANAGEMENT,
                icon: <FolderOpenOutlined/>,
                label: collapsed ? (
                    <Tooltip title={'Quan ly file'}>
                        <span>{'Quan ly file'}</span>
                    </Tooltip>
                ) : (
                    'Quan ly file'
                ),
            },
        ].filter(Boolean)
    }, [collapsed])

    return (
        <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            style={{
                borderRight: 0,
                height: '100%',
                transition: 'all 0.3s ease',
            }}
            onClick={({key}) => navigate(key)}
            // @ts-ignore
            items={items}
        />
    )
}

export default NavBar
