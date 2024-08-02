import { z } from "zod"
import { basicCardSchema } from "./basic-card"
import GAME from "./game"

export enum PokemonType {
    Fire = "fire",
    Water = "water",
    Grass = "grass",
    Electric = "electric",
    Psychic = "psychic",
    Fighting = "fighting",
    Dark = "dark",
    Fairy = "fairy",
    Dragon = "dragon",
    Steel = "steel",
    Ghost = "ghost",
    Ice = "ice",
    Rock = "rock",
    Ground = "ground",
    Flying = "flying",
    Normal = "normal",
    Poison = "poison",
    Bug = "bug",
}

export const pokemonCardSchema = basicCardSchema.extend({
    game: z.literal(GAME.POKEMON),
    type: z.nativeEnum(PokemonType),
})

export const pokemonCardSchemaWithoutId = pokemonCardSchema.omit({ id: true })

export type PokemonCard = z.infer<typeof pokemonCardSchema>
export type PokemonCardWithoutId = z.infer<typeof pokemonCardSchemaWithoutId>
