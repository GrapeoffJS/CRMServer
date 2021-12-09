import {delete_pupil_to_trial_lesson} from "../../../../actions";

const mapStateToProps = state => ({
    students_for_trial_lesson: state.students_for_trial_lesson
})
const mapDispathToProps = {
    delete_pupil_to_trial_lesson
}

export {
    mapStateToProps,
    mapDispathToProps
}