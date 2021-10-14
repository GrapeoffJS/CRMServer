import Url from "../../../url/url";
import errorHandler from './../../error-handler/error-handler'

const axios = require('axios'); // AJAX

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
}

export const get_funnel = (fun) => {
    axios({
        method: 'GET',
        url: `${Url}/AdminPanel/SalesFunnel`,
        headers
    })
    .then(res => {
        fun(res.data)
    })
    .catch(error => {
        errorHandler(get_funnel, error)
    })
}

export const post_funnel = (data, cancellation, update) => {
    if (data.name) {
        axios({
            method: 'POST',
            url: `${Url}/AdminPanel/SalesFunnel`,
            headers,
            data: data
        })
        .then(res => {
            update(res.data)
        })
        .catch(error => {
            errorHandler(post_funnel, error, cancellation)
        })
    }
}

export const put_funnel = (data, cancellation, updete) => {

    let customizedData = data.map(card => {
        let {id, order} = card
        return {id, newOrder: order}
    })

    axios({
        method: 'PUT',
        url: `${Url}/AdminPanel/SalesFunnel`,
        headers,
        data: customizedData
    })
    .then(res => {
        updete(res.data)
    })
    .catch(error => {
        errorHandler(put_funnel, error, cancellation)
    })
}

export const delete_funnel = (id, cancellation) => {
    axios({
        method: 'DELETE',
        url: `${Url}/AdminPanel/SalesFunnel/${id}`,
        headers
    })
    .then()
    .catch(error => {
        errorHandler(put_funnel, error, cancellation)
    })
}