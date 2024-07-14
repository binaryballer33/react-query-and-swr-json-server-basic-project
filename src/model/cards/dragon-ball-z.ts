import { z } from "zod"
import { basicCardSchema } from "./basic-card"

export const dragonBallZCardSchema = basicCardSchema.extend({
  powerLevel: z.preprocess((val) => Number(val), z.number()),
})

export const dragonBallZCardSchemaWithoutId = dragonBallZCardSchema.omit({ id: true })

export type NestedConditionalType<T> = {
  [K in keyof T]: T[K]
} & {}

export type DragonBallZCard = NestedConditionalType<z.infer<typeof dragonBallZCardSchema>>
export type DragonBallZCardWithoutId = NestedConditionalType<z.infer<typeof dragonBallZCardSchemaWithoutId>>
// export type DragonBallZCard = z.infer<typeof dragonBallZCardSchema>
// export type DragonBallZCardWithoutId = z.infer<typeof dragonBallZCardSchemaWithoutId>
