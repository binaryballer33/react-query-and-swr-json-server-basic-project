import { Unstable_Grid2 as Grid } from "@mui/material/"
import { useGetDragonBallZCards } from "src/services/queries"
import DragonBallZCardItem from "./dragon-ball-z-card-item"

export default function DragonBallZCards() {
  const { data: cards, isLoading, error } = useGetDragonBallZCards()

  if (error) return <p>Error: {error.message}</p>
  if (isLoading) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {cards.map((card) => (
        <DragonBallZCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
