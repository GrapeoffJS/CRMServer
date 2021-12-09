const initialState = {
    all_disciplines: ['Программирование', 'Дизайн'],
    selected_subject: undefined,
    trial_lessons: [],
    possible_teachers: [],
    loading: false,
    students_for_trial_lesson: [],
    subject_teachers: [],
    local_week: {},
    chosen_teacher: {tutor: {_id: '', surname: '', name: '', midname: ''}, time: '', index: ''},
    trial_lesson_day: ''
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case 'WHEN_CHOOSING_SUBJECT':
            return {
                ...state,
                selected_subject: payload
            }
        case 'INSTALL_TRIAL_LESSONS':
            return {
                ...state,
                trial_lessons: payload
            }
        case 'ADD_TRIAL_LESSONS':
            return {
                ...state,
                trial_lessons: [...state.trial_lessons, payload]
            }
        case 'DELETE_TRIAL_LESSONS':
            return {
                ...state,
                trial_lessons: state.trial_lessons.filter(lesson => (lesson._id !== payload))
            }
        case 'CHANGE_TRIAL_LESSONS':
            return {
                ...state,
                trial_lessons: state.trial_lessons.map(lesson => {
                    if (lesson._id === payload._id) {
                        return payload
                    } else {
                        return lesson
                    }
                })
            }
        case 'IDENTIFY_POSSIBLE_TEACHERS':
            return {
                ...state,
                possible_teachers: payload
            }
        case 'SPECIFY_LOADING':
            return {
                ...state,
                loading: payload
            }
        case 'ADD_PUPIL_TO_TRIAL_LESSON':
            return {
                ...state,
                students_for_trial_lesson: [...state.students_for_trial_lesson, payload]
            }
        case 'DELETE_PUPIL_TO_TRIAL_LESSON':
            return {
                ...state,
                students_for_trial_lesson: state.students_for_trial_lesson.filter(pupil => pupil.id !== payload)
            }
        case 'SET_SUBJECT_TEACHERS':
            return {
                ...state,
                subject_teachers: payload
            }
        case 'SET_LOCAL_WEEK':
            return {
                ...state,
                local_week: payload
            }
        case 'FREE_DAY_FOR_TEACHER':
            const {time, day, tutor} = payload
            let new_local_week = JSON.parse(JSON.stringify(state.local_week))
            new_local_week[time][day].tutors.push(tutor)
            return {
                ...state,
                local_week: new_local_week
            }
        case 'SET_CHOSEN_TEACHER':
            return {
                ...state,
                chosen_teacher: payload
            }
        case 'SET_TRIAL_LESSON_DAY':
            return {
                ...state,
                trial_lesson_day: payload
            }
        default:
            return state
    }
}

export default reducer