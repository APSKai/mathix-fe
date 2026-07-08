import { UPLOAD_API } from '@/constants/api'
import { CREDENTIALS } from '@/constants/storage'
import {
    UploadFilesResponse,
    UploadPresetForm,
    UploadResultResponse,
} from '@/interfaces/upload/uploaded-file.interface'
import http from '@/services/http'
import { getLocalStorage } from '@/utils/storage'

export type UploadStreamEvent =
    | {
          type: 'info'
          message?: string
          fileName?: string
          quality?: string
          duration?: number
          format?: string
          size?: number
          store?: string
      }
    | { type: 'progress'; percent: number; message?: string }
    | ({ type: 'result' } & UploadResultResponse)
    | { type: 'error'; message: string }

const getApiUrl = (path: string) => {
    const baseUrl = String(import.meta.env.VITE_APP_ROOT_API || '').replace(
        /\/+$/,
        ''
    )
    return `${baseUrl}${path}`
}

const parseStreamLine = (line: string): UploadStreamEvent | null => {
    const value = line.trim()
    if (!value) return null

    return JSON.parse(value) as UploadStreamEvent
}

export class UploadService {
    async listFiles(): Promise<UploadFilesResponse> {
        return await http.get(UPLOAD_API.FILES)
    }

    async deleteFile(fileId: string): Promise<{ success: boolean }> {
        return await http.delete(UPLOAD_API.FILE_DETAIL(fileId))
    }

    async uploadFile(
        file: File,
        preset: UploadPresetForm,
        onEvent?: (event: UploadStreamEvent) => void
    ): Promise<UploadResultResponse> {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('store', preset.store)
        formData.append('category', preset.category)
        formData.append('folder', preset.folder)
        formData.append('accessLevel', preset.accessLevel)
        formData.append('retentionDays', String(preset.retentionDays))

        if (preset.description) {
            formData.append('description', preset.description)
        }

        const accessToken = getLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
        const response = await fetch(getApiUrl(UPLOAD_API.UPLOAD), {
            method: 'POST',
            headers: accessToken
                ? {
                      Authorization: `Bearer ${accessToken}`,
                  }
                : undefined,
            body: formData,
        })

        if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`)
        }

        if (!response.body) {
            throw new Error('Upload response stream is not available')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let uploadResult: UploadResultResponse | null = null

        while (true) {
            const { done, value } = await reader.read()
            buffer += decoder.decode(value || new Uint8Array(), {
                stream: !done,
            })

            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
                const event = parseStreamLine(line)
                if (!event) continue

                onEvent?.(event)

                if (event.type === 'error') {
                    throw new Error(event.message)
                }

                if (event.type === 'result') {
                    uploadResult = {
                        success: event.success,
                        data: event.data,
                    }
                }
            }

            if (done) break
        }

        const finalEvent = parseStreamLine(buffer)
        if (finalEvent) {
            onEvent?.(finalEvent)

            if (finalEvent.type === 'error') {
                throw new Error(finalEvent.message)
            }

            if (finalEvent.type === 'result') {
                uploadResult = {
                    success: finalEvent.success,
                    data: finalEvent.data,
                }
            }
        }

        if (!uploadResult) {
            throw new Error('Upload finished without result payload')
        }

        return uploadResult
    }
}

export default new UploadService()
