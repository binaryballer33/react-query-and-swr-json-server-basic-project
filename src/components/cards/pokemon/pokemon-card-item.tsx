import { Box, Divider, Unstable_Grid2 as Grid } from "@mui/material"
import Image from "next/image"
import React from "react"
import { PokemonCard } from "src/model/pokemon"

type PokemonCardItemProps = {
  card: PokemonCard
}

export default function PokemonCardItem({ card }: PokemonCardItemProps) {
  return (
    <Grid sx={{ background: "#f1f1f1", border: 1 }}>
      <Image src={card.img} alt={card.name} width={320} height={320} />
      <Divider sx={{ border: 1 }} />

      <Box p={2}>
        <h2>Id: {card.id}</h2>
        <h3>Name: {card.name}</h3>
        <h4>Type: {card.type}</h4>
      </Box>
    </Grid>
  )
}
