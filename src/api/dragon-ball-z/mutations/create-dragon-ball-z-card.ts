/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { DragonBallZCardWithoutId } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function createDragonBallZCard(card: DragonBallZCardWithoutId) {
  return (await axiosInstance.post(QUERY_ROUTES.CREATE_DRAGON_BALL_Z_CARD, card)).data
}

export default function useCreateDragonBallZCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<DragonBallZCardWithoutId, Error, DragonBallZCardWithoutId>({
    mutationFn: (card: DragonBallZCardWithoutId) => createDragonBallZCard(card),

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Creating Dragon Ball Z Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })
    },
  })
}
