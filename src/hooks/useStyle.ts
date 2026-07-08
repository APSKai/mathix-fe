import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ css, token }: any) => {
    return {
        customTable: css`
            .ant-table {
                .ant-table-container {
                    .ant-table-body,
                    .ant-table-content {
                        scrollbar-width: thin !important;
                    }
                }
            }

            .ant-table-expanded-row {
                .ant-table {
                    .ant-table-container {
                        .ant-table-body,
                        .ant-table-content {
                            scrollbar-width: thin !important;
                        }
                    }
                }
            }
        `,
    }
})
