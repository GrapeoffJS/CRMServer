import React, {useState, useEffect} from 'react';

// import {loading, Swalclose} from './../../../../alert/alert.js'
// import Url from './../../../../url/url.js'
// import localStorage_change from './../../../../#localStorage_change.js'

import TablePupils from './table-pupils/table-pupils.js'

import { Typography, Space } from 'antd';

import styled from '@emotion/styled';

const LessonNowStyle = styled.div({
	'.time': {
		'h5, h6': {
			margin: 0
		}
	},
	'.TablePupils': {
		marginTop: '15px',
		'.ant-tag': {
			fontSize: '13px'
		},
		td: {
			padding: '16px 3px'
		}
	},
	'.Button': {
		marginTop: '15px',
		display: 'flex',
		justifyContent: 'flex-end'
	}
})

const { Text } = Typography;

const LessonNow = ({rowKey, setRowKey, GROUP, Group, getUser}) => {

	let G = Group

	if (GROUP.group.group_name) {
		G = GROUP
	}

	return (
		<LessonNowStyle className='LessonNow'>
			<div className='row'>
				<div className="col-md-8">
					<h4><Text type="secondary"> Урок сейчас: </Text> {G.group.group_name} </h4>
				</div>
				<div className={`col-md-3 time`}>
					<h6> <Text type="secondary">Начало</Text> </h6>
					<h5> <Text type="warning">{G.group.global_schedule[G.indexD].date} в {G.group.global_schedule[0].duration[0]}</Text> </h5>
				</div>
			</div>
			<div className="TablePupils">
				<TablePupils rowKey={rowKey} getUser={getUser} ID_Group={G.indexD} setRowKey={setRowKey} Group={G.group}/>
			</div>
		</LessonNowStyle>
	)
}

export default LessonNow