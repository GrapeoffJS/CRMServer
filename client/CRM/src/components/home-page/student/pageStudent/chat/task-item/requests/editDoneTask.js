import axios from "axios"

export const editDoneTask = async (url, id, done) => {
  await axios.patch(`${url}/CRM/Tasks/${id}`, done, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })
}