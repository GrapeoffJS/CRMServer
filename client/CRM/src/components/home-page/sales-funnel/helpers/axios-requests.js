// imports from plugins
import axios from "axios"

// imports from files of project

const status = 1
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWRkNTUzOTZmNWNlMDJiYjY4NTc3MiIsImxvZ2luIjoiaWRtaXRyaXl3aW54IiwibmFtZSI6ItCc0LDQutGB0LjQvCIsInN1cm5hbWUiOiLQkdC10YDQstC40L3QvtCyIiwibWlkbmFtZSI6Ii4uLiIsImFjY291bnRUeXBlIjoibWFuYWdlciIsImlhdCI6MTYzMzU0MDEyNywiZXhwIjoxNjMzNTY4OTI3fQ.O7HLLdJLz2VevFL6tc2Qa1lrukahQIw5Rbh-ZKuQTCo"

// Student
export const axiosCreateNewStudent = async (url, params) => {
  let result

  await axios.post(`${url}/CRM/Pupils`, {
    name: params.name,
    midname: params.midname,
    surname: params.surname,
    gender: params.gender,
    dateOfBirth: params.dateOfBirth,
    phone: params.phone,
    discord: params.discord,
    parentPhone: params.parentPhone,
    parentFullname: params.parentFullname,
    salesFunnelStep: params.salesFunnelStep
  }, {
    headers: {
      "Authorization": `Bearer ${status ? localStorage.getItem("tokenID") : token}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  }).then(res => result = res.data)

  return result
}
export const axiosUpdateStudent = async (url, id, student) => {
  await axios.patch(`${url}/CRM/Pupils/${id}`, student, {
    headers: {
      "Authorization": `Bearer ${status ? localStorage.getItem("tokenID") : token}`,
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
      'Authorization': `Bearer ${status ? localStorage.getItem("tokenID") : token}`
    }
  })
    .then(res => salesFunnelSteps = res.data)

  return salesFunnelSteps
}
// Funnel
