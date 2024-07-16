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

    onMutate(card) {
      toast.loading(`Atempting To Create Yu-Gi-Oh Card: ${card.name}`, {
        duration: 500,
      })
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
