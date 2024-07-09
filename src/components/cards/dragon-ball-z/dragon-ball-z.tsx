import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getDragonBallZCards } from "src/api/dragon-ball-z/queries/get-all-dragon-ball-z-cards"
import { getQueryClient } from "src/api/query-client-provider"
import QUERY_KEYS from "src/api/query-keys"
import DragonBallZCards from "./dragon-ball-z-cards"

// use server side rendering to prefetch the data
export default async function DragonBallZ() {
  const queryClient = getQueryClient()

  // Prefetch the data for the DragonBallZCards component
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.GET_ALL_DRAGON_BALL_Z_CARDS,
    queryFn: getDragonBallZCards,
  })

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DragonBallZCards />
    </HydrationBoundary>
  )
}
