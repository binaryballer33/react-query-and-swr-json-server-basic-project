import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function getDragonBallZCards() {
    return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_DRAGON_BALL_Z_CARDS)).data
}

export default function useGetDragonBallZCardsQuery() {
    return useQuery<DragonBallZCard[]>({
        queryKey: QUERY_KEYS.ALL_DRAGON_BALL_Z_CARDS,
        queryFn: getDragonBallZCards,
    })
}
