import axios from "axios"

export const createTag = async (url, newTag) => {
  let tag

  await axios.post(`${url}/CRM/TaskTags`, newTag, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  }).then(response => tag = response.data)

  return tag
}