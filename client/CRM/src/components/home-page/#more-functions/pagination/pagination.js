import React from "react"

import { Pagination } from "antd"
import "antd/dist/antd.css"
import getLimit from "./../../#more-functions/getLimit/getLimit.js"

// Style
import styled from "@emotion/styled"

const PaginationG = ({offset, setOffset, getItem, count}) => {

	const PaginationI = styled.div({
		margin: '3px 3px 20px 3px',
		'.ant-pagination-item-link': {
			height: '34px'
		}
	})

	console.log(offset / getLimit + 1)

	return (
		<PaginationI>
			<Pagination 
				defaultPageSize={getLimit}
				defaultCurrent={offset / getLimit + 1} 
				total={count} 
				showSizeChanger={false} 
				onChange={(i) => {
					setOffset((i-1) * getLimit)
					getItem((i-1) * getLimit)
				}}/>
		</PaginationI>
	)
}

export default PaginationG