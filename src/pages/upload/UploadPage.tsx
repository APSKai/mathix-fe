import { useState } from 'react'

import { Button, Col, Row, Space, Typography, notification } from 'antd'
import type { UploadFile } from 'antd'

import { CloudUploadOutlined, ClearOutlined } from '@ant-design/icons'

import UploadConfigPanel from '@/components/upload/UploadConfigPanel'
import UploadDropZone from '@/components/upload/UploadDropZone'
import UploadQueueTable from '@/components/upload/UploadQueueTable'
import UploadSummary from '@/components/upload/UploadSummary'
import { UploadPresetForm } from '@/interfaces/upload/uploaded-file.interface'
import uploadService, { UploadStreamEvent } from '@/services/upload'

import '../styles/upload.css'

const { Title, Text } = Typography

const defaultPreset: UploadPresetForm = {
    store: 'r2',
    category: 'Dataset',
    folder: '/datasets/inspection',
    accessLevel: 'Internal',
    retentionDays: 365,
    description: '',
}

const UploadPage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [preset, setPreset] = useState<UploadPresetForm>(defaultPreset)
    const [uploading, setUploading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    const handleRemoveFile = (uid: string) => {
        setFileList((current) => current.filter((file) => file.uid !== uid))
    }

    const updateUploadFile = (uid: string, patch: Partial<UploadFile>) => {
        setFileList((current) =>
            current.map((file) =>
                file.uid === uid
                    ? {
                          ...file,
                          ...patch,
                      }
                    : file
            )
        )
    }

    const handleUploadEvent = (uid: string, event: UploadStreamEvent) => {
        if (event.type === 'progress') {
            updateUploadFile(uid, {
                status: 'uploading',
                percent: Math.round(event.percent || 0),
            })
        }

        if (event.type === 'result') {
            updateUploadFile(uid, {
                status: 'done',
                percent: 100,
            })
        }
    }

    const handleSubmitUpload = async () => {
        if (!fileList.length) {
            api.warning({ message: 'Vui long chon it nhat mot file' })
            return
        }

        setUploading(true)

        try {
            for (const item of fileList) {
                const file = item.originFileObj as File | undefined
                if (!file) continue

                updateUploadFile(item.uid, {
                    status: 'uploading',
                    percent: 0,
                })

                try {
                    await uploadService.uploadFile(file, preset, (event) =>
                        handleUploadEvent(item.uid, event)
                    )
                } catch (error) {
                    updateUploadFile(item.uid, { status: 'error' })
                    throw error
                }
            }

            api.success({
                message: 'Upload thanh cong',
                description: `${fileList.length} file da duoc gui len backend.`,
            })
            setFileList([])
        } catch (error: any) {
            api.error({
                message: 'Upload that bai',
                description: error?.message || 'Khong the upload file.',
            })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="upload-page">
            {contextHolder}
            <div className="upload-page-header">
                <div>
                    <Title level={3}>Upload file</Title>
                    <Text type="secondary">
                        Chuan bi file, cau hinh thu muc luu tru va dua vao
                        hang cho upload.
                    </Text>
                </div>
                <Space wrap>
                    <Button
                        icon={<ClearOutlined />}
                        onClick={() => setFileList([])}
                        disabled={!fileList.length || uploading}
                    >
                        Xoa hang cho
                    </Button>
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={handleSubmitUpload}
                        loading={uploading}
                    >
                        Upload
                    </Button>
                </Space>
            </div>

            <UploadSummary fileList={fileList} preset={preset} />

            <Row gutter={[16, 16]} className="upload-content-row">
                <Col xs={24} xl={15}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        <UploadDropZone
                            fileList={fileList}
                            onChange={setFileList}
                        />
                        <UploadQueueTable
                            fileList={fileList}
                            onRemove={handleRemoveFile}
                        />
                    </Space>
                </Col>
                <Col xs={24} xl={9}>
                    <UploadConfigPanel value={preset} onChange={setPreset} />
                </Col>
            </Row>
        </div>
    )
}

export default UploadPage
