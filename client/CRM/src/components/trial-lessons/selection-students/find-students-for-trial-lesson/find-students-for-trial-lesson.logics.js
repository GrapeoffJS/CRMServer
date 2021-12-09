import {add_pupil_to_trial_lesson} from "../../../../actions";

const mapStateToProps = state => ({
    students_for_trial_lesson: state.students_for_trial_lesson
})

const mapDispatchToProps = {
    add_pupil_to_trial_lesson
}

const addPupil = (pupil, setValue = () => {}, pupils, add_pupil_to_trial_lesson) => {
    let permitted = true
    pupils.forEach(item => {
        if (item.id === pupil.id) {
            permitted = false
        }
    })
    if (permitted) {
        add_pupil_to_trial_lesson(pupil)
        setValue()
    }
}

export {
    addPupil,
    mapStateToProps,
    mapDispatchToProps
}