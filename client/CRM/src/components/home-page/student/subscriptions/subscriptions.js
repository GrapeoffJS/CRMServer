import React, {useEffect, useState} from 'react';

import Url from '../../../../url/url.js';

import styled from '@emotion/styled';
import errorHandler from "../../../error-handler/error-handler";

const axios = require('axios'); // AJAX

const Subs_ons = styled.div({
	padding: '0px',
	input: {
		margin: '0'
	},
	'.form-check': {
		marginLeft: '6px',
		marginBottom: '5px',
		width: '179px',
		textAlign: 'left',
		label: {
			padding: '2px',
			margin: '4px 0 2px 2px',
			fontSize: '15px',
		}
	}
});

const Subscriptions = () => {

	const [subscriptions, setSubscriptions] = useState([]);

	const getSubscriptions = () => {
	    axios({
	        method: "get",
	        url: `${Url}/CRM/Subscriptions`,
	        headers: {
	            "Content-Type": "application/json;charset=utf-8",
	            Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
	        },
	    })
	        .then((res) => {
	            setSubscriptions(res.data);
	        })
	        .catch((error) => {
	        	errorHandler(getSubscriptions, error)
	        });
	};

	useEffect(() => {
		getSubscriptions();
	}, []);

	let subscriptions_box = subscriptions.map((item, i) => {

		let {name} = item;

		return (
			<div key={i} className="form-check badge bg-warning text-dark">
	            	<input
		                className="input-check"
		                value={name}
		                type="checkbox"
		            />
	            	<label className="form-check-label">{name}</label>
	            
	        </div>
		);
	});

	return (
	<Subs_ons className="col-12 row">
	    <label className="form-label col-md-4">Прикрепить абонементы:</label>
	    <div className="col-md-7">
	       	{subscriptions_box}
	    </div>
	</Subs_ons>
	);
}
export default Subscriptions;