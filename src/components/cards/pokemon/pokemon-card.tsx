import { Unstable_Grid2 as Grid } from "@mui/material/"
import { useGetPokemonCards } from "src/services/queries"
import PokemonCardItem from "./pokemon-card-item"

export default function PokemonCards() {
  const { data: cards, isLoading, error } = useGetPokemonCards()

  if (error) return <p>Error: {error.message}</p>
  if (isLoading) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {cards.map((card) => (
        <PokemonCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
