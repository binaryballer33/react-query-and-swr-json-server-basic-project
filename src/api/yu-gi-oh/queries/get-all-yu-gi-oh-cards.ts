import { useQuery } from "@tanstack/react-query"
import QUERY_KEYS from "src/api/query-keys"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

export async function getYuGiOhCards() {
  return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_YUGIOH_CARDS)).data
}

export default function useGetYuGiOhCardsQuery() {
  return useQuery<YuGiOhCard[]>({
    queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS,
    queryFn: getYuGiOhCards,
  })
}
