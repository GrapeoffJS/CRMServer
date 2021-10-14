import errorHandler from './../error-handler/error-handler'
import Url from './../../url/url'
const axios = require("axios");

export const serverRequest = (setData, localUrl, tutorid = '', functionsONsuccess = []) => {

    axios({
        method: 'get',
        url: `${Url}/CRM/Search/autocompletion?query=${localUrl}${tutorid}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
        .then((res) => {
            functionsONsuccess.forEach(fnc => {
                fnc()
            })
            setData(res.data.body.hits.hits)
        })
        .catch((error) => {
            errorHandler(serverRequest, error)
        })
}