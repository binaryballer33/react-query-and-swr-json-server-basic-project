import { z } from "zod"
import { basicCardSchema } from "./basic-card"
import GAME from "./game"

export const dragonBallZCardSchema = basicCardSchema.extend({
    game: z.literal(GAME.DRAGON_BALL_Z),
    powerLevel: z.preprocess((val) => Number(val), z.number()),
})

export const dragonBallZCardSchemaWithoutId = dragonBallZCardSchema.omit({ id: true })

export type DragonBallZCard = z.infer<typeof dragonBallZCardSchema>
export type DragonBallZCardWithoutId = z.infer<typeof dragonBallZCardSchemaWithoutId>
