import { Button, Card, Input, Select, Space } from 'antd'

import { ReloadOutlined } from '@ant-design/icons'

import {
    UploadCategory,
    UploadedFileStatus,
} from '@/interfaces/upload/uploaded-file.interface'

interface FileFilterBarProps {
    keyword: string
    category?: UploadCategory
    status?: UploadedFileStatus
    onKeywordChange: (value: string) => void
    onCategoryChange: (value?: UploadCategory) => void
    onStatusChange: (value?: UploadedFileStatus) => void
    onReset: () => void
}

const FileFilterBar = ({
    keyword,
    category,
    status,
    onKeywordChange,
    onCategoryChange,
    onStatusChange,
    onReset,
}: FileFilterBarProps) => {
    return (
        <Card className="upload-filter-card">
            <Space size={12} wrap className="upload-filter-content">
                <Input.Search
                    allowClear
                    placeholder="Tim theo ten file, ma file, tag"
                    value={keyword}
                    onChange={(event) => onKeywordChange(event.target.value)}
                    style={{ width: 320 }}
                />
                <Select
                    allowClear
                    placeholder="Loai file"
                    value={category}
                    onChange={onCategoryChange}
                    style={{ width: 180 }}
                    options={[
                        { label: 'Image', value: 'Image' },
                        { label: 'Document', value: 'Document' },
                        { label: 'Model', value: 'Model' },
                        { label: 'Dataset', value: 'Dataset' },
                        { label: 'Archive', value: 'Archive' },
                    ]}
                />
                <Select
                    allowClear
                    placeholder="Trang thai"
                    value={status}
                    onChange={onStatusChange}
                    style={{ width: 180 }}
                    options={[
                        { label: 'Hoan tat', value: 'completed' },
                        { label: 'Dang xu ly', value: 'processing' },
                        { label: 'Loi', value: 'failed' },
                    ]}
                />
                <Button icon={<ReloadOutlined />} onClick={onReset}>
                    Dat lai
                </Button>
            </Space>
        </Card>
    )
}

export default FileFilterBar
