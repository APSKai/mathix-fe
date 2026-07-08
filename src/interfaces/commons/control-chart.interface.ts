export type ChartPanelKey = 'ratio' | 'count'

export type ControlChartDataType = 'DefectRatio' | 'DefectCount'

export type ControlChartPoint = {
    label: string
    boardIds: string[]
    inspectStart: string
    inspectEnd: string
    boardCount: number
    defectBoardCount: number
    defectCount: number
    value: number
    ucl: number
    cl: number
    lcl: number
    violatedRules: number[]
}

export type ControlChartData = {
    chartType: string
    dataType: ControlChartDataType
    autoCalculateLimits: boolean
    subGroup: number
    summary: {
        totalBoards: number
        totalSubGroups: number
        totalDefectBoards: number
        totalDefects: number
        averageDefectRatio: number
        averageDefectCountPerBoard: number
    }
    limits: {
        ucl: number
        cl: number
        lcl: number
        isAutoCalculated: boolean
    }
    points: ControlChartPoint[]
}

export type ChartFilterState = {
    autoCalculateLimits: boolean
    subGroup: number
    ucl: number
    lcl: number
    rules: number[]
}

export type ChartPanelConfig = {
    key: ChartPanelKey
    dataType: ControlChartDataType
    title: string
    chartTitle: string
    yAxisTitle: string
    isPercent: boolean
    inputStep: number
    inputMax?: number
}
