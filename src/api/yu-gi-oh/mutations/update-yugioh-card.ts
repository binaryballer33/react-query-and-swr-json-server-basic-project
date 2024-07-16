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
export default function useUpdateYuGiOhCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<YuGiOhCard, Error, YuGiOhCard>({
    mutationFn: (card: YuGiOhCard) => updateYuGiOhCard(card),

    onMutate(card) {
      toast.loading(`Atempting To Update Yu-Gi-Oh Card: ${card.name}`, {
        duration: 500,
      })
    },

    onError(error, card, context) {
      console.error(`Error Updating Yu-Gi-Oh Card: ${error}`)
      toast.error(`Error Updating Yu-Gi-Oh Card ${card.name}: ${error}`)
    },

    onSuccess(_data, card, _context) {
      toast.success(`Successfully Updated Yu-Gi-Oh Card: ${card.name} `)
    },

    onSettled(data, error, card, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(data!.id) })
    },
  })
}
