import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import axiosInstance from "src/api/xhr-request-instance"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"

export async function getPokemonCardById(cardId: number) {
    return (await axiosInstance.get(QUERY_ROUTES.GET_POKEMON_CARD_BY_ID(cardId))).data
}

export default function useGetPokemonCardByIdQuery(cardId: number) {
    return useQuery<PokemonCard>({
        queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(cardId),
        queryFn: () => getPokemonCardById(cardId),
    })
}
