import axios from "axios"

export const createTag = async (url, newTag) => {
  const tag = await axios.post(`${url}/CRM/TaskTags`, newTag, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })

  return tag.data
}