/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function deletePokemonCard(cardId: number) {
  return (await axiosInstance.delete(QUERY_ROUTES.DELETE_POKEMON_CARD_BY_ID(cardId))).data
}

export default function useDeletePokemonCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<PokemonCard, Error, PokemonCard>({
    mutationFn: (card: PokemonCard) => deletePokemonCard(card.id),

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Deleting Pokemon Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(data!.id) })
    },
  })
}
