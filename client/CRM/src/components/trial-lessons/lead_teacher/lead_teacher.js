import React from "react";
import {Descriptions} from "antd";
import {connect} from "react-redux";
import moment from "moment";

const LeadTeacher = ({date, tutor}) => {

    const {surname, name, midname} = tutor.tutor

    return (
        <div className={'chosen_teacher'}>
            <Descriptions
                bordered
                size={'small'}
                column={1}
            >
                <Descriptions.Item label="Учитель">
                    {`${surname} ${name} ${midname}`}
                </Descriptions.Item>
                <Descriptions.Item label="Дата урока">
                    {`${moment(date, 'DD.MM.YYYY').format('DD - MMMM - YYYY')}`}
                </Descriptions.Item>
                <Descriptions.Item label="Начало урока">
                    {`${tutor.time ? 'в' : ''} ${tutor.time}`}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

const mapStateToProps = state => ({
    date: state.trial_lesson_day,
    tutor: state.chosen_teacher
})

export default connect(mapStateToProps)(LeadTeacher)