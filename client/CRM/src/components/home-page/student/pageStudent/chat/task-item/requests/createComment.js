import axios from "axios"

export const createComment = async (url, currentId, comment) => {
  let comm

  await axios.post(`${url}/CRM/Pupils/${currentId}/Notes`, comment, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  }).then(response => comm = response.data)

  return comm
}