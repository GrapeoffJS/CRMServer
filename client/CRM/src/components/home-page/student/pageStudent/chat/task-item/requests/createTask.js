import axios from "axios"

export const createTask = async (url, newTask) => {
  let taskFromServer

  await axios.post(`${url}/CRM/Tasks`, newTask, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  }).then(response => taskFromServer = response.data)

  return taskFromServer
}