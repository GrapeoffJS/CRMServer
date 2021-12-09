import axios from "axios";
import Url from "../../../../url/url";
import errorHandler from "../../../error-handler/error-handler";

let colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

export const updateStatuses = (set, setLoading) => {

    setLoading(true)

    axios({
        method: 'get',
        url: `${Url}/CRM/Statuses`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
        .then(res => {
            set(res.data)
            setLoading(false)
        })
        .catch(error => {
            errorHandler(updateStatuses, error, () => {
                setLoading(false)
            })
        })
}

export const createStatus = (setStatuses, setLoading, setValue, value, Statuses) => {
    if (value) {
        let idx = Math.floor(Math.random() * (10))

        setLoading(true)
        setValue('')

        axios({
            method: 'post',
            url: `${Url}/CRM/Statuses`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: {
                name: value,
                color: colors[idx]
            }
        })
            .then(res => {
                setStatuses([...Statuses, res.data])
                setLoading(false)
            })
            .catch(error => {
                errorHandler(createStatus, error, () => {
                    setLoading(false)
                })
            })
    }
}

export const onDelete = (_id, setStatuses, Statuses, setLoading) => {
    let box = Statuses.filter(item => item._id !== _id)

    setLoading(true)

    axios({
        method: 'delete',
        url: `${Url}/CRM/Statuses/${_id}`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
        .then(() => {
            setStatuses(box)
            setLoading(false)
        })
        .catch(error => {
            errorHandler(onDelete, error, () => {
                setLoading(false)
            })
        })
}

export const attachStatus = (statuses_id, setLoading, updateStudent, student_id,) => {

    setLoading(true)

    axios({
        method: 'patch',
        url: `${Url}/CRM/Pupils/${student_id}`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: {
            statuses: statuses_id
        }
    })
        .then(res => {
            setLoading(false)
            updateStudent(res.data)
        })
        .catch(error => {
            errorHandler(attachStatus, error, () => {
                setLoading(false)
            })
        })
}