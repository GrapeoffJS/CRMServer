import axios from "axios"

export const editTask = async (url, id, property) => {
  await axios.patch(`${url}/CRM/Tasks/${id}`, property, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })
}