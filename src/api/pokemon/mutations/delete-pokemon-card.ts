/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function deletePokemonCard(cardId: number) {
  return (await axiosInstance.delete(QUERY_ROUTES.DELETE_POKEMON_CARD_BY_ID(cardId))).data
}

type MutationContext = {
  staleCache?: PokemonCard[]
}

export default function useDeletePokemonCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<PokemonCard, Error, PokemonCard, MutationContext>({
    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      // if there's a validation error, the mutation will not be called and the onError will be called
      const validatedCard = deleteOrUpdateCardRequestSchema.parse(card)

      toast.loading(`Attempting To Delete Pokemon Card: ${card.name}`, {
        duration: 500,
      })

      // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })

      // get the previous state of the cache before modifying the cache, for rollback on error purposes
      const staleCache = queryClient.getQueryData<PokemonCard[]>(QUERY_KEYS.ALL_POKEMON_CARDS)

      // optimistically update the cache to what it should be if there are no errors
      queryClient.setQueryData(QUERY_KEYS.ALL_POKEMON_CARDS, (oldCardsCache: PokemonCard[]) =>
        oldCardsCache?.filter((oldCard) => oldCard.id !== validatedCard.id),
      )

      // return a context object with the previous state of the cache in case we need to rollback in the onError
      return { staleCache }
    },

    mutationFn: (card: PokemonCard) => deletePokemonCard(card.id),

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Deleted Pokemon Card: ${card.name}`)
    },

    onError(error, card, context) {
      console.error(`Error Deleting Pokemon Card: ${error}`)
      toast.error(`Error Deleting Pokemon Card ${card.name}`)
      queryClient.setQueryData(QUERY_KEYS.ALL_POKEMON_CARDS, context?.staleCache)
    },

    // more expensive, refetches anytime this mutation is called
    onSettled: async (data, _error, _card, _context) => {
      // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
      // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(data!.id) })
    },
  })
}
