import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import axiosInstance from "src/api/xhr-request-instance"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"

export async function getDragonBallZCardById(cardId: number) {
    return (await axiosInstance.get(QUERY_ROUTES.GET_DRAGON_BALL_Z_CARD_BY_ID(cardId))).data
}

export default function useGetDragonBallZCardByIdQuery(cardId: number) {
    return useQuery<DragonBallZCard>({
        queryKey: QUERY_KEYS.DRAGON_BALL_Z_CARD_BY_ID(cardId),
        queryFn: () => getDragonBallZCardById(cardId),
    })
}
