import { useQuery } from "@tanstack/react-query"
import { PokemonCard } from "src/model/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function getPokemonCards() {
  return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_POKEMON_CARDS)).data
}

export default function useGetPokemonCards() {
  return useQuery<PokemonCard[]>({
    queryKey: ["pokemon-cards"],
    queryFn: getPokemonCards,
  })
}
