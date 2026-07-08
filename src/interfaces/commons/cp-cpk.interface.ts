export type CpCpkMeasureType = 'OffsetX' | 'OffsetY' | 'ChipHeight'

export type CpCpkSubgroup = 'Part' | 'Module' | 'Board'

export type CpCpkExportMode = 'Summary' | 'SummaryWithRawData'

export interface CpCpkFormFilter {
    measureType: CpCpkMeasureType
    subgroup: CpCpkSubgroup
    usl: number
    lsl: number
    applySpecLimits: boolean
}

export interface CpCpkPartSelection {
    moduleId?: number | null
    partId: string
    partNumber?: string | null
}

export interface CpCpkRequest {
    inspectStart: string
    inspectEnd: string
    machineKeyId: number
    modelId: string
    boardIds: string[]
    selectAllBoards?: boolean
    measureType: CpCpkMeasureType
    subgroup: CpCpkSubgroup
    partsOfInterest: CpCpkPartSelection[]
    usl?: number | null
    lsl?: number | null
    applySpecLimits: boolean
}

export interface CpCpkHistogramBin {
    from?: number
    to?: number
    label: string
    frequency?: number
    count?: number
    value?: number
}

export interface CpCpkSpecLines {
    usl?: number | null
    lsl?: number | null
}

export interface CpCpkHistogram {
    bins: CpCpkHistogramBin[]
    count?: number
    min?: number | null
    max?: number | null
    mean?: number | null
    avg?: number | null
    rawSampleCount: number
    displayedSampleCount: number
    zeroCount: number
    zeroRatio: number
    isZeroRemoved: boolean
    comment?: string | null
    specLines?: CpCpkSpecLines | null
}

export interface CpCpkStatisticsRow {
    groupType: string
    groupKey: string
    boardId?: string | null
    inspectSequence?: number | null
    moduleId?: number | null
    moduleBarcode?: string | null
    partId?: string | null
    partNumber?: string | null
    count: number
    min?: number | null
    max?: number | null
    mean?: number | null
    stdDev?: number | null
    usl?: number | null
    lsl?: number | null
    cpu?: number | null
    cpl?: number | null
    cp?: number | null
    cpk?: number | null
}

export interface CpCpkStatistics {
    overall: CpCpkStatisticsRow
    rows: CpCpkStatisticsRow[]
}

export interface CpCpkResponse {
    modelId: string
    measureType: CpCpkMeasureType
    subgroup: CpCpkSubgroup
    histogram: CpCpkHistogram
    statistics?: CpCpkStatistics
    comments: string[]
}
