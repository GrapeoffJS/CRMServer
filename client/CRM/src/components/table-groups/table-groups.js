import React from "react"
import { Table } from "antd"


import styled from "@emotion/styled"

const TableGroups = ({ 
	dataSource = [], 
	columns = [], 
	setParamFilrers, 
	paramFilrers, 
	update = () => {} }) => {

	const Box = styled.div({
		// [mq[1]]: {
		// 	padding: '0 0',
		// },
		'.log_h2': {

		},
		td: {
			paddingTop: '1px',
			paddingBottom: '4px'
		},
		'th, td': {
			padding: '16px 11px',
			whiteSpace: 'nowrap'
		}
	})

	return (
		<Box>
			<Table
			    pagination={false}
			    dataSource={dataSource}
			    columns={columns}
			    scroll={{ x: 0 }}
			    onChange={(pagination, filters, sorter, extra) => {
			    	console.log(filters)
			    	let box = {...paramFilrers}
			    	for (let key in filters) {
			    		if (filters[key]) {
			    			console.log(filters[key])
			    			box[key] = filters[key]
			    		} else if (key != 'GROUP_NAME') {
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