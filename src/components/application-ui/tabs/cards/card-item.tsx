import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Box, Divider, Unstable_Grid2 as Grid, IconButton } from "@mui/material"
import Image from "next/image"
import useDeleteDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/delete-dragon-ball-z-card"
import useDeletePokemonCardMutation from "src/api/pokemon/mutations/delete-pokemon-card"
import useDeleteYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/delete-yugioh-card"
import useHeader from "src/hooks/use-header"
import { DeleteOrUpdateCardRequest } from "src/model/cards/card" // Import the union type
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { PokemonCard } from "src/model/cards/pokemon"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import EditCardDialog from "../../dialogs/edit-card/edit-card-form-dialog"

type CardItemProps = {
  card: DeleteOrUpdateCardRequest
}

export default function CardItem({ card }: CardItemProps) {
  const deleteYuGiOhCardMutation = useDeleteYuGiOhCardMutation()
  const deletePokemonCardMutation = useDeletePokemonCardMutation()
  const deleteDragonBallZCardMutation = useDeleteDragonBallZCardMutation()
  const { dialogOpen, toggleDialog } = useHeader()

  const handleDeleteCard = (card: DeleteOrUpdateCardRequest) => {
    if (card.game === GAME.YU_GI_OH) deleteYuGiOhCardMutation.mutate(card as YuGiOhCard)
    if (card.game === GAME.POKEMON) deletePokemonCardMutation.mutate(card as PokemonCard)
    if (card.game === GAME.DRAGON_BALL_Z) deleteDragonBallZCardMutation.mutate(card as DragonBallZCard)
  }

  return (
    <Grid key={card.id} sx={{ background: (theme) => theme.palette.background.paper, border: 1 }}>
      {/* Card Image */}
      <Image src={card.img} alt={card.name} width={320} height={320} priority />
      <Divider sx={{ border: 1 }} />

      {/* Card Content */}
      <Box p={2}>
        {/* TODO: Might prevent this from being given to this component */}
        {/* <h2>Id: {card.id}</h2> */}
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

      {/* Card Actions */}
      <Box display="flex" justifyContent="space-evenly" py={2}>
        {/* Edit Card Icon And Modal Dialog */}
        <IconButton aria-label="Edit Card" color="success" onClick={toggleDialog}>
          <EditIcon />
        </IconButton>
        <EditCardDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog} card={card} />

        <IconButton aria-label="Delete Card" color="error" onClick={() => handleDeleteCard(card)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Grid>
  )
}
