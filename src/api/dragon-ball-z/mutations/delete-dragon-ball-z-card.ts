/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import QUERY_KEYS from "src/api/query-keys"
import { deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function deleteDragonBallZCard(cardId: number) {
    return (await axiosInstance.delete(QUERY_ROUTES.DELETE_DRAGON_BALL_Z_CARD(cardId))).data
}

type MutationContext = {
    staleCache?: DragonBallZCard[]
}

export default function useDeleteDragonBallZCardMutation() {
    const queryClient = useQueryClient()

    return useMutation<DragonBallZCard, Error, DragonBallZCard, MutationContext>({
        // less expensive, does not refetch, uses data in cache
        onMutate: async (card) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            const validatedCard = deleteOrUpdateCardRequestSchema.parse(card)

            // cancel any outgoing refetches (so they don't overwrite our optimistic update), this is asynchronous
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })

            // get the previous state of the cache before modifying the cache, for rollback on error purposes
            const staleCache = queryClient.getQueryData<DragonBallZCard[]>(QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS)

            // optimistically update the cache to what it should be if there are no errors
            queryClient.setQueryData(QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS, (oldCardsCache: DragonBallZCard[]) =>
                oldCardsCache?.filter((oldCard) => oldCard.id !== validatedCard.id),
            )

            // return a context object with the previous state of the cache in case we need to rollback in the onError
            return { staleCache }
        },

        mutationFn: (card: DragonBallZCard) => deleteDragonBallZCard(card.id),

        onSuccess(_data, card, _context) {
            toast.success(`Successfully Deleted Dragon Ball Z Card: ${card.name}`)
        },

        onError(error, card, context) {
            console.error(`Error Deleting Dragon Ball Z Card: ${error}`)
            toast.error(`Error Deleting Dragon Ball Z Card ${card.name}`)
            queryClient.setQueryData(QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS, context?.staleCache)
        },

        // more expensive, refetches anytime this mutation is called
        onSettled: async (data, _error, _card, _context) => {
            // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS })
            // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRAGON_BALL_Z_CARD_BY_ID(data!.id) })
        },
    })
}
