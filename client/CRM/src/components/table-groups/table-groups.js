import React from "react"
import {Table} from "antd"


import styled from "@emotion/styled"

const Box = styled.div({
    '.log_h2': {},
    td: {
        paddingTop: '1px',
        paddingBottom: '4px'
    },
    'th, td': {
        padding: '16px 11px',
        whiteSpace: 'nowrap'
    }
})

const TableGroups = (
    {
        dataSource = [],
        columns = [],
        setParamFilrers,
        paramFilrers,
        update = () => {
        }
    }
) => {

    return (
        <Box>
            <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                scroll={{x: 0}}
                onChange={(pagination, filters) => {
                    let box = {...paramFilrers}
                    for (let key in filters) {
                        if (filters[key]) {
                            box[key] = filters[key]
                        } else if (key !== 'GROUP_NAME') {
                            box[key] = []
                        }
                    }
                    update(0, box)
                    setParamFilrers(box)
                }}
            />
        </Box>
    )
}

export default TableGroups