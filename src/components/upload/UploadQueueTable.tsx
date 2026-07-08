import { Button, Card, Empty, Progress, Space, Table, Tag, Typography } from 'antd'
import type { UploadFile } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { DeleteOutlined, FileOutlined } from '@ant-design/icons'

import { formatFileSize } from '@/components/upload/fileFormat'

const { Text } = Typography

interface UploadQueueTableProps {
    fileList: UploadFile[]
    onRemove: (uid: string) => void
}

const UploadQueueTable = ({ fileList, onRemove }: UploadQueueTableProps) => {
    const columns: ColumnsType<UploadFile> = [
        {
            title: 'File',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => (
                <Space>
                    <FileOutlined />
                    <Text ellipsis style={{ maxWidth: 360 }}>
                        {name}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Dung luong',
            dataIndex: 'size',
            key: 'size',
            width: 140,
            render: (size: number) => formatFileSize(size),
        },
        {
            title: 'Trang thai',
            key: 'status',
            width: 140,
            render: (_, record) => {
                if (record.status === 'uploading') {
                    return (
                        <Progress
                            percent={Math.round(record.percent || 0)}
                            size="small"
                        />
                    )
                }

                if (record.status === 'done') {
                    return <Tag color="green">Hoan tat</Tag>
                }

                if (record.status === 'error') {
                    return <Tag color="red">Loi</Tag>
                }

                return <Tag color="blue">San sang</Tag>
            },
        },
        {
            title: '',
            key: 'action',
            width: 72,
            align: 'center',
            render: (_, record) => (
                <Button
                    aria-label="Xoa khoi hang cho"
                    icon={<DeleteOutlined />}
                    type="text"
                    danger
                    onClick={() => onRemove(record.uid)}
                />
            ),
        },
    ]

    return (
        <Card title="Hang cho upload" className="upload-panel">
            <Table
                rowKey="uid"
                columns={columns}
                dataSource={fileList}
                pagination={false}
                locale={{
                    emptyText: (
                        <Empty description="Chua co file trong hang cho" />
                    ),
                }}
                scroll={{ x: 720 }}
            />
        </Card>
    )
}

export default UploadQueueTable
