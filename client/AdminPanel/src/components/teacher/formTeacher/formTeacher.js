import React, {useState, useEffect} from 'react'
import url from './../../../url/url.js'

import {loading, Swalclose, swallErr} from './../../../alert/alert.js'

import styled from '@emotion/styled';

const FormTeacher = ({setTeacherObj, TeacherObj}) => {

	const axios = require('axios'); // AJAX

	const [Role, setRole] = useState([])

	let inputTeacher = {
		name: '',
		surname: '',
		midname: '',
		login: '',
		subject: '',
		accountType: 'teacher',
		role: ''
	}

	    const getRole = () => {

	    	axios({
				method: 'get',
				url: `${url}/AdminPanel/Roles`,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
	    	})
	    	.then((res) => {
	    		setRole(res.data)
	    	})
	    	.catch(error => {
	    		if (error.response) {
	    		}
	    	})
	    }

	useEffect(() => {
		getRole()
	}, [])

		const optionRole = Role.map(role => (
			<option key={role._id} value={role._id}>{role.name}</option>
		))

	const formSubmit = (e) => {

		loading('Сохранение...');

		axios({
			method: 'post',
			url: `${url}/AdminPanel/CRMAccounts`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			data: inputTeacher
		})
		.then((res) => {
			let {data} = res.data;

			setTeacherObj([...TeacherObj, inputTeacher])
			Swalclose()

			document.querySelector('.btn-close').click() // Закрыть модальное окно
			document.querySelectorAll("input").forEach((item) => {item.value = ''})
		})
		.catch((error) => {
			if (error.response) {
				document.querySelectorAll('input').forEach((item) => {item.value = ''})
				document.querySelectorAll('select').forEach((item) => {item.value = ''})
				if (error.response.status == 400) {
					swallErr(`Произошла ошибка`, 'Не подходящие данные')
				} else {
					Swalclose()
				}
			}
		})

		e.preventDefault();
	};

	return (
			<div className="modal fade" tabIndex="-1" id="exampleModal">
			  <div className="modal-dialog modal-lg">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Добавить учителя</h5>
				    <button
					    onClick={() => {}}
				    	type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
				    </button>
			      </div>
			      <div className="alert-modal">
			      </div>
				    <form method="post" onSubmit={formSubmit}>
				    	<div className="modal-body">
				          <div className="row mb-3">
						    <label htmlFor="inputName" className="fs-5 col-sm-2 col-form-label">Имя</label>
						    <div className="col-sm-10">
						      <input 
						      	onChange={(e) => {inputTeacher.name = e.target.value}} 
						      	autoComplete='off' 
						      	required 
						      	type="name" name="name" className={`form-control`} id="inputname"/>
						    </div>
						  </div>
						  <div className="row mb-3">
						    <label htmlFor="inputSirname" className="fs-5 col-sm-2 col-form-label">Фамилия</label>
						    <div className="col-sm-10">
						      <input 
						      	onChange={(e) => {inputTeacher.surname = e.target.value}} 
						      	autoComplete='off'
						      	required 
						      	type="name" name="surname" className={`form-control`} id="inputSirname"/>
						    </div>
						  </div>
						  <div className="row mb-3">
						    <label htmlFor="inputMidname" className="fs-5 col-sm-2 col-form-label">Отчество</label>
						    <div className="col-sm-10">
						      <input 
						      	onChange={(e) => {inputTeacher.midname = e.target.value}} 
						      	autoComplete='off'
						      	required 
						      	type="name" name="midname" className={`form-control`} id="inputMidname"/>
						    </div>
						  </div>
						  <div className="row mb-3">
						    <label htmlFor="inputLogin" className="fs-5 col-sm-2 col-form-label">Логин</label>
						    <div className="col-sm-10">
						      <input 
						      	onChange={(e) => {inputTeacher.login = e.target.value}} 
						      	autoComplete='off' 
						      	required 
						      	type="name" name="login" className={`form-control`} id="inputLogin"/>
						    </div>
						  </div>
						  <div className="row mb-3">
						    <label htmlFor="inputPassword3" className="fs-5 col-sm-2 col-form-label">Пароль</label>
						    <div className="col-sm-10">
						      <input 
						      	onChange={(e) => {inputTeacher.password = e.target.value}} 
						      	autoComplete='off' 
						      	required 
						      	type="password" name="password" className={`form-control`} id="inputPassword3"/>
						    </div>
						  </div>
						  <div className="row mb-3">
						    <label className="fs-5 col-sm-4 col-form-label">Предмет</label>
						    <div className="col-sm-8 input-group">
								<select defaultValue=' ' onChange={(e) => {inputTeacher.subject = e.target.value}} className="form-control" id="inputGroupSelect01">
								    <option defaultValue>Выбрать предмет...</option>
								    <option value="Python">Python</option>
								    <option value="Html">Html</option>
								    <option value="Css">Css</option>
								    <option value="Sass/Scss">Sass/Scss</option>
								    <option value="Node.js">Node.js</option>
								    <option value="Vue.js">Vue.js</option>
								    <option value="React.js">React.js</option>
								    <option value="React Native">React Native</option>
								    <option value="Ruby">Ruby</option>
								</select>
						    </div>
						  </div>
						  <div className="row mb-3">
						    <label className="fs-5 col-sm-4 col-form-label">Роль</label>
						    <div className="col-sm-8 input-group">
								<select defaultValue=' ' onChange={(e) => {inputTeacher.role = e.target.value}} className="form-control" id="inputGroupSelect01">
								    <option defaultValue></option>
								    {optionRole}
								</select>
						    </div>
						  </div>
				      	</div>
				    	<div className="modal-footer">
				        	<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
				        	<button type="submit" className="btn btn-primary">Добавить пользователя</button>
				      	</div>
				    </form>
			    </div>
			  </div>
			</div>
	);
}

export default FormTeacher;