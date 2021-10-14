import React, {useState, useEffect} from 'react'
import { Table, Tooltip, Button, Input, Modal } from 'antd'

import {actionPermissionsGet, dataPermissionsGet} from './get-possibilities/get-possibilities.js'
import Url from './../../url/url.js'

import styled from '@emotion/styled' // Style

const AllEmployees = () => {

	const axios = require('axios'); // AJAX 

	useEffect(() => {
		document.querySelectorAll('.ant-table-cell')[4].style.width = '300px'
	})

	const [data, setData] = useState([
		{
			key: '1',
			surname: 'Иванов',
			name: 'Иван',
			midname: 'Иванович',
			login: 'Ivan',
			accountType: 'admin',
			role: {
				name: '',
				actionPermissions: [],
				dataPermissions: []
			}
		}
	])

	const update = (offset = 0) => {
		axios({
			method: 'get',
			url: `${Url}/AdminPanel/CRMAccounts?limit=10&offset=${offset}&accountType=admin&accountType=manager&accountType=teacher`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
		.then(res => {
			let {data} = res

			let box = [...data].map(item => (
				{
					...item,
					key: item._id
				}
			))
			setData(box)
			console.log(box)
		}) 
	}

	useEffect(() => {
		update()
	}, [])

	const Box = styled.div({
		display: 'flex',
		span: {
			fontSize: '16px',
			borderRadius: '10px 0 0 10px'
		},
		input: {
			width: '200px',
			fontSize: '13px',
			borderRadius: '0 10px 10px 0',
			whiteSpace: 'nowrap', /* Запрещаем перенос строк */
    		overflow: 'hidden'
		}
	})

	// let dataSource = [
		// {
		// 	key: '1',
		// 	surname: 'Иванов',
		// 	name: 'Иван',
		// 	midname: 'Иванович',
		// 	login: 'Ivan',
		// 	accountType: 'admin',
		// 	role: {
		// 		name: '',
		// 		actionPermissions: [],
		// 		dataPermissions: []
		// 	}
		// }
	// ]



	let columns = [
		{
			key: 'surname',
			dataIndex: 'surname',
			title: 'Фамилия'
		},
		{
			key: 'name',
			dataIndex: 'name',
			title: 'Имя'
		},
		{
			key: 'midname',
			dataIndex: 'midname',
			title: 'Отчество'
		},
		{
			key: 'login',
			dataIndex: 'login',
			title: 'Логин'
		},
		{
			key: 'accountType',
			dataIndex: 'accountType',
			title: 'Тип аккаунта'
		},
		{	
			key: 'role',
			dataIndex: 'role',
			title: 'Роль',
			render: (role) => {

				if (role) {
					let {name, actionPermissions, dataPermissions} = role

					let title = [...actionPermissionsGet(actionPermissions), ...dataPermissionsGet(dataPermissions)]

					return (
						<Box>
							<span className="badge bg-info text-dark">{name}: </span>
							<Tooltip placement="leftTop" title={title.join(", ")}>
						    	<Input
						    		placeholder={title.join(", ")}
						    		readOnly='readonly'
									onClick={() => {}}
									/>
						    </Tooltip>
						</Box>
					)
				}
			}
		}
	]

	const Box2 = styled.div({
		padding: '0 15px'
	})

	return (
		<Box2>
			<Table
				pagination={false}
			    dataSource={data}
			    columns={columns}
			    scroll={{ x: 0 }}
			/>

		</Box2>
	)
}

export default AllEmployees