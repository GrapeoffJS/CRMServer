import {axiosGetFunnelSteps} from "../../sales-funnel/helpers/axios-requests";
import Url from "../../../../url/url";
import axios from "axios";
import getLimit from "../../#more-functions/getLimit/getLimit";
import errorHandler from "../../../error-handler/error-handler";

const getFunnel = async (set) => {
    let box = await axiosGetFunnelSteps(Url, 8)

    set(prev => prev = box)
}

const update = (offset = 0, param = {}, filtersGroups = {}, setUsers = () => {}, setCount = () => {}) => {

    let filtersLocal = {}

    for (let key in filtersGroups) {

        if (filtersLocal.groups) {
            filtersLocal.groups.push(key)
        } else {
            filtersLocal.groups = []
            filtersLocal.groups.push(key)
        }
    }

    for (let key in param) {
        if (param[key][0]) {
            if (key === 'surname' || key === 'name' || key === 'midname' || key === 'dateOfBirth') {
                filtersLocal[`${key}s`] = param[key]
            } else {
                filtersLocal[`${key}`] = param[key]
            }
        }
    }

    if (filtersLocal.ages) {
        let dateOfBirth = [...filtersLocal.ages]
        filtersLocal.ages = []
        dateOfBirth.forEach(dateOfBirth => {
            filtersLocal.ages.push(+dateOfBirth)
        })
    }

    if (filtersLocal.balance) {
        let balance = [...filtersLocal.balance]
        if (balance[0] == 1 & !balance[1]) {
            filtersLocal.balance = {$gte: 0}
        } else if (balance[0] == 2 & !balance[1]) {
            filtersLocal.balance = {$lt: 0}
        } else if (balance[1]) {
            filtersLocal.balance = {$gte: 0, $lte: 0}
        }
    }

    let p = {
        filters: filtersLocal
    }

    axios({
        method: 'post',
        url: `${Url}/CRM/Pupils/find?limit=${getLimit}&offset=${offset}`, // ${10 + offset}
        headers: {
            'Content-Type': 'application/jsoncharset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: p
    })
    .then((res) => {

        let {data, headers} = res
        setUsers(data)
        setCount(headers.count)
    })
    .catch((error) => {
        errorHandler(update, error)
    })
}

const trashUser = async (item, update, offsetG, setUsers, setCount) => {

    axios({
        method: 'DELETE',
        url: `${Url}/CRM/Pupils/${item._id}`,
        headers: {
            'Content-Type': 'application/jsoncharset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
    .then((res) => {
        update(offsetG, {}, {}, setUsers, setCount)
    })
    .catch((error) => {
        errorHandler(trashUser, error)
    })
}

const getStudent_Id = (pageStudent_id, setDataS) => {
    axios({
        method: 'get',
        url: `${Url}/CRM/Pupils/${pageStudent_id}`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
        .then((res) => {
            setDataS(res.data);
        })
        .catch((error) => {
            errorHandler(getStudent_Id, error)
        })
}

export {
    getFunnel,
    update,
    trashUser,
    getStudent_Id
}