/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Creating Pokemon Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
    },
  })
}
