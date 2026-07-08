import { Card, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'

import { InboxOutlined } from '@ant-design/icons'

interface UploadDropZoneProps {
    fileList: UploadFile[]
    onChange: (fileList: UploadFile[]) => void
}

const UploadDropZone = ({ fileList, onChange }: UploadDropZoneProps) => {
    const uploadProps: UploadProps = {
        multiple: true,
        fileList,
        beforeUpload: () => false,
        onChange: ({ fileList: nextFileList }) => onChange(nextFileList),
    }

    return (
        <Card title="Chon file upload" className="upload-panel">
            <Upload.Dragger {...uploadProps} className="upload-drop-zone">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Keo tha file vao day hoac bam de chon file
                </p>
                <p className="ant-upload-hint">
                    Ho tro upload nhieu file. File se duoc giu trong hang cho
                    truoc khi gui len he thong.
                </p>
            </Upload.Dragger>
        </Card>
    )
}

export default UploadDropZone
