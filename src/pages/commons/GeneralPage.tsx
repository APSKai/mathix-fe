import {CSSProperties} from 'react'

import {Card, Col, Divider, Row, Typography} from 'antd'
import {useNavigate} from 'react-router-dom'

const {Text} = Typography

const GeneralPage = () => {
    const navigate = useNavigate()

    const tileStyle: CSSProperties = {
        height: 150,
        width: 150,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    }

    return (
        <div
            style={{
                width: '100%',
                padding: 40,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            Chung
        </div>
    )
}

export default GeneralPage
