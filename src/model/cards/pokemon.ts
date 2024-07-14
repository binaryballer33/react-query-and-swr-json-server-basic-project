import { z } from "zod"
import { basicCardSchema } from "./basic-card"

export const pokemonCardSchema = basicCardSchema.extend({
  type: z.enum([
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "fighting",
    "dark",
    "fairy",
    "dragon",
    "steel",
    "ghost",
    "ice",
    "rock",
    "ground",
    "flying",
    "normal",
    "poison",
    "bug",
  ] as const),
})

export const pokemonCardSchemaWithoutId = pokemonCardSchema.omit({ id: true })

export type NestedConditionalType<T> = {
  [K in keyof T]: T[K]
} & {}

export type PokemonCard = NestedConditionalType<z.infer<typeof pokemonCardSchema>>
export type PokemonCardWithoutId = NestedConditionalType<z.infer<typeof pokemonCardSchemaWithoutId>>
// export type PokemonCard = z.infer<typeof pokemonCardSchema>
// export type PokemonCardWithoutId = z.infer<typeof pokemonCardSchemaWithoutId>
