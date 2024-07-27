import { Unstable_Grid2 as Grid } from "@mui/material/"
import useGetYuGiOhCardsQuery from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"
import useGetYugiohCardByIdQuery from "src/api/yu-gi-oh/queries/get-yu-gi-oh-card"
import YuGiOhCardItem from "../card-item"

export default function YuGiOhCards() {
  // data is prefetched on the server we really don't need to check for the states, client gets the data instantly
  const { data: cards, isPending, error, isError } = useGetYuGiOhCardsQuery()
  // const { data: card, isLoading: isLoadingCard, error: errorCard } = useGetYugiohCardById(1)

  if (isError) return <p>Error: {error.message}</p>
  if (isPending) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {/* List Of Yu-Gi-Oh Cards */}
      {cards.map((card) => (
        <YuGiOhCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
