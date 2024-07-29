import { z } from "zod"
import { basicCardSchema } from "./basic-card"
import GAME from "./game"

export const yuGiOhCardSchema = basicCardSchema.extend({
    game: z.literal(GAME.YU_GI_OH),
    attack: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
    defense: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
})

export const yuGiOhCardSchemaWithoutId = yuGiOhCardSchema.omit({ id: true })

export type YuGiOhCard = z.infer<typeof yuGiOhCardSchema>
export type YuGiOhCardWithoutId = z.infer<typeof yuGiOhCardSchemaWithoutId>
