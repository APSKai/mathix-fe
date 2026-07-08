import { Dayjs } from 'dayjs'

export type InspectorMode = 'aoi' | 'aoi-cci' | 'cci'
export type LanguageCode = 'en-US' | 'ko-KR' | 'ja-JP' | 'ja-JP-2' | 'zh-CN'

export interface InspectorPages {
    aoi: string[]
    cci: string[]
}

export interface WorkHour {
    key: string
    shift: string
    startTime: string
    endTime: string
    workHour: number
    lastUpdated?: string
    updatedBy?: string
}

export interface GeneralSettings {
    inspectorMode: InspectorMode
    inspectorPages: InspectorPages
    workHours: WorkHour[]
    language: LanguageCode
    unit: string
    captureFolder: string
    options: string[]
}

export interface WorkHourFormValues {
    shift: string
    timeRange: [Dayjs, Dayjs]
}
