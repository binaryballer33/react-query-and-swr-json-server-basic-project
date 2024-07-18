/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function deleteYuGiOhCard(cardId: number) {
  return (await axiosInstance.delete(QUERY_ROUTES.DELETE_YUGIOH_CARD_BY_ID(cardId))).data
}

export default function useDeleteYuGiOhCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<YuGiOhCard, Error, YuGiOhCard>({
    mutationFn: (card: YuGiOhCard) => deleteYuGiOhCard(card.id),

    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      toast.loading(`Attempting To Delete Yu-Gi-Oh Card: ${card.name}`, {
        duration: 500,
      })

      // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })

      // get the previous state of the cache before modifying the cache, for rollback on error purposes
      const oldQueryCacheContext = queryClient.getQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS)

      // optimistically update the cache to what it should be if there are no errors
      queryClient.setQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS, (old) => old?.filter((oldCard) => oldCard.id !== card.id))

      // return a context object with the previous state of the cache in case we need to rollback in the onError
      return { oldQueryCacheContext }
    },

    onError(error, card, _context) {
      console.error(`Error Deleting Yu-Gi-Oh Card: ${error}`)
      toast.error(`Error Deleting Yu-Gi-Oh Card ${card.name}: ${error}`)
    },

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Deleted Yu-Gi-Oh Card: ${card.name}`)
    },

    // more expensive, refetches anytime this mutation is called
    onSettled(data, _error, _variables, _context) {
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(data!.id) })
    },
  })
}
