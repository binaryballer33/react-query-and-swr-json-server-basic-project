"use server"

import { dehydrate, QueryFunction } from "@tanstack/react-query"
import { getDragonBallZCards } from "src/api/dragon-ball-z/queries/get-all-dragon-ball-z-cards"
import { getPokemonCards } from "src/api/pokemon/queries/get-all-pokemon-cards"
import { getPokemonPaginated } from "src/api/pokemon/queries/get-all-pokemon-cards-paginated"
import createQueryClient from "src/api/query-client-server-component"
import QUERY_KEYS from "src/api/query-keys"
import { getYuGiOhCards } from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"

// const getPokemonPaginatedQueryFn: QueryFunction<
//     unknown,
//     [
//         string,
//         {
//             limit: number
//         },
//         {
//             page: number
//         },
//     ]
// > = async ({ queryKey }) => {
//     const [_, { limit }, { page }] = queryKey
//     return getPokemonPaginated(limit, page)
// }

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchDataDehydrateState() {
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    await queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS,
        queryFn: getYuGiOhCards,
    })

    await queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS,
        queryFn: getDragonBallZCards,
    })

    await queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.ALL_POKEMON_CARDS,
        queryFn: getPokemonCards,
    })

    // TODO: figure out why this is giving an error
    // await queryClient.prefetchQuery({
    //     queryKey: QUERY_KEYS.ALL_POKEMON_CARDS_PAGINATED(5, 1) as [string, { limit: number }, { page: number }],
    //     // queryKey: ["pokemon-cards", { limit: 5 }, { page: 1 }],
    //     queryFn: getPokemonPaginatedQueryFn,
    //     // queryFn: getPokemonPaginated(5, 1),
    // })

    // return the dehydrated state of the queryClient
    return dehydrate(queryClient)
}
