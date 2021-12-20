import axios from "axios"

// Student
export const axiosCreateNewStudent = async (url, params) => {
  let result

  await axios.post(`${url}/CRM/Pupils`, {
    name: params.name,
    midname: params.midname,
    surname: params.surname,
    gender: params.gender,
    dateOfBirth: params.dateOfBirth,
    phones: params.phones,
    discord: params.discord,
    parentPhones: params.parentPhones,
    parentFullname: params.parentFullname,
    salesFunnelStep: params.salesFunnelStep
  }, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("tokenID")}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  }).then(res => result = res.data)

  return result
}
export const axiosUpdateStudent = async (url, id, student) => {
  await axios.patch(`${url}/CRM/Pupils/${id}`, student, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("tokenID")}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  })
}
// Student

// Funnel
export const axiosGetFunnelSteps = async (url, pageSize = 1000) => {

  let salesFunnelSteps
  await axios.get(`${url}/CRM/SalesFunnel?limit=${pageSize}`, {
    headers: {
      'Content-Type': 'application/jsoncharset=utf-8',
      'Authorization': `Bearer ${localStorage.getItem("tokenID")}`
    }
  })
    .then(res => salesFunnelSteps = res.data)

  return salesFunnelSteps
}
// Funnel
