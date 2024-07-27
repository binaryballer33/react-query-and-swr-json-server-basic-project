import { Unstable_Grid2 as Grid } from "@mui/material/"
import { useState } from "react"
import useGetPokemonCardsPaginatedQuery from "src/api/pokemon/queries/get-all-pokemon-cards-paginated"
import PaginationControls from "src/components/base/pagination/pagination-controls"
import PokemonCardItem from "../card-item"

export default function PokemonCardsPaginated() {
  // TODO: use server side pagination to improve performance and also to make the interactive elements work instantly, separate client side components in their own component
  const [page, setPage] = useState(1)
  const { isPending, isError, error, data: cards, isPlaceholderData } = useGetPokemonCardsPaginatedQuery(3, page)

  if (isError) return <p>Error: {error.message}</p>
  if (isPending) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  return (
    <>
      {/* Pagination Controls */}
      <PaginationControls page={page} setPage={setPage} isPlaceHolderData={isPlaceholderData} />

      {/* List Of Pokemon Cards */}
      <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
        {cards.map((card) => (
          <PokemonCardItem key={card.id} card={card} />
        ))}
      </Grid>
    </>
  )
}
