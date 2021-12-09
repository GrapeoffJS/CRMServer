import axios from "axios";
import Url from "../../../url/url";
import errorHandler from "../../error-handler/error-handler";

const commentingOnGroup = (title, group, change_trial_lessons, setNotes, setLoading) => {
    setLoading(true)
    let new_schedule = [{
        ...group.global_schedule[0],
        title
    }]
    group.pupils.forEach(pupil => {
        setNotes(pupil.id, title)
    })
    change_global_schedule(group._id, new_schedule)
        .then(res => {
            setLoading(false)
            change_trial_lessons(res.data)
        })
        .catch(error => {
            errorHandler(() => {commentingOnGroup(title, group)}, error, () => {
                setLoading(false)
            })
        })
}

const setNotes = (id, text) => (
    axios({
        method: 'post',
        url: `${Url}/CRM/Pupils/${id}/Notes`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: {
            text
        }
    })
        .catch(error => {
            errorHandler(() => setNotes(id, text), error, false)
        })
)

const change_global_schedule = (group_id, new_schedule) => (
    axios({
        method: 'post',
        url: `${Url}/CRM/Groups/${group_id}/Schedule`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: new_schedule
    })
)

const getTrialLessons = (setLoading, install_trial_lessons) => {
    setLoading(true)
    axios({
        method: 'post',
        url: `${Url}/CRM/Groups/find?limit=100&offset=${0}&trial=true`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
        .then(res => {
            install_trial_lessons(res.data)
            setLoading(false)
        })
        .catch(error => {
            errorHandler(() => getTrialLessons(install_trial_lessons), error, () => setLoading(false))
        })
}

const deleteGroups = (id, delete_trial_lessons, setLoading, free_day_for_teacher) => {
    setLoading(true)
    axios({
        method: "DELETE",
        url: `${Url}/CRM/Groups/${id}`,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
        },
    })
        .then(() => {
            delete_trial_lessons(id)
            free_day_for_teacher()
        })
        .catch(error => {
            errorHandler(() => deleteGroups(id, delete_trial_lessons, setLoading), error, () => setLoading(false))
        })
}

const setLessonPassed = (checked, group_id, schedule, group, change_trial_lessons) => {
    let new_schedule = [{
        ...schedule[0],
        status: checked ? 2 : 3,
        title: group.pupils[0].localSchedule[group_id][0].title
    }]
    change_trial_lessons({
        ...group,
        global_schedule: new_schedule
    })
    change_global_schedule(group_id, new_schedule)
        .catch(error => {
            errorHandler(() => setLessonPassed(checked, group_id, schedule), error, () => {
                change_trial_lessons(group)
            })
        })
}

export {
    getTrialLessons,
    setLessonPassed,
    deleteGroups,
    change_global_schedule,
    commentingOnGroup,
    setNotes
}