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
    trial_lesson_day: '',
    all_groups: [],
    param_filters_groups: {
        group_name: [],
        level: [],
        tutor: [],
        occupied: []
    },
    all_pupils: [],
    funnel: []
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
        case 'CLEAR_PUPIL_TO_TRIAL_LESSON':
            return {
                ...state,
                students_for_trial_lesson: []
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
        case 'INSTALL_ALL_GROUPS':
            return {
                ...state,
                all_groups: payload
            }
        case 'ADD_ALL_GROUPS': {
            return {
                ...state,
                all_groups: [...state.all_groups, payload]
            }
        }
        case 'DELETE_ALL_GROUPS':
            return {
                ...state,
                all_groups: state.all_groups.filter(group => group._id !== payload)
            }
        case 'INSTALL_PARAM_FILTERS_GROUPS':
            return {
                ...state,
                param_filters_groups: payload
            }
        case 'INSTALL_ALL_PUPILS':
            return {
                ...state,
                all_pupils: payload
            }
        case 'ADD_ALL_PUPILS': {
            return {
                ...state,
                all_pupils: [...state.all_pupils, payload]
            }
        }
        case 'DELETE_ALL_PUPILS':
            return {
                ...state,
                all_pupils: state.all_pupils.filter(group => group._id !== payload)
            }
        case 'INSTALL_FUNNEL':
            return {
                ...state,
                funnel: payload
            }
        default:
            return state
    }
}

export default reducer