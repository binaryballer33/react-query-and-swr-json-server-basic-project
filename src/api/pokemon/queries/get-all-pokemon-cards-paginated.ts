import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPokemonCards } from "src/api/pokemon/queries/get-all-pokemon-cards"
import QUERY_KEYS from "src/api/query-keys"
import { PokemonCard } from "src/model/cards/pokemon"

export default function useGetPokemonCardsPaginatedQuery() {
    return useQuery<PokemonCard[]>({
        queryKey: QUERY_KEYS.ALL_POKEMON_CARDS,
        queryFn: getPokemonCards,
        placeholderData: keepPreviousData,
    })
}
