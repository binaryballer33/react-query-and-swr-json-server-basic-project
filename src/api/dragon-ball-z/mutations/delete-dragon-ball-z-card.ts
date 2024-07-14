/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function deleteDragonBallZCard(cardId: number) {
  return (await axiosInstance.delete(QUERY_ROUTES.DELETE_DRAGON_BALL_Z_CARD(cardId))).data
}

export default function useDeleteDragonBallZCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<DragonBallZCard, Error, DragonBallZCard>({
    mutationFn: (card: DragonBallZCard) => deleteDragonBallZCard(card.id),

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Deleting Dragon Ball Z Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRAGON_BALL_Z_CARD_BY_ID(data!.id) })
    },
  })
}
