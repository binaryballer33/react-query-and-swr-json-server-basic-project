"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    Dialog,
    Unstable_Grid2 as Grid,
    MenuItem,
    Select,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material"
import { useCallback } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import useUpdateDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/update-dragon-ball-z-card"
import useUpdatePokemonCardMutation from "src/api/pokemon/mutations/update-pokemon-card"
import useUpdateYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/update-yugioh-card"
import { DeleteOrUpdateCardRequest, deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { PokemonCard, pokemonCardSchemaWithoutId } from "src/model/cards/pokemon"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import EditCardInput from "./edit-card-form-input"

type EditCardProps = {
    toggleDialog: () => void
    card: DeleteOrUpdateCardRequest
    dialogOpen: boolean
}

export default function EditCardDialog(props: EditCardProps) {
    const { toggleDialog, dialogOpen, card } = props
    const { t } = useTranslation()
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))

    const {
        register: registerInputField,
        handleSubmit: handleSubmitHookForm,
        watch: watchFormField,
        setValue: setFormValue,
        formState: { errors },
        control: controlSelectInputField, // control is passed into the Controller component
    } = useForm<DeleteOrUpdateCardRequest>({
        defaultValues: card,
        resolver: zodResolver(deleteOrUpdateCardRequestSchema),
    })

    function useUpdateCardMutation(card: DeleteOrUpdateCardRequest) {
        const updateYuGiOhCardMutation = useUpdateYuGiOhCardMutation()
        const updatePokemonCardMutation = useUpdatePokemonCardMutation()
        const updateDragonBallZCardMutation = useUpdateDragonBallZCardMutation()

        switch (card.game) {
            case GAME.YU_GI_OH:
                return {
                    data: updateYuGiOhCardMutation.data,
                    isPending: updateYuGiOhCardMutation.isPending,
                    isSuccess: updateYuGiOhCardMutation.isSuccess,
                    isError: updateYuGiOhCardMutation.isError,
                    mutate: (card: DeleteOrUpdateCardRequest) => updateYuGiOhCardMutation.mutate(card as YuGiOhCard),
                }
            case GAME.POKEMON:
                return {
                    data: updatePokemonCardMutation.data,
                    isPending: updatePokemonCardMutation.isPending,
                    isSuccess: updatePokemonCardMutation.isSuccess,
                    isError: updatePokemonCardMutation.isError,
                    mutate: (card: DeleteOrUpdateCardRequest) => updatePokemonCardMutation.mutate(card as PokemonCard),
                }
            case GAME.DRAGON_BALL_Z:
                return {
                    data: updateDragonBallZCardMutation.data,
                    isPending: updateDragonBallZCardMutation.isPending,
                    isSuccess: updateDragonBallZCardMutation.isSuccess,
                    isError: updateDragonBallZCardMutation.isError,
                    mutate: (card: DeleteOrUpdateCardRequest) =>
                        updateDragonBallZCardMutation.mutate(card as DragonBallZCard),
                }
            default:
                throw new Error("Invalid game type")
        }
    }

    const { isPending, mutate: updateCardMutation } = useUpdateCardMutation(card)

    const handleSubmit: SubmitHandler<DeleteOrUpdateCardRequest> = useCallback(
        async (cardData: DeleteOrUpdateCardRequest): Promise<void> => {
            updateCardMutation(cardData)
            toggleDialog() // Close the dialog
        },
        [toggleDialog, updateCardMutation],
    )

    // get the text fields from the card, but leave out a few fields
    const inputFields = Object.keys(card).filter((field) => !["game", "id", "type"].includes(field))
    const pokemonTypes = pokemonCardSchemaWithoutId.shape.type.options.map(String) // get the string[] of pokemon types from the schema

    return (
        <Dialog scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog}>
            <Card sx={{ minWidth: "50%", padding: "2rem 3rem" }}>
                <form
                    onSubmit={handleSubmitHookForm(handleSubmit)}
                    style={{ display: "flex", flexDirection: "column", minHeight: "75dvh", padding: "64px 0px" }}
                >
                    {/* Form Header */}
                    <Container maxWidth="sm">
                        <Typography align="center" variant="h4" gutterBottom>
                            {t(`Edit Card: ${card.name}`)}
                        </Typography>
                    </Container>

                    {/* Form Content */}
                    <Stack mt={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
                        {/* Form Inputs Below */}
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                {/* Create Input Fields */}
                                {inputFields.map((inputName) => {
                                    return (
                                        <EditCardInput
                                            key={inputName}
                                            register={registerInputField}
                                            errors={errors}
                                            inputName={inputName as keyof DeleteOrUpdateCardRequest}
                                            placeholder={inputName}
                                            watchFormField={watchFormField}
                                            setFormValue={setFormValue}
                                        />
                                    )
                                })}

                                {/* Select Pokemon Type From Dropdown */}
                                {card.game === GAME.POKEMON && (
                                    <Grid xs={12}>
                                        <Box mb="15px" pl={1}>
                                            <Typography variant="h6" component="label">
                                                {t("Type")}
                                            </Typography>
                                        </Box>
                                        {/* Controller Manages Components Like Select and manage their state and validation */}
                                        <Controller
                                            name="type" // name of the field
                                            control={controlSelectInputField} // manages the form's state and validation.
                                            /*
                                             * The render prop is a function that takes an object with a field property.
                                             * This field object contains methods and properties to manage the input's state and events.
                                             * The field object is spread into the Select component using {...field},
                                             * which binds the Select component to the form's state and validation.
                                             */
                                            render={({ field }) => (
                                                <Select {...field} fullWidth>
                                                    {pokemonTypes.map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </Grid>
                                )}

                                {/* Submit Button */}
                                <Grid xs={12}>
                                    <Button
                                        disabled={isPending}
                                        variant="contained"
                                        type="submit"
                                        size="large"
                                        fullWidth
                                    >
                                        {isPending ? t("Updating Card") : t("Update Card")}
                                    </Button>
                                </Grid>

                                {/* Error Alert */}
                                {errors.root && (
                                    <Grid xs={12}>
                                        <Alert variant="outlined" severity="error">
                                            {t(errors.root.message as string)}
                                        </Alert>
                                    </Grid>
                                )}
                            </Grid>
                        </Container>
                    </Stack>
                </form>
            </Card>
        </Dialog>
    )
}
