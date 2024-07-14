import axios from "axios"
import QUERY_ROUTES from "src/router/query-routes"

const axiosInstance = axios.create({ baseURL: QUERY_ROUTES.BACKEND_BASE_URL })

export default axiosInstance
