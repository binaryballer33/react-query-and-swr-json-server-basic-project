import { Unstable_Grid2 as Grid } from "@mui/material/"
import useGetDragonBallZCardsQuery from "src/api/dragon-ball-z/queries/get-all-dragon-ball-z-cards"
import DragonBallZCardItem from "../card-item"

export default function DragonBallZCards() {
  // data is prefetched on the server we really don't need to check for the states, client gets the data instantly
  const { data: cards, isPending, error, isError } = useGetDragonBallZCardsQuery()
  // const { data: card, isPending: isLoadingCard, error: errorCard } = useGetDragonBallZCardById(1)

  if (isError) return <p>Error: {error.message}</p>
  if (isPending) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {/* List Of Dragon Ball Z Cards */}
      {cards.map((card) => (
        <DragonBallZCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
