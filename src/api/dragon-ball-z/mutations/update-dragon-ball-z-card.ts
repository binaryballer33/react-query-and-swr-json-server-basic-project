/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function updateDragonBallZCard(card: DragonBallZCard) {
  return (await axiosInstance.put(QUERY_ROUTES.UPDATE_DRAGON_BALL_Z_CARD(card.id), card)).data
}

type MutationContext = {
  staleCache?: DragonBallZCard[]
}

export default function useUpdateDragonBallZCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<DragonBallZCard, Error, DragonBallZCard, MutationContext>({
    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      // if there's a validation error, the mutation will not be called and the onError will be called
      const validatedCard = deleteOrUpdateCardRequestSchema.parse(card)

      // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })

      // get the previous state of the cache before modifying the cache, for rollback on error purposes
      const staleCache = queryClient.getQueryData<DragonBallZCard[]>(QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS)

      // optimistically update the cache to what it should be if there are no errors
      queryClient.setQueryData(QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS, (oldCardsCache: DragonBallZCard[]) =>
        oldCardsCache?.map((oldCard) => (oldCard.id === validatedCard.id ? validatedCard : oldCard)),
      )

      // return a context object with the previous state of the cache in case we need to rollback in the onError
      return { staleCache }
    },

    mutationFn: (card: DragonBallZCard) => updateDragonBallZCard(card),

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Updated Dragon Ball Z Card: ${card.name}`)
    },

    onError(error, card, context) {
      console.error(`Error Updating Dragon Ball Z Card: ${error}`)
      toast.error(`Error Updating Dragon Ball Z Card: ${card.name}`)
      queryClient.setQueryData(QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS, context?.staleCache)
    },

    // more expensive, refetches anytime this mutation is called
    onSettled: async (data, _error, _card, _context) => {
      // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })
      // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRAGON_BALL_Z_CARD_BY_ID(data!.id) })
    },
  })
}
