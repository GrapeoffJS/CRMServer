import React, {useState} from "react";
import {Button} from "antd";
import {connect} from "react-redux";
import moment from 'moment'
import axios from "axios";
import Url from "../../../url/url";
import errorHandler from "../../error-handler/error-handler";
import {add_trial_lessons, clear_pupil_to_trial_lesson} from "../../../actions";
import {swallGood} from "../../../alert/alert";

const ButtonCreateTrialLesson = ({pupils_id, date, tutor, StartTime, EndTime, subject, add_trial_lessons, updateTeachers, clear_pupil_to_trial_lesson}) => {

    const [loading, setLoading] = useState(false)

    const CreateTrialLesson = () => {
        if (date && tutor._id && pupils_id.length && subject) {
            setLoading(true)

            axios({
                method: "POST",
                url: `${Url}/CRM/Groups`,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
                },
                data: {
                    group_name: `Пробный урок: ${subject}`,
                    tutor: tutor._id,
                    level: 1,
                    places: pupils_id.length,
                    pupils: pupils_id,
                    trial: true,
                    global_schedule: [{duration: [StartTime, EndTime], status: 2, date, paid: false}]
                }
            })
                .then(res => {
                    setLoading(false)
                    add_trial_lessons(res.data)
                    swallGood('Пробный урок успешно создан!')
                    updateTeachers()
                    clear_pupil_to_trial_lesson()
                })
                .catch(error => {
                    errorHandler(CreateTrialLesson, error, () => {
                        setLoading(false)
                        clear_pupil_to_trial_lesson()
                    })
                })
        }
    }

    return (
        <Button
            style={{
                marginTop: '16px'
            }}
            type={'primary'}
            loading={loading}
            onClick={CreateTrialLesson}
        >
            Создать урок
        </Button>
    )
}

const mapStateToProps = state => ({
    tutor: state.chosen_teacher.tutor,
    StartTime: state.chosen_teacher.time,
    EndTime: `${moment(state.chosen_teacher.time, 'HH').add(1, 'h').format("HH")}:00`,
    date: state.trial_lesson_day,
    pupils_id: state.students_for_trial_lesson.map(pupil => pupil.id),
    subject: state.selected_subject
})
const mapDispatchToProps = {
    add_trial_lessons,
    clear_pupil_to_trial_lesson
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCreateTrialLesson)