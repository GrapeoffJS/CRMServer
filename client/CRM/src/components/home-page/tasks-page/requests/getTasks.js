import axios from "axios"

export const getTasks = async (url, tagsQuery = "") => {
  let result

  await axios.get(`${url}/CRM/Tasks/CurrentUserTasks${tagsQuery}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  }).then(res => result = res.data)

  return result
}