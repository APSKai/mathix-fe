import { Card, Form, Input, InputNumber, Select } from 'antd'

import { UploadPresetForm } from '@/interfaces/upload/uploaded-file.interface'

interface UploadConfigPanelProps {
    value: UploadPresetForm
    onChange: (value: UploadPresetForm) => void
}

const categoryOptions = ['Image', 'Document', 'Model', 'Dataset', 'Archive'].map(
    (value) => ({ label: value, value })
)

const storeOptions = ['tiktok', 'telegram', 'r2', 's3', 'drive'].map(
    (value) => ({ label: value, value })
)

const UploadConfigPanel = ({ value, onChange }: UploadConfigPanelProps) => {
    return (
        <Card title="Thong tin luu tru" className="upload-panel">
            <Form
                layout="vertical"
                initialValues={value}
                onValuesChange={(_, values) => onChange(values)}
            >
                <Form.Item
                    label="Storage"
                    name="store"
                    rules={[{ required: true, message: 'Vui long chon storage' }]}
                >
                    <Select options={storeOptions} />
                </Form.Item>
                <Form.Item
                    label="Loai file"
                    name="category"
                    rules={[{ required: true, message: 'Vui long chon loai file' }]}
                >
                    <Select options={categoryOptions} />
                </Form.Item>
                <Form.Item
                    label="Thu muc luu tru"
                    name="folder"
                    rules={[
                        {
                            required: true,
                            message: 'Vui long nhap thu muc luu tru',
                        },
                    ]}
                >
                    <Input placeholder="/datasets/inspection" />
                </Form.Item>
                <Form.Item label="Quyen truy cap" name="accessLevel">
                    <Select
                        options={[
                            { label: 'Private', value: 'Private' },
                            { label: 'Internal', value: 'Internal' },
                            { label: 'Public', value: 'Public' },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Thoi han luu (ngay)" name="retentionDays">
                    <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Ghi chu" name="description">
                    <Input.TextArea
                        rows={4}
                        placeholder="Mo ta ngan ve lo file hoac nguon du lieu"
                    />
                </Form.Item>
            </Form>
        </Card>
    )
}

export default UploadConfigPanel
