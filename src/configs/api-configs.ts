import axios from "axios"

const BASE_URL = "http://localhost:8080/api"

const clientAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export { clientAxios }
