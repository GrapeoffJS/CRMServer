import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Account from './../app/app.js';
import Navigation from './../app/navigation/navigation.js';
import Subscriptions from './../saubscriptions/subscriptions.js';
import Teacher from './../teacher/teacher.js';
import AllEmployees from './../all-employees/all-employees.js'
import RoleCreation from './../role-creation/role-creation.js'
import SalesFunnel from './../sales-funnel/sales-funnel.js'

import styled from '@emotion/styled';
	
const HomePage = () => {

	const breakpoints = [700],
	mq = breakpoints.map(
		bp => `@media (max-width: ${bp}px)`
	);

	const GlavPage = styled.div({
		marginLeft: '100px',
		[mq[0]]: {
			marginLeft: '0'
		}
	})

	return (
		<Router>
			<Navigation/>
			<GlavPage>
				<Route exact path='/subscriptions' component={Subscriptions}/>
				<Route exact path='/account' component={Account}/>
				<Route exact path='/teacher' component={Teacher}/>
				<Route exact path='/allemployees' component={AllEmployees}/>
				<Route exact path='/roleCreation' component={RoleCreation}/>
				<Route exact path='/sales-funnel' component={SalesFunnel}/>
			</GlavPage>
		</Router>
	);
}

export default HomePage;