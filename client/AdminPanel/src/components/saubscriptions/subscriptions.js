import React, {useState, useEffect} from 'react';
import url from './../../url/url.js';

import AddSubscriptions from './addSubscriptions/addSubscriptions.js';
import {loading, Swalclose} from './../../alert/alert.js';

const Subscriptions = () => {

	const [Subscriptions_Item, setSubscriptions_Item] = useState([]);

	const getSubsc_on = () => {
		fetch(`${url}/AdminPanel/Subscriptions`, {
		    method: "GET",
		    header: {
		        "Access-Control-Allow-Origin": "*",
		        'Content-Type': 'application/json;charset=utf-8'
		    },
		})
		    .then((response) => {
		        return response.json();
		    })
		    .then((data) => {
		    	Swalclose();
		    	setSubscriptions_Item(data);
		    });
	};

	useEffect(() => {
		getSubsc_on();
	}, []);

	let SubscriptionsItem = Subscriptions_Item.map((item) => {

		let {_id, name, price, hoursCount} = item;

		const deleteItem = () => {

			loading('Абонемент удаляется');

			fetch(`${url}/AdminPanel/Subscriptions/${item._id}`, {
			    method: "DELETE",
			    header: {
			        "Access-Control-Allow-Origin": "*",
			        'Content-Type': 'application/json;charset=utf-8'
			    },
			})
			    .then((response) => {
			        getSubsc_on();
			    });
		};

		return (
			<div key={_id} className="card card-subscriptions" style={{width: '18rem'}}>
			    <div className="card-body">
			        <h5 className="card-title">{name}</h5>
			    </div>
			    <ul className="list-group list-group-flush">
			        <li className="list-group-item">{price} ₽</li>
			        <li className="list-group-item">{hoursCount} часов</li>
			    </ul>
			    <div className="card-body">
			        <span onClick={deleteItem} className="delete-abic card-link">Удалить</span>
			    </div>
			</div>
		);
	});

	return (
		<div className="subscriptions container">
		 	<h3>Абонементы</h3>
		 	<AddSubscriptions getSubsc_on={getSubsc_on}/>
			<div className="row">
				{SubscriptionsItem}
			</div>
		</div>
	);
};

export default Subscriptions;