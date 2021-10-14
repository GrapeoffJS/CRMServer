import React, {useState, useEffect} from 'react';
import Url from './../../../../url/url.js';
import {swallGood} from './../../../../alert/alert.js';

import moment from 'moment';
import { Modal, Button } from 'antd';

// Style
import styled from '@emotion/styled';
import errorHandler from "../../../error-handler/error-handler";
const axios = require('axios'); // AJAX

const ScheduleForm = ({updateGroup, groupID}) => {

	// Modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(false)

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	// /Modal

	let dataInputs = {
		startDate: '',
		endDate: '',
		duration_Start: '',
		duration_End: '',
		weekDay: []
	};

	let weekDay = {
		one: [],
		two: [],
		three: [],
		four: [],
		five: [],
		six: [],
		zero: []
	};

	let schedule = [];

	const FindNeedle = () => {
		let {startDate, duration_Start, duration_End, endDate} = dataInputs
		let academicHours = (moment(`2000-01-01, ${duration_End}`).diff(`2000-01-01, ${duration_Start}`, 'hours'))

		let dayNumber = moment(startDate).day();

		let day_end = moment(endDate).format('DD.MM.YYYY');

		let day = moment(startDate).format('DD.MM.YYYY'),
			day_number = moment(day, 'DD.MM.YYYY').day(),
		    inc = 1;

		const PushDay = () => {
			dataInputs.weekDay.forEach((item) => {
				if (item == day_number) {

						let scheduleItem = {
							date: day,
							duration: [duration_Start, duration_End],
							status: '',
							tutor: '',
							paid: false,
							title: ''
						};
					for (let i = 0; i < academicHours; i++) {
						schedule.push(scheduleItem);
					}
				}
			});
		};
		PushDay();

		do {
			day = moment(dataInputs.startDate).day(dayNumber + inc).format('DD.MM.YYYY');
			day_number = moment(day, 'DD.MM.YYYY').day();

			PushDay();

			inc++;
		} while (day != day_end);

		axios({
			method: 'post',
			url: `${Url}/CRM/Groups/${groupID}/Schedule`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
			},
			data: schedule
		})
		.then((res) => {

			document.querySelectorAll("input").forEach((item) => {item.value = ''});
			setLoading(false)
			setIsModalVisible(false)
			swallGood('Расписание создано', '');
	    	for (let key in weekDay) {
				weekDay[key] = [];
			}
			updateGroup(); // Обновить группу.
		})
		.catch((error) => {
			errorHandler(FindNeedle, error)
		})

		console.log(schedule);
	};


	const FormChance = () => {
		setLoading(true)

		for (let key in weekDay) {
			if (weekDay[key][0]) {
				dataInputs.weekDay.push(weekDay[key][1]);
			}
		}
	
		FindNeedle();
	};

	const ScheduleForm = styled.div({
		'.form-check': {
			marginRight: '12px',
			paddingLeft: '100px'
		}
	});

	return (
		<>
			<i onClick={showModal}
					  className="bi bi-calendar2-plus" 
					  style={{fontSize: "26px", color: '#17a2b8', cursor: 'pointer'}}
					  ></i>

			<Modal 
				title="Добавить расписание" 
				visible={isModalVisible} 
				onCancel={handleCancel}
				width={1000}
				footer={[
					<Button key="onCancel1" onClick={handleCancel}>
						Отмена
					</Button>,
					<Button 
						key="onOk1" 
						onClick={FormChance}
						loading={loading}
						type="primary"
						>
						Сохранить
					</Button>
				]}
				>
				<ScheduleForm>
					<form className="row g-3">
			        	<div className="col-md-6">
						    <label className="form-label">Период:</label>
						    <div className="row periud">
						    	<input
						    		onChange={(e) => {dataInputs.startDate = e.target.value}} 
						    		type="date" className="form-control col-5"/>
							    <div className="input-group-text">до</div>
	      						<input
	      							onChange={(e) => {dataInputs.endDate = e.target.value}} 
	      							type="date" className="form-control col-5"/>
						    </div>
						</div>
						<div className="col-md-6">
						    <label className="form-label">Время занятия:</label>
						    <div className="row periud">
						    	<input
						    		onChange={(e) => {dataInputs.duration_Start = e.target.value}} 
						    		type="time" className="form-control col-5"/>
							    <div className="input-group-text">до</div>
	      						<input
	      							onChange={(e) => {dataInputs.duration_End = e.target.value}} 
	      							type="time" className="form-control col-5"/>
						    </div>
						</div>
						<div className="col-12">
							<label className="form-label">Дни недели:</label>
						    <div className="row col-12">
						    	<div className="form-check">
							        <input
							        	onChange={(e) => {
							        		weekDay.one = [e.target.checked, e.target.value]
							        	}} 
							        	className="form-check-input" value='1' type="checkbox"/>
							      	<label className="form-check-label">
							        	Пн
							      	</label>
							    </div>
							    <div className="form-check">
							        <input
							        	onChange={(e) => {
							        		weekDay.two = [e.target.checked, e.target.value]
							        	}}  
							        	className="form-check-input" value='2' type="checkbox"/>
							      	<label className="form-check-label">
							        	Вт
							      	</label>
							    </div>
							    <div className="form-check">
							        <input
							        	onChange={(e) => {
							        		weekDay.three = [e.target.checked, e.target.value]
							        	}}  
							        	className="form-check-input" value='3' type="checkbox"/>
							      	<label className="form-check-label">
							        	Ср
							      	</label>
							    </div>
							    <div className="form-check">
							        <input
							        	onChange={(e) => {
							        		weekDay.four = [e.target.checked, e.target.value]
							        	}}  
							        	className="form-check-input" value='4' type="checkbox"/>
							      	<label className="form-check-label">
							        	Чт
							      	</label>
							    </div>
							    <div className="form-check">
							        <input
							        	onChange={(e) => {
							        		weekDay.five = [e.target.checked, e.target.value]
							        	}} 
							        	className="form-check-input" value='5' type="checkbox"/>
							      	<label className="form-check-label">
							        	Пт
							      	</label>
							    </div>
							    <div className="form-check">
							        <input
							        	onChange={(e) => {
							        		weekDay.six = [e.target.checked, e.target.value]
							        	}}  
							        	className="form-check-input" value='6' type="checkbox"/>
							      	<label className="form-check-label">
							        	Сб
							      	</label>
							    </div>
							    <div className="form-check">
							        <input 
							        	onChange={(e) => {
							        		weekDay.zero = [e.target.checked, e.target.value]
							        	}} 
							        	className="form-check-input" value='0' type="checkbox"/>
							      	<label className="form-check-label">
							        	Вс
							      	</label>
							    </div>
						    </div>
						</div>
			        </form>
			    </ScheduleForm>
			</Modal>
		</>
	);
};

export default ScheduleForm;