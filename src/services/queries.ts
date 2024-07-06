import { DragonBallZCard } from "src/model/dragon-ball-z"
import { PokemonCard } from "src/model/pokemon"
import { YuGiOhCard } from "src/model/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import useSWR from "swr"

export function useGetYuGiOhCards() {
  const { data, error, isLoading } = useSWR<YuGiOhCard[]>(QUERY_ROUTES.YUGIOH)

  return {
    data,
    error,
    isLoading,
  }
}

export function useGetPokemonCards() {
  const { data, error, isLoading } = useSWR<PokemonCard[]>(QUERY_ROUTES.POKEMON)

  return {
    data,
    error,
    isLoading,
  }
}

export function useGetDragonBallZCards() {
  const { data, error, isLoading } = useSWR<DragonBallZCard[]>(QUERY_ROUTES.DRAGON_BALL_Z)

  return {
    data,
    error,
    isLoading,
  }
}
