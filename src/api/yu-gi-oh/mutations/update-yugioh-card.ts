/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function updateYuGiOhCard(card: YuGiOhCard) {
  return (await axiosInstance.put(QUERY_ROUTES.UPDATE_YUGIOH_CARD_BY_ID(card.id), card)).data
}

// TODO: should i be doing the zod schema.safeParse validation of the request body here
// TODO: shaq this is me talking to you, my answer is yes, get that shit out of the damn component, do it in the onMutate
// TODO: figure out why i can't use the appropriate QUERY_KEY to update, create and delete the cards
export default function useUpdateYuGiOhCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<YuGiOhCard, Error, YuGiOhCard>({
    mutationFn: (card: YuGiOhCard) => updateYuGiOhCard(card),

    // less expensive, does not refetch, uses data in cache
    onMutate: async (card) => {
      toast.loading(`Atempting To Update Yu-Gi-Oh Card: ${card.name}`, {
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
      console.error(`Error Updating Yu-Gi-Oh Card: ${error}`)
      toast.error(`Error Updating Yu-Gi-Oh Card ${card.name}: ${error}`)
    },

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Updated Yu-Gi-Oh Card: ${card.name} `)
    },

    // more expensive, refetches anytime this mutation is called
    onSettled(data, error, card, context) {
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
      // queryClient.invalidateQuersies({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(data!.id) })
    },
  })
}
