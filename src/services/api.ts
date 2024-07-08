import axios from "axios"
import QUERY_ROUTES from "src/router/query-routes"

const axiosInstance = axios.create({
  baseURL: QUERY_ROUTES.BACKEND_BASE_URL,
})

export async function getYuGiOhCards() {
  return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_YUGIOH_CARDS)).data
}

export async function getPokemonCards() {
  return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_POKEMON_CARDS)).data
}

export async function getDragonBallZCards() {
  return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_DRAGON_BALL_Z_CARDS)).data
}
