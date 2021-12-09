const when_choosing_subject = subject => ({
    type: 'WHEN_CHOOSING_SUBJECT',
    payload: subject
})
const install_trial_lessons = lessons => ({ // #
    type: 'INSTALL_TRIAL_LESSONS',
    payload: lessons
})
const add_trial_lessons = new_lesson => ({ // # Добавить пробный урок
    type: 'ADD_TRIAL_LESSONS',
    payload: new_lesson
})
const delete_trial_lessons = _id => ({ // # Удалить пробный урок
    type: 'DELETE_TRIAL_LESSONS',
    payload: _id
})
const free_day_for_teacher = (time, day, tutor) => ({
    type: 'FREE_DAY_FOR_TEACHER',
    payload: {time, day, tutor}
})
const change_trial_lessons = lesson => ({
    type: 'CHANGE_TRIAL_LESSONS',
    payload: lesson
})
const identify_possible_teachers = tutors => ({ // # определить возможных учителей
    type: 'IDENTIFY_POSSIBLE_TEACHERS',
    payload: tutors
})
const specify_loading = (status) => ({
    type: 'SPECIFY_LOADING',
    payload: status
})
const add_pupil_to_trial_lesson = pupil => ({
    type: 'ADD_PUPIL_TO_TRIAL_LESSON',
    payload: pupil
})
const delete_pupil_to_trial_lesson = id => ({
    type: 'DELETE_PUPIL_TO_TRIAL_LESSON',
    payload: id
})
const set_subject_teachers = tutors => ({
    type: 'SET_SUBJECT_TEACHERS',
    payload: tutors
})
const set_local_week = new_week => ({
    type: 'SET_LOCAL_WEEK',
    payload: new_week
})
const set_chosen_teacher = tutor => ({
    type: 'SET_CHOSEN_TEACHER',
    payload: tutor
})
const set_trial_lesson_day = date => ({
    type: 'SET_TRIAL_LESSON_DAY',
    payload: date
})

export {
    when_choosing_subject,
    install_trial_lessons,
    identify_possible_teachers,
    specify_loading,
    add_pupil_to_trial_lesson,
    delete_pupil_to_trial_lesson,
    set_subject_teachers,
    set_local_week,
    set_chosen_teacher,
    set_trial_lesson_day,
    add_trial_lessons,
    delete_trial_lessons,
    change_trial_lessons,
    free_day_for_teacher
}