/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Deleting YuGiOh Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(data!.id) })
    },
  })
}
