import Url from './../../../../../../url/url.js'
import errorHandler from '../../../../../error-handler/error-handler.js'

const axios = require('axios'); // AJAX

const changeSchedule = (mass, pupil_id, id, getUser) => {
    axios({
        method: 'put',
        url: `${Url}/CRM/Groups/${id}/Pupils/${pupil_id}/Schedule`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: mass
    })
    .then((res) => {
        getUser('Сохранение')
    })
    .catch((error) => {
        errorHandler(changeSchedule, error)
    });
}

export default changeSchedule