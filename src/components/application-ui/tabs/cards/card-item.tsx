import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Box, Divider, Unstable_Grid2 as Grid, IconButton } from "@mui/material"
import Image from "next/image"
import useDeleteDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/delete-dragon-ball-z-card"
import useUpdateDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/update-dragon-ball-z-card"
import useDeletePokemonCardMutation from "src/api/pokemon/mutations/delete-pokemon-card"
import useUpdatePokemonCardMutation from "src/api/pokemon/mutations/update-pokemon-card"
import useDeleteYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/delete-yugioh-card"
import useUpdateYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/update-yugioh-card"
import { DeleteOrUpdateCardRequest } from "src/model/cards/card" // Import the union type
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { PokemonCard } from "src/model/cards/pokemon"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"

type CardItemProps = {
  card: DeleteOrUpdateCardRequest
}

export default function CardItem({ card }: CardItemProps) {
  const deleteYuGiOhCardMutation = useDeleteYuGiOhCardMutation()
  const deletePokemonCardMutation = useDeletePokemonCardMutation()
  const deleteDragonBallZCardMutation = useDeleteDragonBallZCardMutation()

  const updateYuGiOhCardMutation = useUpdateYuGiOhCardMutation()
  const updatePokemonCardMutation = useUpdatePokemonCardMutation()
  const updateDragonBallZCardMutation = useUpdateDragonBallZCardMutation()

  // when the user clicks the edit button a dialog will open with the card data for editing
  const handleEditCard = (card: DeleteOrUpdateCardRequest) => {
    if (card.game === GAME.YU_GI_OH) updateYuGiOhCardMutation.mutate(card as YuGiOhCard)
    if (card.game === GAME.POKEMON) updatePokemonCardMutation.mutate(card as PokemonCard)
    if (card.game === GAME.DRAGON_BALL_Z) updateDragonBallZCardMutation.mutate(card as DragonBallZCard)
  }

  const handleDeleteCard = (card: DeleteOrUpdateCardRequest) => {
    if (card.game === GAME.YU_GI_OH) deleteYuGiOhCardMutation.mutate(card as YuGiOhCard)
    if (card.game === GAME.POKEMON) deletePokemonCardMutation.mutate(card as PokemonCard)
    if (card.game === GAME.DRAGON_BALL_Z) deleteDragonBallZCardMutation.mutate(card as DragonBallZCard)
  }

  return (
    <Grid sx={{ background: (theme) => theme.palette.background.paper, border: 1 }}>
      <Image src={card.img} alt={card.name} width={320} height={320} />
      <Divider sx={{ border: 1 }} />
      <Box p={2}>
        <h2>Id: {card.id}</h2>
        <h3>Name: {card.name}</h3>

        {/* Dragon Ball Z Cards */}
        {card.game === GAME.DRAGON_BALL_Z && <h4>Power: {card.powerLevel}</h4>}

        {/* Pokemon Cards */}
        {card.game === GAME.POKEMON && <h4>Type: {card.type}</h4>}

        {/* Yu-Gi-Oh Cards */}
        {card.game === GAME.YU_GI_OH && (
          <>
            <h4>Attack: {card.attack}</h4>
            <h4>Defense: {card.defense}</h4>
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="space-evenly" py={2}>
        <IconButton aria-label="Edit Card" color="success" onClick={() => handleEditCard(card)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete Card" color="error" onClick={() => handleDeleteCard(card)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Grid>
  )
}
