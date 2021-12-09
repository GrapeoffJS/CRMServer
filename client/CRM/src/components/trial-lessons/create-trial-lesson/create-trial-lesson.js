import React, {useEffect} from "react";
import {Select, Skeleton} from "antd";
import {connect} from "react-redux";
import {CreateTrialLessonStyle, Table} from "./create-trial-lesson.style";
import {
    get_subject_teachers,
    scheduling,
    info_window,
    mapStateToProps,
    mapDispathToProps,
    funOptionSubjects,
    planning_week
} from "./create-trial-lesson.logics";
import SelectionStudents from "../selection-students/selection-students";
import {Swalclose} from "../../../alert/alert";
import LeadTeacher from "../lead_teacher/lead_teacher";
import ButtonCreateTrialLesson from "../button_create_trial_lesson/button_create_trial_lesson";


const CreateTrialLesson = (
    {
        subjects,
        when_choosing_subject,
        selected_subject,
        specify_loading,
        loading,
        set_subject_teachers,
        week,
        set_local_week,
        set_chosen_teacher,
        chosen_teacher,
        set_trial_lesson_day
    }
) => {

    const {
        hour8,
        hour9,
        hour10,
        hour11,
        hour12,
        hour13,
        hour14,
        hour15,
        hour16,
        hour17,
        hour18,
        hour19,
        hour20,
        hour21
    } = week

    let Time8 = [],
        Time9 = [],
        Time10 = [],
        Time11 = [],
        Time12 = [],
        Time13 = [],
        Time14 = [],
        Time15 = [],
        Time16 = [],
        Time17 = [],
        Time18 = [],
        Time19 = [],
        Time20 = [],
        Time21 = []

    useEffect(() => {
        info_window(selected_subject)

        return function () {
            Swalclose()
        }

    }, [selected_subject])


    const settingsTable = (
        <Table>
            <tbody>
            <tr className={'week'}>
                <td className={'white'}/>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => <td key={day}>{day}</td>)}
            </tr>
            {scheduling(Time8, hour8, 'hour8', '08:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time9, hour9, 'hour9', '09:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time10, hour10, 'hour10', '10:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time11, hour11, 'hour11', '11:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time12, hour12, 'hour12', '12:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time13, hour13, 'hour13', '13:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time14, hour14, 'hour14', '14:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time15, hour15, 'hour15', '15:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time16, hour16, 'hour16', '16:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time17, hour17, 'hour17', '17:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time18, hour18, 'hour18', '18:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time19, hour19, 'hour19', '19:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time20, hour20, 'hour20', '20:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            {scheduling(Time21, hour21, 'hour21', '21:00', set_chosen_teacher, chosen_teacher, set_trial_lesson_day)}
            </tbody>
        </Table>
    )
    const skeleton = (
        <>
            <br/>
            {[1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(key => (
                <Skeleton.Button
                    style={{
                        marginRight: '8px',
                        marginBottom: '8px',
                        width: '50px',
                        height: '675px'
                    }}
                    key={key}
                    active
                />
            ))}
        </>
    )

    return (
        <CreateTrialLessonStyle>
            <Select
                defaultValue={selected_subject}
                placeholder="Что хочет изучить клиент?"
                allowClear
                className={'select'}
                onChange={value => {
                    when_choosing_subject(value)
                    get_subject_teachers(
                        set_subject_teachers,
                        value,
                        specify_loading,
                        week,
                        (subject_teachers) => {planning_week(subject_teachers, set_local_week, specify_loading)}
                    )
                    set_chosen_teacher({tutor: {_id: '', surname: '', name: '', midname: ''}, time: '', index: ''})
                    set_trial_lesson_day('')
                }}
            >
                {funOptionSubjects(subjects)}
            </Select>
            <div className={`week-and-pupils ${selected_subject ? '' : 'none-table'}`}>
                {loading ? skeleton : settingsTable}
                <div className="selection-students">
                    <SelectionStudents/>
                    <LeadTeacher/>
                    <ButtonCreateTrialLesson updateTeachers={() => {
                        get_subject_teachers(
                            set_subject_teachers,
                            selected_subject,
                            specify_loading,
                            week,
                            (subject_teachers) => {planning_week(subject_teachers, set_local_week, specify_loading)}
                        )
                        set_chosen_teacher({tutor: {_id: '', surname: '', name: '', midname: ''}, time: '', index: ''})
                        set_trial_lesson_day('')
                    }}/>
                </div>
            </div>
        </CreateTrialLessonStyle>
    )
}

export default connect(mapStateToProps, mapDispathToProps)(CreateTrialLesson)