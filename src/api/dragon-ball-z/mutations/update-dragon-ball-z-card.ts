/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function updateDragonBallZCard(card: DragonBallZCard) {
  return (await axiosInstance.put(QUERY_ROUTES.UPDATE_DRAGON_BALL_Z_CARD(card.id), card)).data
}

// TODO: should i be doing the zod schema.safeParse validation of the request body here
export default function useUpdateDragonBallZCardMutation() {
  const queryClient = useQueryClient()

  return useMutation<DragonBallZCard, Error, DragonBallZCard>({
    mutationFn: (card: DragonBallZCard) => updateDragonBallZCard(card),

    onMutate(variables) {},

    onError(error, variables, context) {
      console.error(`Error Updating Dragon Ball Z Card: ${error}`)
    },

    onSuccess(data, variables, context) {},

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRAGON_BALL_Z_CARD_BY_ID(data!.id) })
    },
  })
}
