"use client"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Favorite from "@mui/icons-material/Favorite"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"
import { Divider, IconButton, Rating } from "@mui/material"
import Box from "@mui/material/Box"
import styled from "@mui/material/styles/styled"
import Image from "next/image"
import { SyntheticEvent, useCallback, useState } from "react"
import useDeleteDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/delete-dragon-ball-z-card"
import useDeletePokemonCardMutation from "src/api/pokemon/mutations/delete-pokemon-card"
import useDeleteYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/delete-yugioh-card"
import CardItemQuickViewDialog from "src/components/application-ui/dialogs/card-view-dialog/card-view-dialog"
import EditCardDialog from "src/components/application-ui/dialogs/edit-card/edit-card-form-dialog"
import FlexCenter from "src/components/base/flex-box/flex-center"
import FlexEvenly from "src/components/base/flex-box/flex-evenly"
import HoverBox from "src/components/base/styles/hover-box"
import { H4 } from "src/components/base/typography"
import useHeader from "src/hooks/use-header"
import { DeleteOrUpdateCardRequest } from "src/model/cards/card"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { PokemonCard } from "src/model/cards/pokemon"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"

export const Card = styled("div")(({ theme }) => ({
    height: "100%",
    borderRadius: "3px",
    transition: "all 0.3s",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[100]}`,
    ":hover": {
        "& .product-actions": { right: 5 },
        "& img": { transform: "scale(1.08)" },
        border: `1px solid ${theme.palette.neutral[800]}`,
    },
}))

export const CardMedia = styled("div")({
    width: "100%",
    maxHeight: 300,
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    "& img": { transition: "0.3s" },
})

export const StyledIconButton = styled(IconButton)({
    top: 10,
    right: -40,
    position: "absolute",
    transition: "right 0.3s .1s",
    zIndex: 1,
})

export const FavoriteButton = styled(IconButton)({
    top: 45,
    right: -40,
    position: "absolute",
    transition: "right 0.3s .2s",
    zIndex: 1,
})

type CardItemProps = {
    card: DeleteOrUpdateCardRequest
}

export default function CardItem({ card }: CardItemProps) {
    const { dialogOpen: editCardDialogOpen, toggleDialog: toggleEditCardDialog } = useHeader()
    const { dialogOpen: quickViewDialogOpen, toggleDialog: toggleQuickViewDialog } = useHeader()

    const [rating, setRating] = useState(4)
    const handleRatingChange = (_event: SyntheticEvent, rating: number | null) => setRating(rating!)

    const [isFavorite, setIsFavorite] = useState(false)
    const toggleFavorite = useCallback(() => setIsFavorite((fav) => !fav), [])

    const deleteYuGiOhCardMutation = useDeleteYuGiOhCardMutation()
    const deletePokemonCardMutation = useDeletePokemonCardMutation()
    const deleteDragonBallZCardMutation = useDeleteDragonBallZCardMutation()

    const handleDeleteCard = (card: DeleteOrUpdateCardRequest) => {
        if (card.game === GAME.YU_GI_OH) deleteYuGiOhCardMutation.mutate(card as YuGiOhCard)
        if (card.game === GAME.POKEMON) deletePokemonCardMutation.mutate(card as PokemonCard)
        if (card.game === GAME.DRAGON_BALL_Z) deleteDragonBallZCardMutation.mutate(card as DragonBallZCard)
    }

    return (
        <Card>
            <CardMedia>
                {/* Hover-able Card Image */}
                <HoverBox>
                    <Image src={card.img} alt={card.name} width={320} height={320} priority />
                </HoverBox>

                {/* Quick View Icon Within Card Image */}
                <StyledIconButton className="product-actions" onClick={toggleQuickViewDialog}>
                    <RemoveRedEye color="primary" fontSize="small" />
                </StyledIconButton>

                {/* Favorite Button */}
                <FavoriteButton className="product-actions" onClick={toggleFavorite}>
                    {isFavorite ? (
                        <Favorite color="primary" fontSize="small" />
                    ) : (
                        <FavoriteBorder color="primary" fontSize="small" />
                    )}
                </FavoriteButton>
            </CardMedia>

            {/* Quick View Dialog */}
            <CardItemQuickViewDialog
                dialogOpen={quickViewDialogOpen}
                toggleDialog={toggleQuickViewDialog}
                card={card}
            />

            {/* Card Content */}
            <Box p={2} textAlign="center">
                <Divider sx={{ border: 1 }} />

                {/* Card Type Specific Content */}
                <Box p={2}>
                    {/* TODO: Might prevent this from being given to this component */}
                    {/* <h2>Id: {card.id}</h2> */}

                    <H4>Name: {card.name}</H4>

                    {/* Dragon Ball Z Cards */}
                    {card.game === GAME.DRAGON_BALL_Z && <H4>Power: {card.powerLevel}</H4>}

                    {/* Pokémon Cards */}
                    {card.game === GAME.POKEMON && <H4>Type: {card.type}</H4>}

                    {/* Yu-Gi-Oh Cards */}
                    {card.game === GAME.YU_GI_OH && (
                        <>
                            <H4>Attack: {card.attack}</H4>
                            <H4>Defense: {card.defense}</H4>
                        </>
                    )}
                </Box>

                {/* Card Rating */}
                <FlexCenter gap={1} mb={2}>
                    <Rating
                        name="card-rating"
                        precision={0.5}
                        value={rating}
                        sx={{ fontSize: 14 }}
                        onChange={handleRatingChange}
                    />
                </FlexCenter>

                {/* Card Actions */}
                <FlexEvenly py={2}>
                    {/* Edit Card Icon And Modal Dialog */}
                    <IconButton aria-label="Edit Card" color="success" onClick={toggleEditCardDialog}>
                        <EditIcon />
                    </IconButton>
                    <EditCardDialog dialogOpen={editCardDialogOpen} toggleDialog={toggleEditCardDialog} card={card} />

                    {/* View Card Icon And Modal Dialog */}
                    <IconButton onClick={toggleQuickViewDialog}>
                        <RemoveRedEye color="primary" fontSize="small" />
                    </IconButton>

                    {/* Delete Card Icon */}
                    <IconButton aria-label="Delete Card" color="error" onClick={() => handleDeleteCard(card)}>
                        <DeleteIcon />
                    </IconButton>
                </FlexEvenly>
            </Box>
        </Card>
    )
}
