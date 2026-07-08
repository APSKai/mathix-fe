import { useEffect, useMemo, useState } from 'react'

import { Button, Space, Typography, notification } from 'antd'

import { CloudUploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import FileDetailDrawer from '@/components/upload/FileDetailDrawer'
import FileFilterBar from '@/components/upload/FileFilterBar'
import FileStatsBar from '@/components/upload/FileStatsBar'
import UploadedFilesTable from '@/components/upload/UploadedFilesTable'
import {
    BackendUploadedFile,
    UploadCategory,
    UploadedFileRecord,
    UploadedFileStatus,
} from '@/interfaces/upload/uploaded-file.interface'
import { PATHS } from '@/routers/path'
import uploadService from '@/services/upload'

import '../styles/upload.css'

const { Title, Text } = Typography

const resolveCategory = (file: BackendUploadedFile): UploadCategory => {
    const category = file.metadata?.upload?.category
    if (category) return category

    if (file.type === 'image') return 'Image'
    if (file.type === 'document') return 'Document'
    if (file.type === 'archive') return 'Archive'
    if (file.type === 'video') return 'Model'

    return 'Dataset'
}

const mapUploadedFile = (file: BackendUploadedFile): UploadedFileRecord => {
    const owner =
        file.createdBy?.fullName ||
        file.createdBy?.username ||
        file.createdBy?.email ||
        'Unknown'
    const type = (file.extension || file.mimeType || file.type || 'file')
        .replace('.', '')
        .toUpperCase()
    const tags = [
        file.storage,
        file.metadata?.quality,
        file.metadata?.upload?.accessLevel,
    ].filter(Boolean) as string[]

    return {
        id: file.id,
        name: file.originName,
        type,
        size: file.size,
        category: resolveCategory(file),
        owner,
        uploadedAt: file.createdAt,
        status: 'completed',
        version: file.metadata?.quality || 'v1',
        storagePath: file.storagePath || file.path,
        checksum: file.checksum || file.keyName || '',
        tags,
        previewUrl: file.fileUrl,
        raw: file,
    }
}

const FileManagementPage = () => {
    const navigate = useNavigate()
    const [files, setFiles] = useState<UploadedFileRecord[]>([])
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState<UploadCategory>()
    const [status, setStatus] = useState<UploadedFileStatus>()
    const [selectedFile, setSelectedFile] = useState<UploadedFileRecord>()
    const [api, contextHolder] = notification.useNotification()

    const fetchFiles = async () => {
        setLoading(true)
        try {
            const response = await uploadService.listFiles()
            setFiles((response.data || []).map(mapUploadedFile))
        } catch (error: any) {
            api.error({
                message: 'Khong the tai danh sach file',
                description: error?.message,
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFiles()
    }, [])

    const filteredFiles = useMemo(() => {
        const normalizedKeyword = keyword.trim().toLowerCase()

        return files.filter((file) => {
            const matchesKeyword =
                !normalizedKeyword ||
                [file.id, file.name, file.owner, file.storagePath, ...file.tags]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedKeyword)
            const matchesCategory = !category || file.category === category
            const matchesStatus = !status || file.status === status

            return matchesKeyword && matchesCategory && matchesStatus
        })
    }, [category, files, keyword, status])

    const handleResetFilter = () => {
        setKeyword('')
        setCategory(undefined)
        setStatus(undefined)
    }

    const handleDeleteFile = async (fileId: string) => {
        try {
            await uploadService.deleteFile(fileId)
            setFiles((current) => current.filter((file) => file.id !== fileId))
            if (selectedFile?.id === fileId) {
                setSelectedFile(undefined)
            }
            api.success({ message: 'Da xoa file khoi danh sach' })
        } catch (error: any) {
            api.error({
                message: 'Xoa file that bai',
                description: error?.message,
            })
        }
    }

    return (
        <div className="upload-page">
            {contextHolder}
            <div className="upload-page-header">
                <div>
                    <Title level={3}>Quan ly file da upload</Title>
                    <Text type="secondary">
                        Theo doi trang thai, tim kiem va thao tac voi cac file
                        da duoc upload.
                    </Text>
                </div>
                <Space wrap>
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={() => navigate(PATHS.UPLOAD)}
                    >
                        Upload file
                    </Button>
                </Space>
            </div>

            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <FileStatsBar files={files} />
                <FileFilterBar
                    keyword={keyword}
                    category={category}
                    status={status}
                    onKeywordChange={setKeyword}
                    onCategoryChange={setCategory}
                    onStatusChange={setStatus}
                    onReset={handleResetFilter}
                />
                <UploadedFilesTable
                    files={filteredFiles}
                    loading={loading}
                    onViewDetail={setSelectedFile}
                    onDelete={handleDeleteFile}
                />
            </Space>

            <FileDetailDrawer
                file={selectedFile}
                open={Boolean(selectedFile)}
                onClose={() => setSelectedFile(undefined)}
            />
        </div>
    )
}

export default FileManagementPage
