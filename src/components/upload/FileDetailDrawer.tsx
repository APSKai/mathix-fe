import { Descriptions, Drawer, Space, Tag, Typography } from 'antd'

import { formatFileSize } from '@/components/upload/fileFormat'
import { UploadedFileRecord } from '@/interfaces/upload/uploaded-file.interface'

const { Text } = Typography

interface FileDetailDrawerProps {
    file?: UploadedFileRecord
    open: boolean
    onClose: () => void
}

const statusColor: Record<UploadedFileRecord['status'], string> = {
    completed: 'green',
    processing: 'gold',
    failed: 'red',
}

const statusLabel: Record<UploadedFileRecord['status'], string> = {
    completed: 'Hoan tat',
    processing: 'Dang xu ly',
    failed: 'Loi',
}

const FileDetailDrawer = ({ file, open, onClose }: FileDetailDrawerProps) => {
    return (
        <Drawer
            title="Chi tiet file"
            open={open}
            onClose={onClose}
            width={520}
            destroyOnClose
        >
            {file && (
                <Descriptions column={1} bordered size="middle">
                    <Descriptions.Item label="Ten file">
                        <Text strong>{file.name}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ma file">{file.id}</Descriptions.Item>
                    <Descriptions.Item label="Loai">{file.category}</Descriptions.Item>
                    <Descriptions.Item label="Dinh dang">{file.type}</Descriptions.Item>
                    <Descriptions.Item label="Dung luong">
                        {formatFileSize(file.size)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phien ban">
                        {file.version}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trang thai">
                        <Tag color={statusColor[file.status]}>
                            {statusLabel[file.status]}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Nguoi upload">
                        {file.owner}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngay upload">
                        {file.uploadedAt}
                    </Descriptions.Item>
                    <Descriptions.Item label="Duong dan">
                        <Text copyable>{file.storagePath}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Checksum">
                        <Text copyable>{file.checksum}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tag">
                        <Space wrap>
                            {file.tags.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Drawer>
    )
}

export default FileDetailDrawer
