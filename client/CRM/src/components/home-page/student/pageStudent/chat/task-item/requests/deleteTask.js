import axios from "axios"

export const deleteTask = async (url, id) => {
  await axios.delete(`${url}/CRM/Tasks/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })
}