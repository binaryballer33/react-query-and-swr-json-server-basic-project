import { Box, Divider, Unstable_Grid2 as Grid } from "@mui/material"
import Image from "next/image"
import React from "react"
import { YuGiOhCard } from "src/model/yu-gi-oh"

type YuGiOhCardItemProps = {
  card: YuGiOhCard
}

export default function YuGiOhCardItem({ card }: YuGiOhCardItemProps) {
  return (
    <Grid sx={{ background: "#f1f1f1", border: 1 }}>
      <Image src={card.img} alt={card.name} width={320} height={320} />
      <Divider sx={{ border: 1 }} />
      <Box p={2}>
        <h3>Name: {card.name}</h3>
        <h2>Id: {card.id}</h2>
        <h4>ATK: {card.atk}</h4>
        <h4>DEF: {card.def}</h4>
      </Box>
    </Grid>
  )
}
