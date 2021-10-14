import React from 'react';
import './header.css';

import styled from '@emotion/styled';

const Header = ({setWidthMenu, children, iconR, setInon}) => {

	const Header = styled.div({
		backgroundColor: '#fff',
		borderBottom: '4px solid #EFF5F7'
	}); 

	return (
		<Header className='d-flex bd-highlight'>
			<div className="burger w-100 bd-highlight">
				<div className="box-i">
					<i 
						onClick={() => {
							if (iconR == 'iconR') {
								setInon('iconR-revers');
								setWidthMenu('width100');
							} else {
								setInon('iconR');
								setWidthMenu('width50');
							}
						}}
						className={`bi bi-arrow-left ${iconR}`} style={{fontSize: '34px', color: '#91A8B0'}}></i>
				</div>
			</div>
			
	    </Header>
	);
};

export default Header;