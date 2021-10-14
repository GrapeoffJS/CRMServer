import Url from './../../../../../../url/url.js'
import errorHandler from "../../../../../error-handler/error-handler";

const axios = require("axios");

const writeComment = (pupil_id, value) => {
    axios({
        method: 'post',
        url: `${Url}/CRM/Pupils/${pupil_id}/Notes`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        data: {
            text: value
        }
    })
    .catch((error) => {
        errorHandler(writeComment, error)
    });
}

export default writeComment