import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Box, Divider, Unstable_Grid2 as Grid, IconButton } from "@mui/material"
import Image from "next/image"
import { DragonBallZCard } from "src/model/dragon-ball-z"

type DragonBallZCardItemProps = {
  card: DragonBallZCard
}

export default function DragonBallZCardItem({ card }: DragonBallZCardItemProps) {
  const handleEditCard = () => {
    // alert("Edit Card")
  }

  const handleDeleteCard = () => {
    // alert("Delete Card")
  }

  return (
    <Grid sx={{ background: (theme) => theme.palette.background.paper, border: 1 }}>
      <Image src={card.img} alt={card.name} width={320} height={320} />
      <Divider sx={{ border: 1 }} />
      <Box p={2}>
        <h2>Id: {card.id}</h2>
        <h3>Name: {card.name}</h3>
        <h4>Power: {card.power}</h4>
      </Box>
      <Box display="flex" justifyContent="center">
        <IconButton aria-label="Edit Card" color="success" onClick={() => handleEditCard()}>
          <EditIcon />
        </IconButton>

        <IconButton aria-label="Delete Card" color="error" onClick={() => handleDeleteCard()}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Grid>
  )
}
