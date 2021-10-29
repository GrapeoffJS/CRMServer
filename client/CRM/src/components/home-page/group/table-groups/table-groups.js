import React from "react"
import {Table} from "antd"

import styled from "@emotion/styled"

const TableGroups = ({ dataSource }) => {


	const Box = styled.div({
		'th, td': {
			padding: '16px 11px'
		}
	})

	return (
		<Box>
			<Table
			    pagination={false}
			    dataSource={dataSource}
			    columns={'columns'}
			    scroll={{ x: 0 }}
			    onChange={(pagination, filters, sorter, extra) => {
			    }}
			/>
		</Box>
	)
}

export default TableGroups