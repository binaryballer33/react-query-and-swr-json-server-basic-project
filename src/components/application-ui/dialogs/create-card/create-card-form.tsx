"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Alert,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import useCreateDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/create-dragon-ball-z-card"
import useCreatePokemonCardMutation from "src/api/pokemon/mutations/create-pokemon-card"
import useCreateYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/create-yugioh-card"
import { CreateCardRequest, createCardRequestSchema, defaultValuesCreateCardRequest } from "src/model/cards/card"
import { DragonBallZCardWithoutId } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { PokemonCardWithoutId } from "src/model/cards/pokemon"
import { YuGiOhCardWithoutId } from "src/model/cards/yu-gi-oh"
import CreateCardInput from "./create-card-form-input"

type CreateCardProps = {
  closeDialog: () => void
}

export default function CreateCard(props: CreateCardProps) {
  const { closeDialog } = props
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [game, setGame] = useState(GAME.YU_GI_OH)

  function useGetCardMutation(game: GAME) {
    const yugiohMutation = useCreateYuGiOhCardMutation()
    const pokemonMutation = useCreatePokemonCardMutation()
    const dragonBallZMutation = useCreateDragonBallZCardMutation()

    switch (game) {
      case GAME.YU_GI_OH:
        return {
          data: yugiohMutation.data,
          isPending: yugiohMutation.isPending,
          isSuccess: yugiohMutation.isSuccess,
          isError: yugiohMutation.isError,
          mutate: (card: CreateCardRequest) => yugiohMutation.mutate(card as YuGiOhCardWithoutId),
        }
      case GAME.POKEMON:
        return {
          data: pokemonMutation.data,
          isPending: pokemonMutation.isPending,
          isSuccess: pokemonMutation.isSuccess,
          isError: pokemonMutation.isError,
          mutate: (card: CreateCardRequest) => pokemonMutation.mutate(card as PokemonCardWithoutId),
        }
      case GAME.DRAGON_BALL_Z:
        return {
          data: dragonBallZMutation.data,
          isPending: dragonBallZMutation.isPending,
          isSuccess: dragonBallZMutation.isSuccess,
          isError: dragonBallZMutation.isError,
          mutate: (card: CreateCardRequest) => dragonBallZMutation.mutate(card as DragonBallZCardWithoutId),
        }
      default:
        throw new Error("Unknown game type")
    }
  }

  const { isPending, mutate: createCardMutation } = useGetCardMutation(game)

  const handleSelectChange = (event: SelectChangeEvent<number>) => setValue(Number(event.target.value))

  const {
    register: registerInputField,
    handleSubmit: handleSubmitHookForm,
    reset: resetFormFields,
    watch: watchFormField,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<CreateCardRequest>({
    defaultValues: defaultValuesCreateCardRequest(game),
    resolver: zodResolver(createCardRequestSchema),
  })

  // Update default values when game changes, otherwise wrong data will be submitted to the server
  useEffect(() => {
    resetFormFields(defaultValuesCreateCardRequest(game))
  }, [game, resetFormFields])

  type NestedConditionalType<T> = {
    [K in keyof T]: T[K]
  } & {}

  const handleSubmit: SubmitHandler<CreateCardRequest> = useCallback(
    // TODO: figure out why cardData is not giving me all the fields, i know its extending the other types
    async (cardData: CreateCardRequest): Promise<void> => {
      // TODO: should this just be done on the backend? the validation using safeParse
      const {
        data: validatedRequestBody,
        success: validationSuccessfulForRequestBody,
        error: validationError,
      } = createCardRequestSchema.safeParse(cardData)

      if (!validationSuccessfulForRequestBody) {
        // eslint-disable-next-line no-console
        toast.error(t("Failed To Add Card, Invalid Form Data")) // Show an error toast message
        console.error(validationError.errors)
        return
      }

      createCardMutation(validatedRequestBody)

      toast.success(t("Card Added To Database")) // Show a success toast message

      resetFormFields(defaultValuesCreateCardRequest(game))

      closeDialog() // Close the dialog
    },
    [resetFormFields, closeDialog, t, createCardMutation, game],
  )

  // get the text fields from the initial form state, leave out the game field, needs to be a select field
  const inputFields = Object.keys(defaultValuesCreateCardRequest(game))

  return (
    <form
      onSubmit={handleSubmitHookForm(handleSubmit)}
      style={{ display: "flex", flexDirection: "column", minHeight: "75dvh", padding: "64px 0px" }}
    >
      {/* Form Header */}
      <Container maxWidth="sm">
        <Typography align="center" variant="h4" gutterBottom>
          {t("Add Card To Database")}
        </Typography>
      </Container>

      {/* Form Content */}
      <Stack mt={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
        {/* Form Inputs Below */}
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            {/* Select Game Type From Dropdown */}
            <Select value={value} onChange={handleSelectChange} fullWidth>
              <MenuItem value={0} onClick={() => setGame(GAME.YU_GI_OH)}>
                Yu-Gi-Oh
              </MenuItem>
              <MenuItem value={1} onClick={() => setGame(GAME.POKEMON)}>
                Pokemon
              </MenuItem>
              <MenuItem value={2} onClick={() => setGame(GAME.DRAGON_BALL_Z)}>
                Dragon Ball Z
              </MenuItem>
            </Select>

            {/* Create Input Fields */}
            {inputFields.map((inputName) => {
              return (
                <CreateCardInput
                  key={inputName}
                  register={registerInputField}
                  errors={errors}
                  inputName={inputName as keyof CreateCardRequest}
                  placeholder={inputName}
                  watchFormField={watchFormField}
                  setFormValue={setFormValue}
                />
              )
            })}

            {/* Submit Button */}
            <Grid xs={12}>
              <Button disabled={isPending} variant="contained" type="submit" size="large" fullWidth>
                {isPending ? t("Adding Card") : t("Add Card")}
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
