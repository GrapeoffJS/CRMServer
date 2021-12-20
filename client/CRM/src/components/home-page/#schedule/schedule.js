 import React from 'react';

import moment from 'moment';

// Style 
import styled from '@emotion/styled';

 const SchedulE = styled.div({
	 padding: '0',
	 marginBottom: '15px',
	 '.boxS': {
		 overflow:'auto',
		 maxHeight: '200px',
	 },
	 '.dataNumber': {
		 margin: '0 3px 0 0',
		 fontSize: '15px',
		 fontWeight: '600',
		 width: '96px',
		 '.time': {
			 color: '#1890ff'
		 }
	 }
 });

const Schedule = ({global_schedule}) => {

	if (!global_schedule[0]) {
		return (
			<SchedulE  className="col-12">
				<h5>Расписания нет...</h5>
			</SchedulE>
		);
	}

	let time = '',
		previous_day

	let SpanDay = global_schedule.map((item) => {
		let date = moment(item.date, 'DD.MM.YYYY').format('DD.MM')
		if (previous_day === date) {
			let num = +`${item.duration[0][0]}${item.duration[0][1]}`
			if (num === 23) {
				time = `00:${item.duration[0][3]}${item.duration[0][4]}`
			} else {
				time = `${num + 1}:${item.duration[0][3]}${item.duration[0][4]}`
			}
		} else {
			time = item.duration[0]
		}
		previous_day = date
		return (
			<span key={`${item.date}${time}`} className="badge bg-light text-dark dataNumber">{`${date} `}<span className={'time'}>{time}</span></span>
		);
	});

	return (
		<SchedulE className="col-12">
			<div className="boxS">
				{SpanDay}
			</div>
		</SchedulE>
	);
};

export default Schedule;