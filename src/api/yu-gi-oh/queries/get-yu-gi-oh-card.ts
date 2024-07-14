import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import axiosInstance from "src/api/xhr-request-instance"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"

export async function getYugiohCardById(cardId: number) {
  return (await axiosInstance.get(QUERY_ROUTES.GET_YUGIOH_CARD_BY_ID(cardId))).data
}

export default function useGetYugiohCardByIdQuery(cardId: number) {
  return useQuery<YuGiOhCard>({
    queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(cardId),
    queryFn: () => getYugiohCardById(cardId),
  })
}
