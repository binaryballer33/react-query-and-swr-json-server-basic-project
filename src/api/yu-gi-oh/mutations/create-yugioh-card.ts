/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Creating YuGiOh Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
    },
  })
}
