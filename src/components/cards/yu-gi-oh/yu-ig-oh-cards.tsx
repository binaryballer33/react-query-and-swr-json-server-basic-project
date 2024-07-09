import { Unstable_Grid2 as Grid } from "@mui/material/"
import useGetYuGiOhCards from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"
import useGetYugiohCardById from "src/api/yu-gi-oh/queries/get-yu-gi-oh-card"
import YuGiOhCardItem from "./yu-gi-oh-card-item"

export default function YuGiOhCards() {
  const { data: cards, isLoading: isLoadingCards, error: errorCards } = useGetYuGiOhCards()
  // const { data: card, isLoading: isLoadingCard, error: errorCard } = useGetYugiohCardById(1)

  if (errorCards) return <p>Error: {errorCards.message}</p>
  if (isLoadingCards) return <p>Loading...</p>
  if (!cards) return <p>No cards found</p>

  // if (isLoadingCard) return <p>Loading...</p>
  // if (errorCard) return <p>Error: {errorCard.message}</p>
  // if (!card) return <p>Card not found</p>

  return (
    <Grid container gap={4} sx={{ display: "flex", justifyContent: "center" }}>
      {cards.map((card) => (
        <YuGiOhCardItem key={card.id} card={card} />
      ))}
    </Grid>
  )
}
