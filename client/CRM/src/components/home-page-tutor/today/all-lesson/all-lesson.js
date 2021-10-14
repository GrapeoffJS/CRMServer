import React from "react"

import TableGroups from "./table-groups/table-groups.js"

import styled from "@emotion/styled"

const AllLesson = ({Groups, newGroup, setGROUP, GROUP}) => {

	let gro = [...Groups]

	// if (gro[1]) {
	// 	gro.splice(0, 1)
	// }

	const AllLesson = styled.div({
		padding: '15px',
		borderRadius: '2px',
		backgroundColor: '#fff'
	})

	return (
		<AllLesson className='AllLesson'>
			<div className='row'>
				<div className="col-md-8">
					<h5>Ближайшие уроки</h5>
				</div>
			</div>
			<div className="TableGroups">
				<TableGroups Groups={gro} newGroup={newGroup} setGROUP={setGROUP} GROUP={GROUP}/>
			</div>
		</AllLesson>
	)	
}

export default AllLesson