export type ChartType = 'Xbar-S' | 'Xbar-R'

export type ObjectType = 'Board' | 'Module'

export interface FormFilter {
    objectType: ObjectType
    chartType: ChartType
    dataType: string
    sampling: number
    usl: number
    lsl: number
    rules: number[]
}

export interface SeriesLimits {
    ucl?: number
    cl?: number
    lcl?: number
}

export interface SeriesPoint {
    label: string
    inspectStart: string
    inspectEnd: string
    boardId: string
    moduleId?: number | null
    moduleBarcode?: string | null
    sampleSize: number
    value: number
    violatedRules: number[]
}

export interface SeriesData {
    name: string
    bins: SeriesPoint[]
    limits: SeriesLimits
}

export interface HistogramBin {
    label: string
    value: number
}

export interface HistogramData {
    bins: HistogramBin[]
    zeroRatio: number
    isZeroRemoved: boolean
    comment?: string | null
}

export interface XbarStatistics {
    cp?: number
    cpu?: number
    cpl?: number
    cpk?: number
    mean?: number
    stdDev?: number
}

export interface XbarResponse {
    chartType: ChartType
    dataType: string
    objectType: ObjectType
    sampling: number
    subgroupSize: number
    histogram: HistogramData
    xbarChart: SeriesData
    variationChart: SeriesData
    statistics: XbarStatistics
    comments: string[]
}

export interface ChartFormula {
    ucl: string
    cl: string
    lcl: string
}

export interface ChartDataPoint {
    label: string
    value: number
    boardId: string
    boardInfoLabel: string
    boardInfoValue: string
    inspectTimeRange: string
    violatedRules: number[]
}

export interface ChartData {
    bins: ChartDataPoint[]
    limits: SeriesLimits
}
