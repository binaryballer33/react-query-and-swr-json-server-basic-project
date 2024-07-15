import { z } from "zod"
import { basicCardSchema } from "./basic-card"
import GAME from "./game"

export const pokemonCardSchema = basicCardSchema.extend({
  game: z.literal(GAME.POKEMON),
  type: z.enum([
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Fighting",
    "Dark",
    "Fairy",
    "Dragon",
    "Steel",
    "Ghost",
    "Ice",
    "Rock",
    "Ground",
    "Flying",
    "Normal",
    "Poison",
    "Bug",
  ] as const),
})

export const pokemonCardSchemaWithoutId = pokemonCardSchema.omit({ id: true })

export type PokemonCard = z.infer<typeof pokemonCardSchema>
export type PokemonCardWithoutId = z.infer<typeof pokemonCardSchemaWithoutId>
