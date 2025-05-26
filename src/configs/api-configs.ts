import axios from "axios"

export const clientAxios = axios.create({
  baseURL: "http://localhost:8080/api", // Endpoint mặc định
})
