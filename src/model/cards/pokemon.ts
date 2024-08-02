import { z } from "zod"
import { basicCardSchema } from "./basic-card"
import GAME from "./game"

export const pokemonCardSchema = basicCardSchema.extend({
    game: z.literal(GAME.POKEMON),
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

export type PokemonCard = z.infer<typeof pokemonCardSchema>
export type PokemonCardWithoutId = z.infer<typeof pokemonCardSchemaWithoutId>
