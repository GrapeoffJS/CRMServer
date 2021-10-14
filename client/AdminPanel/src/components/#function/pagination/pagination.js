import React, {useState, useEffect} from 'react';

// Style 
import styled from '@emotion/styled';

const Pagination = ({offset, setOffset, getItem, count}) => {

 	console.log(offset)

	const li = []

	for (let i = 0; i < count / 10; i++) {

		let active = ''
		if (offset / 10 == i) {
			active = ' active'
		} 

		li.push(<li 
					onClick={() => {
						console.log(i)
						setOffset(i * 10)
						getItem(i * 10)
					}}
					className={`page-item${active}`}><span className="page-link">{i + 1}</span></li>)
	}

	const Pagination = styled.nav({
		margin: '3px 3px 20px 3px',
		overflow: 'auto',
		'&::-webkit-scrollbar': {
			height: '4px',
			backgroundColor:'rgba(0, 0, 0, 0.5)',
			borderRadius: '10px'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#17a2b8',
			borderRadius: '10px'
		},
		ul: {
			marginBottom: '3px'
		}
	})

	return (
		<Pagination aria-label="Page navigation example">
			<ul className="pagination">
				{/*<li className="page-item">
					<a className="page-link" href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>*/}
				{li}
				{/*<li className="page-item">
					<a className="page-link" href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>*/}
			</ul>
		</Pagination>
	)
}

export default Pagination