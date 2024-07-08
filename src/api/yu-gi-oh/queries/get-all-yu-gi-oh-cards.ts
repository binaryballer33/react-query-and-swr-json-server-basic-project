import { useQuery } from "@tanstack/react-query"
import { YuGiOhCard } from "src/model/yu-gi-oh"
import QUERY_ROUTES from "src/router/query-routes"
import axiosInstance from "../../xhr-request-instance"

async function getYuGiOhCards() {
  return (await axiosInstance.get(QUERY_ROUTES.GET_ALL_YUGIOH_CARDS)).data
}

export default function useGetYuGiOhCards() {
  return useQuery<YuGiOhCard[]>({
    queryKey: ["yu-gi-oh-cards"],
    queryFn: getYuGiOhCards,
  })
}
