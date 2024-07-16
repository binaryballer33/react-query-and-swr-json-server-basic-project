/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function updatePokemonCard(card: PokemonCard) {
  return (await axiosInstance.put(QUERY_ROUTES.UPDATE_POKEMON_CARD_BY_ID(card.id), card)).data
}

// TODO: should i be doing the zod schema.safeParse validation of the request body here
export default function useUpdatePokemonCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<PokemonCard, Error, PokemonCard>({
    mutationFn: (card: PokemonCard) => updatePokemonCard(card),

    onMutate(card) {
      toast.loading(`Attempting To Update Pokemon Card: ${card.name}`, {
        duration: 500,
      })
    },

    onError(error, card, context) {
      console.error(`Error Updating Pokemon Card: ${error}`)
      toast.error(`Error Updating Pokemon Card: ${card.name}`)
    },

    onSuccess(data, card, context) {
      toast.success(`Successfully Updated Pokemon Card: ${card.name}`)
    },

    onSettled(data, error, card, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(data!.id) })
    },
  })
}
