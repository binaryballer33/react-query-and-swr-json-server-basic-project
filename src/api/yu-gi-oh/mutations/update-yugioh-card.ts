/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function updateYuGiOhCard(card: YuGiOhCard) {
  return (await axiosInstance.put(QUERY_ROUTES.UPDATE_YUGIOH_CARD_BY_ID(card.id), card)).data
}

type MutationContext = {
  staleCache?: YuGiOhCard[]
}

export default function useUpdateYuGiOhCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<YuGiOhCard, Error, YuGiOhCard, MutationContext>({
    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      // if there's a validation error, the mutation will not be called and the onError will be called
      const validatedCard = deleteOrUpdateCardRequestSchema.parse(card)

      toast.loading(`Atempting To Update Yu-Gi-Oh Card: ${card.name}`, {
        duration: 500,
      })

      // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })

      // get the previous state of the cache before modifying the cache, for rollback on error purposes
      const staleCache = queryClient.getQueryData<YuGiOhCard[]>(QUERY_KEYS.ALL_YU_GI_OH_CARDS)

      // optimistically update the cache to what it should be if there are no errors
      queryClient.setQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS, (oldCardsCache: YuGiOhCard[]) =>
        oldCardsCache?.map((oldCard) => (oldCard.id === validatedCard.id ? validatedCard : oldCard)),
      )

      // return a context object with the previous state of the cache in case we need to rollback in the onError
      return { staleCache }
    },

    mutationFn: (card) => updateYuGiOhCard(card),

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Updated Yu-Gi-Oh Card: ${card.name} `)
    },

    onError(error, card, context) {
      console.error(`Error Updating Yu-Gi-Oh Card: ${error}`)
      toast.error(`Error Updating Yu-Gi-Oh Card ${card.name}: ${error}`)
      queryClient.setQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS, context?.staleCache)
    },

    // more expensive, refetches anytime this mutation is called
    onSettled: async (data, error, card, context) => {
      // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
      // await queryClient.invalidateQuersies({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(data!.id) })
    },
  })
}
