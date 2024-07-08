import { useQuery } from "@tanstack/react-query"
import { DragonBallZCard } from "src/model/dragon-ball-z"
import { PokemonCard } from "src/model/pokemon"
import { YuGiOhCard } from "src/model/yu-gi-oh"
import { getYuGiOhCards } from "./api"

export function useGetYuGiOhCards() {
  return useQuery<YuGiOhCard[]>({
    queryKey: ["yu-gi-oh-cards"],
    queryFn: getYuGiOhCards,
  })
}

export function useGetPokemonCards() {
  return useQuery<PokemonCard[]>({
    queryKey: ["pokemon-cards"],
    queryFn: getYuGiOhCards,
  })
}

export function useGetDragonBallZCards() {
  return useQuery<DragonBallZCard[]>({
    queryKey: ["dragon-ball-z-cards"],
    queryFn: getYuGiOhCards,
  })
}
