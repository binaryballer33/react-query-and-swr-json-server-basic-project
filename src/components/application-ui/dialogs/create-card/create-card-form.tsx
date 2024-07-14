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
    const {
      data: yugiohCards,
      isPending: yugiohIsPending,
      isSuccess: yugiohIsSuccess,
      isError: yugiohIsError,
      mutate: createYugiohCard,
    } = useCreateYuGiOhCardMutation()

    const {
      data: pokemonCards,
      isPending: pokemonIsPending,
      isSuccess: pokemonhIsSuccess,
      isError: pokemonIsError,
      mutate: createPokemonCard,
    } = useCreatePokemonCardMutation()

    const {
      data: dragonBallZCards,
      isPending: dragonBallZIsPending,
      isSuccess: dragonBallZIsSuccess,
      isError: dragonBallZIsError,
      mutate: createDragonBallZCard,
    } = useCreateDragonBallZCardMutation()

    switch (game) {
      case GAME.YU_GI_OH:
        return {
          data: yugiohCards,
          isPending: yugiohIsPending,
          isSuccess: yugiohIsSuccess,
          isError: yugiohIsError,
          mutate: createYugiohCard,
        }
      case GAME.POKEMON:
        return {
          data: pokemonCards,
          isPending: pokemonIsPending,
          isSuccess: pokemonhIsSuccess,
          isError: pokemonIsError,
          mutate: createPokemonCard,
        }
      case GAME.DRAGON_BALL_Z:
        return {
          data: dragonBallZCards,
          isPending: dragonBallZIsPending,
          isSuccess: dragonBallZIsSuccess,
          isError: dragonBallZIsError,
          mutate: createDragonBallZCard,
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

  const handleSubmit: SubmitHandler<CreateCardRequest> = useCallback(
    async (cardData: CreateCardRequest): Promise<void> => {
      const validatedCardData = createCardRequestSchema.safeParse(cardData)
      validatedCardData

      if (!validatedCardData.success) {
        // eslint-disable-next-line no-console
        console.error(validatedCardData.error.errors)
        return
      }

      // needs to be a intersection of all card types to be able to pass the data to the mutation
      // if i try to pass a union of all card types, it will work but give a type error
      type CreateCardMutation = YuGiOhCardWithoutId & PokemonCardWithoutId & DragonBallZCardWithoutId

      createCardMutation(validatedCardData.data as CreateCardMutation)

      toast.success(t("Card Created")) // Show a success toast message

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
                {isPending ? t("Creating") : t("Create")}
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
