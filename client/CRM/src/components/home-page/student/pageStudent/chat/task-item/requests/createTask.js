import axios from "axios"

export const createTask = async (url, newTask) => {
  const taskFromServer = await axios.post(`${url}/CRM/Tasks`, newTask, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })

  return taskFromServer.data
}