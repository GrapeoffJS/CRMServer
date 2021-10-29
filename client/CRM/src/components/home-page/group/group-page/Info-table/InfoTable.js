import React, {useEffect, useState} from 'react';
import {Dropdown, Menu} from 'antd';

import Url from './../../../../../url/url.js';
import localStorage_change from './../../../../../#localStorage_change.js';
import RestrictionMessage from '../../../../restriction-message/restriction-message.js'

import {loading, Swalclose, Toast} from './../../../../../alert/alert.js';

// Style
import styled from '@emotion/styled';

const InfoTable = ({Data_ALL, updetePage}) => {

	let newInfo = {};

	const axios = require('axios'); // AJAX

	const [visible, setVisible] = useState('')

	const {group_name, tutor, level, places, pupils, _id} = Data_ALL;

	let PUPILS0 = pupils? pupils : ''

	let tutorText = 'Учитель не добавлен...'

	if (tutor) {
		let { surname, name, midname } = tutor
		tutorText = `${surname} ${name} ${midname}`
	}	  

	const [AllTutor, setAllTutor] = useState([{
		name: 'Учителей не обнаруженно...',
		surname: '',
		midname: '',
		_id: '546456'
	}]);

	const getTUTOR = (offset = 0) => {
		axios({
			method: 'get',
			url: `${Url}/AdminPanel/CRMAccounts?limit=20&offset=${offset}&accountType=teacher`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
			}
		})
		.then((res) => {
			let {data} = res
			console.log(data)
			setAllTutor(data)
		})
		.catch((error) => {
			if (error.response) {
				RestrictionMessage(error.response.status)
				if (error.response.status == 401) {

					if (error.response.data.message == 'TOKEN_EXPIRED') {

						localStorage_change(error.response.data.token);
						getTUTOR();
					} else {

						localStorage.removeItem('tokenID');
						window.location.replace("/");
					}
				}	
			}
		})
	}

	const onChangeInfo = () => {
		axios({
			method: 'get',
			url: `${Url}/CRM/Groups/${_id}`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
			}
		})
		.then((res) => {
			updetePage(res.data);
			console.log(newInfo);
			
			Swalclose();
			Toast.fire({
				icon: 'success',
				title: 'Изменения сохранены'
			});
		})
		.catch(error => {
			if (error.response) {
				RestrictionMessage(error.response.status)
			}
		})
	}

	const onAddTutur = (id) => {

		loading('Изменения загружаются', 'Пожалуйста подождите');

		axios({
			method: 'post',
			url: `${Url}/CRM/Groups/${_id}/Teacher?tutorID=${id}`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
			}
		})
		.then(() => {
			onChangeInfo()
		})
		.catch(error => {
			if (error.response) {
				RestrictionMessage(error.response.status)
			}
		})
	}

	let A_Tutor = AllTutor.map((item, i) => {
		let {name, surname, midname} = item

		return (
			<option key={item._id} value={item._id}>{surname} {name} {midname}</option>
			);
	});

	useEffect(() => {
		getTUTOR()
	}, [])

	const onChangeInfoItem = () => {

		loading('Изменения загружаются', 'Пожалуйста подождите');

		axios({
			method: 'patch',
			url: `${Url}/CRM/Groups/${_id}`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
			},
			data: newInfo
		})
		.then(() => {
			onChangeInfo();
		})
		.catch(error => {
			if (error.response) {
				RestrictionMessage(error.response.status)
			}
		})
	}

	// const UL = styled.ul({
	// 	width: '318px',
	// 	padding: '10px',
	// 	background: 'rgba(0, 0, 0, 0.5)',
	// 	'.save': {
	// 		marginTop: '16px',
	// 		cursor: 'pointer'
	// 	},
	// 	li: {
	// 		border: 'none'
	// 	}
	// })

	const Box = styled.span({
		fontSize: '13px'
	})
	// +^
	const menuGROUP_NAME = (
	    <Menu>
	        <Menu.Item>
	            <input
	                placeholder='Изменить название'
	                onChange={(e) => {
	                    newInfo = { group_name: `${e.target.value}` };
	                }}
	                type="name"
	                className="text-dark form-control col-12"
	            />
	        </Menu.Item>
	        <Menu.Item>
	            <Box
	                onClick={() => {
	                    onChangeInfoItem();
	                    setVisible("");
	                }}
	                className="badge bg-warning text-dark save"
	            >
	                Сохранить
	            </Box>
	        </Menu.Item>
	    </Menu>
	)
	const menuTutor = (
	    <Menu>
	        <Menu.Item>
				<div className="input-group">
				    <select
				        onChange={(e) => {
				            onAddTutur(e.target.value);
				        }}
				        className="form-control"
				    >
				        <option></option>
				        {A_Tutor}
				    </select>
				</div>
	        </Menu.Item>
	    </Menu>
	)
	const menuLEVEL = (
	    <Menu>
	        <Menu.Item>
				<div className="input-group">
				    <select
				        onChange={(e) => {
				            newInfo = { level: +e.target.value };
				        }}
				        className="form-control"
				    >
				        <option></option>
				        <option value="1">1 класс</option>
				        <option value="2">2 класс</option>
				        <option value="3">3 класс</option>
				        <option value="4">4 класс</option>
				    </select>
				</div>
	        </Menu.Item>
	        <Menu.Item>
	            <Box
	                onClick={() => {
	                    onChangeInfoItem();
	                    setVisible("");
	                }}
	                className="badge bg-warning text-dark save"
	            >
	                Сохранить
	            </Box>
	        </Menu.Item>
	    </Menu>
	)
	const menuPLACES = (
		<Menu>
	        <Menu.Item>
				<input
					placeholder="Изменить колличество мест"
					onChange={(e) => {newInfo = {places: +e.target.value}}}
					type="number" className="text-dark form-control col-12"/>
	        </Menu.Item>
	        <Menu.Item>
	            <Box
	                onClick={() => {
	                    onChangeInfoItem();
	                    setVisible("");
	                }}
	                className="badge bg-warning text-dark save"
	            >
	                Сохранить
	            </Box>
	        </Menu.Item>
	    </Menu>
	)

	const changeData = (menu, data_name) => {

		return (
			<Dropdown
			    overlay={menu}
			    visible={() => {
			        if (visible === data_name) {
			            return true;
			        } else {
			            return false;
			        }
			    }}
			    trigger={["click"]}
			>
			    <i  className="bi bi-pencil" 
				    onClick={() => {
				    	if (visible === data_name) {
				    		setVisible('')
				    	} else {
				    		setVisible(data_name)
				    	}
				    }}
				    style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}
				    ></i>
			</Dropdown>
		)
	}

	return (
		<>
			<li className="list-group-item">Название: <span className="badge bg-info text-light">{group_name}</span>
				<div className={`btn-group`}>
				    {changeData(menuGROUP_NAME,'group_name')}
				</div>
			</li>
			<li className="list-group-item">Учитель: <span className="badge bg-warning text-dark">{tutorText}</span>
				<div className={`btn-group`}>
					{changeData(menuTutor,'tutor')}
				</div>
			</li>
			<li className="list-group-item">Класс: <span className="badge bg-success">{level}</span>
				<div className={`btn-group`}>
					{changeData(menuLEVEL,'level')}
				</div>
			</li>
			<li className="list-group-item">Mест в группе: <span className="badge bg-info text-dark">{places}</span>
				<div className={`btn-group`}>
					{changeData(menuPLACES,'places')}
				</div>
			</li>
			<li className="list-group-item">Свободных мест: <span className="badge bg-light text-dark">{places - PUPILS0.length}</span></li>
		</>
	);
}

export default InfoTable;