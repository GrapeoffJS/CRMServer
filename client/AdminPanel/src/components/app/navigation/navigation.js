import React, {useState} from 'react';

import Sidebar from './sidebar/sidebar.js';
import Header from './header/header.js';

const Navigation = () => {

	const [sitdebarClass, setWidth] = useState('width50');

	const [iconR, setInon] = useState("iconR");

	const setUrl = () => {
		setWidth('width50');
		setInon('iconR');
	}

	return (
		<>
			<Header iconR={iconR} setInon={setInon} setWidthMenu={setWidth}>
			</Header>
			<Sidebar setUrl={setUrl} sitdebarClass={sitdebarClass}/>
		</>
	);
}

export default Navigation;