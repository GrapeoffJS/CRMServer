import axios from "axios";
import Url from "../../../../../url/url";
import errorHandler from "../../../../error-handler/error-handler";

export const requestAddStudentGroup = (groupId, studentId, set, callBefore = () => {}) => {
    callBefore()
    axios({
        method: 'post',
        url: `${Url}/CRM/Groups/${groupId}/Pupils`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: {
            ids: [studentId]
        }
    })
        .then((res) => {
            set(res.data)
        })
        .catch((error) => {
            errorHandler(requestAddStudentGroup, error)
        })
}