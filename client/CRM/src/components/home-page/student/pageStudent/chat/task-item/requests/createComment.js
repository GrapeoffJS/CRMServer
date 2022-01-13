import axios from "axios"

export const createComment = async (url, currentId, comment) => {
  const commentS = await axios.post(`${url}/CRM/Pupils/${currentId}/Notes`, comment, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })

  return commentS.data
}