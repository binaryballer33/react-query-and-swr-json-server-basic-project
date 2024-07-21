/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { createCardRequestSchema } from "src/model/cards/card"
import { PokemonCardWithoutId } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function createPokemonCard(card: PokemonCardWithoutId) {
  return (await axiosInstance.post(QUERY_ROUTES.CREATE_POKEMON_CARD, card)).data
}

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't refetch the data from the database
 */
export default function useCreatePokemonCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<PokemonCardWithoutId, Error, PokemonCardWithoutId>({
    onMutate(card) {
      createCardRequestSchema.parse(card)

      toast.loading(`Attempting To Create Pokemon Card: ${card.name}`, {
        duration: 500,
      })
    },

    mutationFn: (card: PokemonCardWithoutId) => createPokemonCard(card),

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Created Pokemon Card: ${card.name}`)
    },

    onError(error, card, _context) {
      console.error(`Error Creating Pokemon Card: ${error}`)
      toast.error(`Error Creating Pokemon Card ${card.name}`)
    },

    onSettled: async (_data, _error, _card, _context) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
    },
  })
}
