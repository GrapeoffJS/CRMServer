import React from 'react';
import url from './../../../url/url.js';

import {loading} from './../../../alert/alert.js';
const axios = require('axios'); // AJAX

const AddSubscriptions = ({getSubsc_on}) => {

	let price = '',
		hoursCount = '';

	const addSubscriptions = () => {

		loading('Абонемент добавляется');

		let text = 'часа';
		if ((+hoursCount % 10) > 4 || (+hoursCount % 10) == 0) {
			text = 'часов';
		} else if ((+hoursCount % 10) == 1) {
			text = 'час';
		}

		axios({
			method: 'post',
			url: `${url}/AdminPanel/Subscriptions`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			data: {
				name: `${price}₽ за ${hoursCount} ${text}`,
				price: +price,
				hoursCount: +hoursCount
			}
		})
		.then((res) => {
			console.log(res.data, res);
			console.log(price, hoursCount);
			getSubsc_on();
			document.querySelectorAll("input").forEach((item) => {item.value = ''});
		});
	}

	return (
		<div className="addSubscriptions col-2 row">
			<div className="btn-group">
			    <i  id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent"
			    	className="bi bi-calendar2-plus" style={{fontSize: "26px", color: '#28a745', cursor: 'pointer', marginBottom: '.5rem'}}></i>
			    <ul className="dropdown-menu" aria-labelledby="dropdownMenuReference">
				    <li className="li">
				      	<input
				      		placeholder="Стоимость"
						   	onChange={(e) => {price = e.target.value}} 
						   	type="number" className="text-success form-control col-12"/>
				    </li>
				    <li className="li">
				      	<input
				      		placeholder="Кол. часов"
						   	onChange={(e) => {hoursCount = e.target.value}} 
						   	type="number" className="text-dark form-control col-12"/>
				    </li>
				    <li className="li">
				    	<span
				    		onClick={addSubscriptions} 
				    		className="badge bg-warning text-dark">
				    		Добавить
				    	</span>
				    </li>
			    </ul>
			</div>
		</div>
	);
}
export default AddSubscriptions;