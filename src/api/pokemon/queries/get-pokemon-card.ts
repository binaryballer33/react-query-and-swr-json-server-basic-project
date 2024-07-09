import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import axiosInstance from "src/api/xhr-request-instance"
import { PokemonCard } from "src/model/pokemon"
import QUERY_ROUTES from "src/router/query-routes"

async function getPokemonCardById(cardId: number) {
  return (await axiosInstance.get(QUERY_ROUTES.GET_POKEMON_CARD_BY_ID(cardId))).data
}

export default function useGetPokemonCardById(cardId: number) {
  return useQuery<PokemonCard>({
    queryKey: QUERY_KEYS.GET_POKEMON_CARD_BY_ID(cardId),
    queryFn: () => getPokemonCardById(cardId),
  })
}
