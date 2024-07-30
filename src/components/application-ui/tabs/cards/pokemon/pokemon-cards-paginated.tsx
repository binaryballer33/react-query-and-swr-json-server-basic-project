import { Unstable_Grid2 as Grid } from "@mui/material/"
import { useSearchParams } from "next/navigation"
import useGetPokemonCardsPaginatedQuery from "src/api/pokemon/queries/get-all-pokemon-cards-paginated"
import PaginationControls from "src/components/base/pagination/pagination-controls"
import PokemonCardItem from "../card-item"

export default function PokemonCardsPaginated() {
    const searchParams = useSearchParams()
    const limit = parseInt(searchParams.get("_limit") ?? "25", 10)
    const page = parseInt(searchParams.get("_page") ?? "1", 10)
    const { isPending, isError, error, data: cards, isPlaceholderData } = useGetPokemonCardsPaginatedQuery()

    if (isError) return <p>Error: {error.message}</p>
    if (isPending) return <p>Loading...</p>
    if (!cards) return <p>No cards found</p>

    const firstCard = (page - 1) * limit
    const lastCard = Math.min(page * limit, cards.length)
    const paginatedCards = cards.slice(firstCard, lastCard)

    return (
        <>
            {/* Pagination Controls */}
            <PaginationControls
                limit={limit}
                page={page}
                firstItem={firstCard}
                lastItem={lastCard}
                isPlaceHolderData={isPlaceholderData}
                items={cards}
            />

            {/* List Of Pokémon Cards */}
            <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
                {paginatedCards?.map((card) => <PokemonCardItem key={card.id} card={card} />)}
            </Grid>
        </>
    )
}
