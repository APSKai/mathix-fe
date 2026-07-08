import { Card, Col, Row, Statistic } from 'antd'

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    DatabaseOutlined,
} from '@ant-design/icons'

import { formatFileSize } from '@/components/upload/fileFormat'
import { UploadedFileRecord } from '@/interfaces/upload/uploaded-file.interface'

interface FileStatsBarProps {
    files: UploadedFileRecord[]
}

const FileStatsBar = ({ files }: FileStatsBarProps) => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0)
    const completed = files.filter((file) => file.status === 'completed').length
    const processing = files.filter((file) => file.status === 'processing').length
    const failed = files.filter((file) => file.status === 'failed').length

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="Tong file"
                        value={files.length}
                        prefix={<DatabaseOutlined />}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="Hoan tat"
                        value={completed}
                        prefix={<CheckCircleOutlined />}
                        valueStyle={{ color: '#389e0d' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="Dang xu ly"
                        value={processing}
                        prefix={<ClockCircleOutlined />}
                        valueStyle={{ color: '#d48806' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="Loi"
                        value={`${failed} / ${formatFileSize(totalSize)}`}
                        prefix={<CloseCircleOutlined />}
                        valueStyle={{ color: '#cf1322', fontSize: 22 }}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default FileStatsBar
