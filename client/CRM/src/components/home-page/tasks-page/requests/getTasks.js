import axios from "axios"

export const getTasks = async (url, tagsQuery = "") => {
  const tasks = await axios.get(`${url}/CRM/Tasks/CurrentUserTasks${tagsQuery}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })

  return tasks.data
}