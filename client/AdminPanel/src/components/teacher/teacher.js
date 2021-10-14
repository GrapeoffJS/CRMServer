import React, {useState, useEffect} from 'react'
import FormTeacher from './formTeacher/formTeacher.js'

import Pagination from './../#function/pagination/pagination.js'

import {swallGood, swallErr, Swalclose} from './../../alert/alert.js'
import url from './../../url/url.js'

import styled from '@emotion/styled'

const Teacher = () => {

	const [offsetG, setOffsetG] = useState(0)
	const [Count, setCount] = useState(1)

	const axios = require('axios'); // AJAX

	const [TeacherObj, setTeacherObj] = useState([
		{
			name: 'Марина',
			surname: 'Струпина',
			midname: 'Александровна',
			login: 'marins',
			subject: 'javaScript + ReactJs',
			role: 'teacher'
		}
	]);

	const getTeacherUrl = (offset = 0) => {
		axios({
			method: 'get',
			url: `${url}/AdminPanel/CRMAccounts?limit=10&offset=${offset}&accountType=teacher`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
		.then((res) => {
			let data = res.data
			setCount(res.headers.count)

			setTeacherObj(data)
		})
		.catch((error) => {
			if (error.response) {
				swallErr('Ошибка', '');
			}
		})
	}

	useEffect(() => {
		getTeacherUrl()
	}, [])

	let tableUser = TeacherObj.map((item) => {
		
		const trashUser = () => {

			// setAlert(alertWarning);

			fetch(`${url}/AdminPanel/CRMAccounts/${item.login}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
			})
			.then((dataJson) => {
				console.log(dataJson);
			})
			.then(() => {
				getTeacherUrl()
			});
		};

		return (
			<tr key={item.login}>
				<td className="td-trash" scope="row">
				<i onClick={trashUser} className="bi bi-trash" style={{fontSize: '30px', color: '#F56767'}}></i>
				</td>
				<td className="align-middle td-use">{item.name}</td>
				<td className="align-middle td-use">{item.surname}</td>
				<td className="align-middle td-use">{item.midname}</td>
				<td className="align-middle td-use">{item.login}</td>
				<td className="align-middle td-use">{item.subject}</td>
			</tr>
		);
	})

	const Teacher = styled.div({
			'.h3Ac, .boxAdd': {
				display: 'inline-block'
			},
			'.boxAdd': {
				marginLeft: '10px' 
			}
	})
	return (
		<>
			<Teacher className={`container`}>
				<div className="row">
					<div className={`table_user`}>
						<h3 className="h3Ac">Учителя</h3>
						<div className="boxAdd">
							<div className="d-flex plus-box">
						        <i className="bi bi-people" style={{fontSize: '30px', color: '#0498FA'}}></i>
						    	<div
						      		onClick={() => {}}
						      	 	className="nav-item plus" data-bs-toggle="modal" data-bs-target="#exampleModal">
						      		<i className="bi bi-plus" style={{fontSize: '30px', color: '#F56767'}}></i>
						      	</div>
						    </div>
						</div>
						<table className="table table-striped">
						  <thead>
						    <tr>
						      <th className="th-h" scope="col"></th>
						      <th className="th-h align-middle" scope="col">Имя</th>
						      <th className="th-h align-middle" scope="col">Фамилия</th>
						      <th className="th-h align-middle" scope="col">Отчество</th>
						      <th className="th-h align-middle" scope="col">Логин</th>
						      <th className="th-h align-middle" scope="col">Предмет</th>
						    </tr>
						  </thead>
						  <tbody>
						   	{tableUser}
						  </tbody>
						</table>
					</div>
					<Pagination getItem={getTeacherUrl} count={Count} offset={offsetG} setOffset={setOffsetG}/>
				</div>
			</Teacher>

			<FormTeacher setTeacherObj={setTeacherObj} TeacherObj={TeacherObj}/>
		</>
	);
}

export default Teacher;