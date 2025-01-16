import axios from "axios"

export const clientAxios = axios.create({
   baseURL: "http://localhost:8080/v1/api", // Endpoint mặc định
})
