import Url from './../../../url/url.js';
import {swallErr} from '../../../alert/alert';
import errorHandler from "../../error-handler/error-handler";

const axios = require('axios'); // AJAX

const Change_Balance = (sym, pupil_id, updeteStudent, subscription, group_id, returnBalance) => {

	let urlLocal = subscription? `/CRM/Pupils/${pupil_id}/Payment?subscription=${subscription}&group_id=${group_id}` : `/CRM/Pupils/${pupil_id}/Payment?amount=${+sym}`

	axios({
		method: "post",
		url: `${Url}${urlLocal}`, // amount&subscription&group_id
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
		},
	})
	.then((res) => {
		updeteStudent(res.data);
	})
	.catch((error) => {
		errorHandler(
			() => {},
			error,
			returnBalance,
			updeteStudent,
			() => {swallErr("Не удалось пополнить баланс", "Попробуйте снова")}
		)
	});

}

export default Change_Balance;