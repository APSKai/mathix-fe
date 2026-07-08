import { Card, Col, Row, Statistic } from 'antd'
import type { UploadFile } from 'antd'

import {
    CloudUploadOutlined,
    DatabaseOutlined,
    FolderOutlined,
} from '@ant-design/icons'

import { formatFileSize } from '@/components/upload/fileFormat'
import { UploadPresetForm } from '@/interfaces/upload/uploaded-file.interface'

interface UploadSummaryProps {
    fileList: UploadFile[]
    preset: UploadPresetForm
}

const UploadSummary = ({ fileList, preset }: UploadSummaryProps) => {
    const totalSize = fileList.reduce((sum, file) => sum + (file.size || 0), 0)

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="File trong hang cho"
                        value={fileList.length}
                        prefix={<CloudUploadOutlined />}
                    />
                </Card>
            </Col>
            <Col xs={24} md={8}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="Tong dung luong"
                        value={formatFileSize(totalSize)}
                        prefix={<DatabaseOutlined />}
                    />
                </Card>
            </Col>
            <Col xs={24} md={8}>
                <Card className="upload-stat-card">
                    <Statistic
                        title="Thu muc dich"
                        value={preset.folder}
                        prefix={<FolderOutlined />}
                        valueStyle={{ fontSize: 16 }}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default UploadSummary
