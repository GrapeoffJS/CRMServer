import axios from "axios"

export const getResponsibles = async (url, query = "") => {
  const responsibles = await axios.get(`${url}/CRM/Search/CRMUsers?query=${query}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("tokenID")}`
    }
  })

  return responsibles.data
}