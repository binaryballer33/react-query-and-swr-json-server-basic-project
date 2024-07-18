/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { YuGiOhCardWithoutId } from "src/model/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function createYuGiOhCard(card: YuGiOhCardWithoutId) {
  return (await axiosInstance.post(QUERY_ROUTES.CREATE_YUGIOH_CARD, card)).data
}

export default function useCreateYuGiOhCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<YuGiOhCardWithoutId, Error, YuGiOhCardWithoutId>({
    mutationFn: (card: YuGiOhCardWithoutId) => createYuGiOhCard(card),

    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      toast.loading(`Atempting To Create Yu-Gi-Oh Card: ${card.name}`, {
        duration: 500,
      })

      // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })

      // get the previous state of the cache before modifying the cache, for rollback on error purposes
      const oldQueryCacheContext = queryClient.getQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS)

      // optimistically update the cache to what it should be if there are no errors
      queryClient.setQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS, (old) => (old ? [...old, card] : [card]))

      // return a context object with the previous state of the cache in case we need to rollback in the onError
      return { oldQueryCacheContext }
    },

    onError(error, card, context) {
      console.error(`Error Creating Yu-Gi-Oh Card: ${error}`)
      toast.error(`Error Creating Yu-Gi-Oh Card ${card.name}: ${error}`)
    },

    onSuccess(data, card, context) {
      toast.success(`Successfully Created Yu-Gi-Oh Card: ${card.name} `)
    },

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
    },
  })
}
