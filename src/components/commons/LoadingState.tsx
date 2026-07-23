import { Flex, Spin, Typography } from 'antd'

interface LoadingStateProps {
    label?: string
    minHeight?: number
}

const LoadingState = ({
    label = 'Đang tải dữ liệu...',
    minHeight = 320,
}: LoadingStateProps) => (
    <Flex
        className="loading-state"
        vertical
        align="center"
        justify="center"
        gap={12}
        style={{ minHeight }}
    >
        <Spin size="large" />
        <Typography.Text type="secondary">{label}</Typography.Text>
    </Flex>
)

export default LoadingState
