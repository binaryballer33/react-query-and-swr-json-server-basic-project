import { z } from "zod"
import GAME from "./game"

export const basicCardSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
  game: z.enum([GAME.YU_GI_OH, GAME.POKEMON, GAME.DRAGON_BALL_Z] as const),
  name: z.string(),
  img: z.string(),
})

export const basicCardSchemaWithoutId = basicCardSchema.omit({ id: true })

export type BasicCard = z.infer<typeof basicCardSchema>
export type BasicCardWithoutId = z.infer<typeof basicCardSchemaWithoutId>
