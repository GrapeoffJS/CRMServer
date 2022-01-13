import axios from "axios"

export const getTags = async (url) => {
  const tags = await axios.get(`${url}/CRM/TaskTags`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })

  return tags.data
}
