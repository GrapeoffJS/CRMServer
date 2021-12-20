import axios from "axios";
import Url from "../../../../url/url";
import errorHandler from "../../../error-handler/error-handler";

const getGroup_Id = (setFun, id, onError = () => {}, notification = true) => {
    axios({
        method: 'get',
        url: `${Url}/CRM/Groups/${id}`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        }
    })
        .then((res) => {
            setFun(res.data);
        })
        .catch((error) => {
            errorHandler(() => {
                getGroup_Id(setFun, id, onError, notification)
            }, error, onError, notification)
        });
}

export {
    getGroup_Id
}