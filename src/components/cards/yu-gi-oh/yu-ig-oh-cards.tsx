import { Unstable_Grid2 as Grid } from "@mui/material/"
import { useGetYuGiOhCards } from "src/services/queries"
import YuGiOhCardItem from "./yu-gi-oh-card-item"

export default function YuGiOhCards() {
  const { data: cards, isLoading, error } = useGetYuGiOhCards()

  if (error) return <p>Error: {error.message}</p>
  if (isLoading) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {cards.map((card) => (
        <YuGiOhCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
