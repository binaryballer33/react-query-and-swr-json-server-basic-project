import { keepPreviousData, useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import axiosInstance from "src/api/xhr-request-instance"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"

export async function getPokemonPaginated(limit: number, page: number) {
    const response = await axiosInstance.get(QUERY_ROUTES.GET_ALL_POKEMON_CARDS_PAGINATED(limit, page))
    const totalCards: number = response.headers["x-total-count"] // x-total-count has to be cased like this
    const lastPage = Math.ceil(totalCards / limit)

    return {
        totalCards,
        lastPage,
        cards: response.data as PokemonCard[],
        limit,
        page,
    }
}

export default function useGetPokemonCardsPaginatedQuery(limit = 10, page = 1) {
    return useQuery({
        queryKey: QUERY_KEYS.ALL_POKEMON_CARDS_PAGINATED(page, limit),
        queryFn: () => getPokemonPaginated(limit, page),
        placeholderData: keepPreviousData,
    })
}
