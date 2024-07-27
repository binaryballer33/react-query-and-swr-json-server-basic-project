import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import LastPageIcon from "@mui/icons-material/LastPage"
import { Button, Unstable_Grid2 as Grid } from "@mui/material/"
import { useState } from "react"
import useGetPokemonCardsQuery from "src/api/pokemon/queries/get-all-pokemon-cards"
import useGetPokemonCardsPaginatedQuery from "src/api/pokemon/queries/get-all-pokemon-cards-paginated"
import FlexEvenly from "src/components/base/flex-box/flex-evenly"
import PokemonCardItem from "../card-item"

// TODO: improve performance by using server side pagination, 150 pokemon cards are loading instantly but their interactive elements are not working until hydration is done, try to but all client side components in their own component
export default function PokemonCards() {
  // data is prefetched on the server we really don't need to check for the states, client gets the data instantly
  const { data: cards, isPending, isError, error } = useGetPokemonCardsQuery()
  // const { data: card, isPending: isLoadingCard, error: errorCard } = useGetPokemonCardById(1)

  const [page, setPage] = useState(1)

  if (isError) return <p>Error: {error.message}</p>
  if (isPending) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {/* List Of Pokemon Cards */}
      {cards.map((card) => (
        <PokemonCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
