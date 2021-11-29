import axios from "axios"

export const getResponsibles = async (url, query = "") => {
  let result

  await axios.get(`${url}/CRM/Search/CRMUsers?query=${query}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  }).then(res => result = res.data)

  return result
}