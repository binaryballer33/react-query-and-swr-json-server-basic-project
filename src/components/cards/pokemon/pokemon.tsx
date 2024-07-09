import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getPokemonCards } from "src/api/pokemon/queries/get-all-pokemon-cards"
import { getQueryClient } from "src/api/query-client-provider"
import QUERY_KEYS from "src/api/query-keys"
import PokemonCards from "./pokemon-cards"

// use server side rendering to prefetch the data
export default async function Pokemon() {
  const queryClient = getQueryClient()

  // Prefetch the data for the PokemonCards component
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.GET_ALL_POKEMON_CARDS,
    queryFn: getPokemonCards,
  })

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonCards />
    </HydrationBoundary>
  )
}
