/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { PokemonCard } from "src/model/cards/pokemon"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function updatePokemonCard(card: PokemonCard) {
  return (await axiosInstance.put(QUERY_ROUTES.UPDATE_POKEMON_CARD_BY_ID(card.id), card)).data
}

type MutationContext = {
  staleCache?: PokemonCard[]
}

// TODO: should i be doing the zod schema.safeParse validation of the request body here
export default function useUpdatePokemonCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<PokemonCard, Error, PokemonCard, MutationContext>({
    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      // if there's a validation error, the mutation will not be called and the onError will be called
      const validatedCard = deleteOrUpdateCardRequestSchema.parse(card)

      toast.loading(`Attempting To Update Pokemon Card: ${card.name}`, {
        duration: 500,
      })

      // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })

      // get the previous state of the cache before modifying the cache, for rollback on error purposes
      const staleCache = queryClient.getQueryData<PokemonCard[]>(QUERY_KEYS.ALL_POKEMON_CARDS)

      // optimistically update the cache to what it should be if there are no errors
      queryClient.setQueryData(QUERY_KEYS.ALL_POKEMON_CARDS, (oldCardsCache: PokemonCard[]) =>
        oldCardsCache?.map((oldCard) => (oldCard.id === validatedCard.id ? validatedCard : oldCard)),
      )

      // return a context object with the previous state of the cache in case we need to rollback in the onError
      return { staleCache }
    },

    mutationFn: (card: PokemonCard) => updatePokemonCard(card),

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Updated Pokemon Card: ${card.name}`)
    },

    onError(error, card, context) {
      console.error(`Error Updating Pokemon Card: ${error}`)
      toast.error(`Error Updating Pokemon Card: ${card.name}`)
      queryClient.setQueryData(QUERY_KEYS.ALL_POKEMON_CARDS, context?.staleCache)
    },

    // more expensive, refetches anytime this mutation is called
    onSettled(data, _error, _card, _context) {
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(data!.id) })
    },
  })
}
