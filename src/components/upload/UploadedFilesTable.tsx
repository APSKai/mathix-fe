import { Button, Card, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import {
    DeleteOutlined,
    DownloadOutlined,
    EyeOutlined,
    FileOutlined,
} from '@ant-design/icons'

import { formatFileSize } from '@/components/upload/fileFormat'
import { UploadedFileRecord } from '@/interfaces/upload/uploaded-file.interface'

const { Text } = Typography

interface UploadedFilesTableProps {
    files: UploadedFileRecord[]
    loading?: boolean
    onViewDetail: (file: UploadedFileRecord) => void
    onDelete: (fileId: string) => void
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

const UploadedFilesTable = ({
    files,
    loading,
    onViewDetail,
    onDelete,
}: UploadedFilesTableProps) => {
    const columns: ColumnsType<UploadedFileRecord> = [
        {
            title: 'File',
            dataIndex: 'name',
            key: 'name',
            width: 320,
            render: (name: string, record) => (
                <Space>
                    <FileOutlined />
                    <div className="uploaded-file-name">
                        <Text ellipsis>{name}</Text>
                        <Text type="secondary">{record.id}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Loai',
            dataIndex: 'category',
            key: 'category',
            width: 130,
            render: (category: string) => <Tag>{category}</Tag>,
        },
        {
            title: 'Dung luong',
            dataIndex: 'size',
            key: 'size',
            width: 130,
            render: (size: number) => formatFileSize(size),
        },
        {
            title: 'Nguoi upload',
            dataIndex: 'owner',
            key: 'owner',
            width: 180,
        },
        {
            title: 'Ngay upload',
            dataIndex: 'uploadedAt',
            key: 'uploadedAt',
            width: 190,
        },
        {
            title: 'Trang thai',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            render: (status: UploadedFileRecord['status']) => (
                <Tag color={statusColor[status]}>{statusLabel[status]}</Tag>
            ),
        },
        {
            title: '',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <Space size={4}>
                    <Tooltip title="Xem chi tiet">
                        <Button
                            icon={<EyeOutlined />}
                            type="text"
                            onClick={() => onViewDetail(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Tai xuong">
                        <Button
                            icon={<DownloadOutlined />}
                            type="text"
                            disabled={record.status !== 'completed'}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Xoa file nay?"
                        okText="Xoa"
                        cancelText="Huy"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Tooltip title="Xoa">
                            <Button icon={<DeleteOutlined />} type="text" danger />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <Card title="Danh sach file da upload" className="upload-panel">
            <Table
                rowKey="id"
                columns={columns}
                dataSource={files}
                loading={loading}
                pagination={{ pageSize: 8, showSizeChanger: false }}
                scroll={{ x: 1220 }}
            />
        </Card>
    )
}

export default UploadedFilesTable
