import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "src/api/query-client-provider"
import QUERY_KEYS from "src/api/query-keys"
import { getYuGiOhCards } from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"
import YuGiOhCards from "./yu-ig-oh-cards"

// use server side rendering to prefetch the data
export default async function YuGiOh() {
  const queryClient = getQueryClient()

  // Prefetch the data for the YuGiOhCards component
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.GET_ALL_YU_GI_OH_CARDS,
    queryFn: getYuGiOhCards,
  })

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <YuGiOhCards />
    </HydrationBoundary>
  )
}
