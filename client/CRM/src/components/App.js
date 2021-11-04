import React, {useState, useEffect} from 'react'

import './App.css';
import FormlogIn from './form-log-In/form-log-in.js'
import HomePage from './home-page/home-page.js'

import Url from './../url/url.js'

import HomePageTutor from './home-page-tutor/home-page-tutor.js'

const App = () => {
	const axios = require('axios'); // AJAX

	let jwt = require('jsonwebtoken')

	const [User, setUser] = useState('');
	let form = <FormlogIn setUser={setUser}/>;
	let page = localStorage.getItem('tokenID')? <HomePage logOut={setUser}/> : form;

	useEffect(() => {
		if (page !== form) {
			axios({
				method: "get",
				url: `${Url}/auth-check`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
				},
			})
			.catch(error => {
				if (error.response) {
					let {status} = error.response
					if (status === 401) {
						localStorage.removeItem("tokenID");
						window.location.replace("/");
					}
				}
			})
		}
	}, [])
	
	if (localStorage.getItem('tokenID')) {
		if (jwt.decode(localStorage.getItem('tokenID')).accountType === 'teacher') {
			page = <HomePageTutor logOut={setUser}/>
		}
	}

	return (
		<>
	  		{page}
		</>
	);
}


export default App;
