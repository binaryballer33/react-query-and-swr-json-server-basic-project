"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useEffect } from "react"
import { getDragonBallZCards } from "src/api/dragon-ball-z/queries/get-all-dragon-ball-z-cards"
import { getPokemonCards } from "src/api/pokemon/queries/get-all-pokemon-cards"
import QUERY_KEYS from "src/api/query-keys"
import { getYuGiOhCards } from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"

export const queryClient = new QueryClient()

type ReactQueryClientProviderProps = {
  children: React.ReactNode
}

export default function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  // do the prefetching after the component mounts in order to prevent hyration errors
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.GET_ALL_POKEMON_CARDS,
      queryFn: getPokemonCards,
    })

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.GET_ALL_DRAGON_BALL_Z_CARDS,
      queryFn: getDragonBallZCards,
    })

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.GET_ALL_YU_GI_OH_CARDS,
      queryFn: getYuGiOhCards,
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
