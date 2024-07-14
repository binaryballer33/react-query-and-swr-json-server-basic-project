/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Updating Pokemon Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(data!.id) })
    },
  })
}
