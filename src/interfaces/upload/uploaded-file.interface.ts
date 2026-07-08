export type UploadCategory =
    | 'Image'
    | 'Document'
    | 'Model'
    | 'Dataset'
    | 'Archive'

export type UploadedFileStatus = 'completed' | 'processing' | 'failed'

export type UploadStore = 'drive' | 'r2' | 's3' | 'telegram' | 'tiktok'

export interface UploadedFileRecord {
    id: string
    name: string
    type: string
    size: number
    category: UploadCategory
    owner: string
    uploadedAt: string
    status: UploadedFileStatus
    version: string
    storagePath: string
    checksum: string
    tags: string[]
    previewUrl?: string
    playlistUrl?: string
    raw?: BackendUploadedFile
}

export interface UploadPresetForm {
    store: UploadStore
    category: UploadCategory
    folder: string
    accessLevel: 'Private' | 'Internal' | 'Public'
    retentionDays: number
    description?: string
}

export interface BackendUploadedFile {
    id: string
    originName: string
    keyName?: string
    type: string
    path: string
    size: number
    mimeType: string
    extension: string
    storage: UploadStore
    storagePath?: string
    fileUrl?: string
    checksum?: string
    width?: number
    height?: number
    duration?: number
    createdBy?: {
        id?: string
        fullName?: string
        username?: string
        email?: string
    } | null
    metadata?: {
        format?: string
        quality?: string
        upload?: {
            category?: UploadCategory
            folder?: string
            accessLevel?: string
            retentionDays?: number
            description?: string
        }
        hls?: {
            jobId?: string
            segmentCount?: number
        }
    }
    createdAt: string
    updatedAt: string
}

export interface UploadFilesResponse {
    success: boolean
    data: BackendUploadedFile[]
    pagination?: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

export interface UploadResultResponse {
    success: boolean
    data: {
        file_id: string
        file_path: string
        store: UploadStore
        job_id: string
        file_url: string
        metadata: BackendUploadedFile
    }
}
