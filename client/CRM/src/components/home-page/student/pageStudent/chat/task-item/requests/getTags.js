import axios from "axios"

export const getTags = async (url) => {
  let result

  await axios.get(`${url}/CRM/TaskTags`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  }).then(response => result = response.data)

  return result
}
