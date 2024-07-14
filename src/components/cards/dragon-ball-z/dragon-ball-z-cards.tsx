import { Unstable_Grid2 as Grid } from "@mui/material/"
import useGetDragonBallZCardsQuery from "src/api/dragon-ball-z/queries/get-all-dragon-ball-z-cards"
import DragonBallZCardItem from "./dragon-ball-z-card-item"

export default function DragonBallZCards() {
  const { data: cards, isLoading, error } = useGetDragonBallZCardsQuery()
  // const { data: card, isLoading: isLoadingCard, error: errorCard } = useGetDragonBallZCardById(1)

  if (error) return <p>Error: {error.message}</p>
  if (isLoading) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  // if (isLoadingCard) return <p>Loading...</p>
  // if (errorCard) return <p>Error: {errorCard.message}</p>
  // if (!card) return <p>Card not found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {cards.map((card) => (
        <DragonBallZCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
