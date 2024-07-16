/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { PokemonCardWithoutId } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function createPokemonCard(card: PokemonCardWithoutId) {
  return (await axiosInstance.post(QUERY_ROUTES.CREATE_POKEMON_CARD, card)).data
}

export default function useCreatePokemonCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<PokemonCardWithoutId, Error, PokemonCardWithoutId>({
    mutationFn: (card: PokemonCardWithoutId) => createPokemonCard(card),

    onMutate(card) {
      toast.loading(`Attempting To Create Pokemon Card: ${card.name}`, {
        duration: 500,
      })
    },

    onError(error, card, context) {
      console.error(`Error Creating Pokemon Card: ${error}`)
      toast.error(`Error Creating Pokemon Card ${card.name}: ${error}`)
    },

    onSuccess(data, card, context) {
      toast.success(`Successfully Created Pokemon Card: ${card.name}`)
    },

    onSettled(data, error, card, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
    },
  })
}
