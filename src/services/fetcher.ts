import axios from "axios"
import QUERY_ROUTES from "src/router/query-routes"

const axiosInstance = axios.create({
  baseURL: QUERY_ROUTES.BACKEND_BASE_URL,
})

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)

export default fetcher
