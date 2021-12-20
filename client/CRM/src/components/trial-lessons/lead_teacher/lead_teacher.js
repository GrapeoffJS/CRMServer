import React from "react";
import {Descriptions} from "antd";
import {connect} from "react-redux";
import moment from "moment";
import {
    DoubleLeftOutlined,
    DoubleRightOutlined
} from '@ant-design/icons'
import {set_trial_lesson_day} from "../../../actions";
import {next_day} from '../create-trial-lesson/create-trial-lesson.logics'

const LeadTeacher = ({date, tutor, set_trial_lesson_day}) => {

    const {surname, name, midname} = tutor.tutor

    const setData = status => {
        let day_name = (moment(date, 'DD.MM.YYYY').lang('en').format('dd'))
        set_trial_lesson_day(next_day(day_name, date, status))
    }

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
                <Descriptions.Item label="Дата урока" className={'date'}>
                    {date ? (
                        <>
                            <DoubleLeftOutlined
                                onClick={() => setData(0)}
                            />
                            {date ? moment(date, 'DD.MM.YYYY').format('DD - MMMM - YYYY') : ''}
                            <DoubleRightOutlined
                                onClick={() => setData(1)}
                            />
                        </>
                    ) : ''}
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
const mapDispatchToProps = {
    set_trial_lesson_day
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadTeacher)