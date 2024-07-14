import { Unstable_Grid2 as Grid } from "@mui/material/"
import useGetPokemonCardsQuery from "src/api/pokemon/queries/get-all-pokemon-cards"
import PokemonCardItem from "../card-item"

export default function PokemonCards() {
  // because the data is being prefetched we really don't need to check for the isLoading state
  const { data: cards, isLoading, error } = useGetPokemonCardsQuery()
  // const { data: card, isLoading: isLoadingCard, error: errorCard } = useGetPokemonCardById(1)

  if (error) return <p>Error: {error.message}</p>
  if (isLoading) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  // if (isLoadingCard) return <p>Loading...</p>
  // if (errorCard) return <p>Error: {errorCard.message}</p>
  // if (!card) return <p>Card not found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {cards.map((card) => (
        <PokemonCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
