import axios from "axios"
import QUERY_ROUTES from "src/router/query-routes"

const axiosInstance = axios.create({
  baseURL: QUERY_ROUTES.BACKEND_BASE_URL,
})

export async function getYuGiOhCards() {
  return (await axiosInstance.get(QUERY_ROUTES.YUGIOH)).data
}

export async function getPokemonCards() {
  return (await axiosInstance.get(QUERY_ROUTES.POKEMON)).data
}

export async function getDragonBallZCards() {
  return (await axiosInstance.get(QUERY_ROUTES.DRAGON_BALL_Z)).data
}
