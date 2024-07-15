"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Container, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material"
import { useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import useUpdateDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/update-dragon-ball-z-card"
import useUpdatePokemonCardMutation from "src/api/pokemon/mutations/update-pokemon-card"
import useUpdateYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/update-yugioh-card"
import { DeleteOrUpdateCardRequest, deleteOrUpdateCardRequestSchema } from "src/model/cards/card"
import { DragonBallZCard } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { PokemonCard } from "src/model/cards/pokemon"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import EditCardInput from "./edit-card-form-input"

type EditCardProps = {
  closeDialog: () => void
  card: DeleteOrUpdateCardRequest
}

// TODO: make the edit card type input for pokemon become a select with menu items component later
export default function EditCard(props: EditCardProps) {
  const { closeDialog, card } = props
  const { t } = useTranslation()

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
          mutate: (card: DeleteOrUpdateCardRequest) => updateDragonBallZCardMutation.mutate(card as DragonBallZCard),
        }
      default:
        throw new Error("Invalid game type")
    }
  }

  const { isPending, mutate: updateCardMutation } = useUpdateCardMutation(card)

  // when the user clicks the edit button a dialog will open with the card data for editing
  const handleEditCard = useCallback(
    (card: DeleteOrUpdateCardRequest) => {
      updateCardMutation(card)
    },
    [updateCardMutation],
  )

  const {
    register: registerInputField,
    handleSubmit: handleSubmitHookForm,
    watch: watchFormField,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<DeleteOrUpdateCardRequest>({
    defaultValues: card,
    resolver: zodResolver(deleteOrUpdateCardRequestSchema),
  })

  const handleSubmit: SubmitHandler<DeleteOrUpdateCardRequest> = useCallback(
    async (cardData: DeleteOrUpdateCardRequest): Promise<void> => {
      const {
        data: validatedRequestBody,
        success: validationSuccessfulForRequestBody,
        error: validationError,
      } = deleteOrUpdateCardRequestSchema.safeParse(cardData)

      if (!validationSuccessfulForRequestBody) {
        // eslint-disable-next-line no-console
        console.error(validationError.errors)
        toast.error(t("Failed To Update Card, Invalid Form Data")) // Show an error toast message
        return
      }

      handleEditCard(validatedRequestBody)

      toast.success(t(`Successfully Updated: ${card.name}`)) // Show a success toast message

      closeDialog() // Close the dialog
    },
    [closeDialog, handleEditCard, t, card],
  )

  // get the text fields from the initial form state, leave out the game field, needs to be a select field
  const inputFields = Object.keys(card).filter((field) => field !== "game")

  return (
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

            {/* Submit Button */}
            <Grid xs={12}>
              <Button disabled={isPending} variant="contained" type="submit" size="large" fullWidth>
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
  )
}
