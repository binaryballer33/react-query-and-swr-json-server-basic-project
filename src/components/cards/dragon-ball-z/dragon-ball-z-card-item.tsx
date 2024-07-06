import { Box, Divider, Unstable_Grid2 as Grid } from "@mui/material"
import Image from "next/image"
import { DragonBallZCard } from "src/model/dragon-ball-z"

type DragonBallZCardItemProps = {
  card: DragonBallZCard
}

export default function DragonBallZCardItem({ card }: DragonBallZCardItemProps) {
  return (
    <Grid sx={{ background: "#f1f1f1", border: 1 }}>
      <Image src={card.img} alt={card.name} width={320} height={320} />
      <Divider sx={{ border: 1 }} />
      <Box p={2}>
        <h2>Id: {card.id}</h2>
        <h3>Name: {card.name}</h3>
        <h4>Power: {card.power}</h4>
      </Box>
    </Grid>
  )
}
