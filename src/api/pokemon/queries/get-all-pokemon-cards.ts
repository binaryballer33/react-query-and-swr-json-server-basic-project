import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function getPokemonCards() {
    return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_POKEMON_CARDS)).data
}

export default function useGetPokemonCardsQuery() {
    return useQuery<PokemonCard[]>({
        queryKey: QUERY_KEYS.ALL_POKEMON_CARDS,
        queryFn: getPokemonCards,
    })
}
