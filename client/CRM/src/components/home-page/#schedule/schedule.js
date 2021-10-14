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
		 width: '48px'
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

	let SpanDay = global_schedule.map((item) => {

		let date = moment(item.date, 'DD.MM.YYYY').format('DD.MM');

		return (
			<span key={item.date} className="badge bg-light text-dark dataNumber">{date}</span>
		);
	});

	return (
		<SchedulE className="col-12">
			<h5>{global_schedule[0].duration[0]} до {global_schedule[0].duration[1]}</h5>
			<div className="boxS">
				{SpanDay}
			</div>
		</SchedulE>
	);
};

export default Schedule;