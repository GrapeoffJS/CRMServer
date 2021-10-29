import React from 'react';

// Style
import styled from '@emotion/styled';

const PayHistory = ({pay_History}) => {

	let liDec = [];
	pay_History.forEach((item, i) => {
			liDec.unshift(
				<li key={i} className="list-group-item">{item.date} <span className="user">{item.issuer}</span>: <span className="abic">{item.subscription}</span></li>
			);
	})

	const PayHistory = styled.div({
		margin: '0',
		padding: '0',
		'.colona': {
			padding: '0',
			marginBottom: '15px',
			h3: {
				fontSize: '16px'
			},
			ul: {
				borderRadius: '5px',
				overflow: 'auto',
				maxHeight: '268px',
				border: '1px solid rgba(0,0,0,.125)',
				'&::-webkit-scrollbar': {
					width: '10px',
					backgroundColor:'rgba(0, 0, 0, 0.5)',
					borderRadius: '10px'
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: '#17a2b8',
					borderRadius: '10px'
				}
			},
			li: {
				border: '1px solid #91A8B0'
			},
			'.abic': {
				color: '#17a2b8'
			},
			'.user': {
				fontSize: '20px'
			}
		}
	})

	return (
		<PayHistory className='col-12 row'>
			<div className="colona col-12">
			<h3 className="badge bg-danger text-light">Оплата</h3>
			<ul className="list-group">
			  {liDec}
			</ul>
			</div>
		</PayHistory>
	);
}

export default PayHistory;