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
  SelectChangeEvent,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import useCreateDragonBallZCardMutation from "src/api/dragon-ball-z/mutations/create-dragon-ball-z-card"
import useCreatePokemonCardMutation from "src/api/pokemon/mutations/create-pokemon-card"
import useCreateYuGiOhCardMutation from "src/api/yu-gi-oh/mutations/create-yugioh-card"
import { CreateCardRequest, createCardRequestSchema, defaultValuesCreateCardRequest } from "src/model/cards/card"
import { DragonBallZCardWithoutId } from "src/model/cards/dragon-ball-z"
import GAME from "src/model/cards/game"
import { pokemonCardSchemaWithoutId, PokemonCardWithoutId } from "src/model/cards/pokemon"
import { YuGiOhCard } from "src/model/cards/yu-gi-oh"
import CreateCardInput from "./create-card-form-input"

type CreateCardProps = {
  toggleDialog: () => void
  dialogOpen: boolean
}

export default function CreateCardFormDialog(props: CreateCardProps) {
  const { toggleDialog, dialogOpen } = props
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [game, setGame] = useState(GAME.YU_GI_OH)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))

  function useCreateCardMutation(game: GAME) {
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
          mutate: (card: CreateCardRequest) => yugiohMutation.mutate(card as YuGiOhCard),
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

  const { isPending, mutate: createCardMutation } = useCreateCardMutation(game)

  const handleSelectChange = (event: SelectChangeEvent<number>) => setValue(Number(event.target.value))

  const {
    register: registerInputField,
    handleSubmit: handleSubmitHookForm,
    reset: resetFormFields,
    watch: watchFormField,
    setValue: setFormValue,
    formState: { errors },
    control: controlSelectInputField, // control is passed into the Controller component
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
      createCardMutation(cardData)
      resetFormFields(defaultValuesCreateCardRequest(game))
      toggleDialog() // Close the dialog
    },
    [resetFormFields, toggleDialog, createCardMutation, game],
  )

  // get the text fields from the initial form state, leave out the game field, needs to be a select field
  // const inputFields = Object.keys(defaultValuesCreateCardRequest(game)).filter((field) => field !== "game")

  // get the text fields from the card, but leave out a few fields
  const inputFields = Object.keys(defaultValuesCreateCardRequest(game)).filter(
    (field) => !["game", "type"].includes(field),
  )
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

                {/* Select Pokemon Type From Dropdown */}
                {game === GAME.POKEMON && (
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
      </Card>
    </Dialog>
  )
}
