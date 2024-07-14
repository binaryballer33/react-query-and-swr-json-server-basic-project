import { z } from "zod"

export const basicCardSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
  name: z.string(),
  img: z.string(),
})

export const basicCardSchemaWithoutId = basicCardSchema.omit({ id: true })

export type BasicCard = z.infer<typeof basicCardSchema>
export type BasicCardWithoutId = z.infer<typeof basicCardSchemaWithoutId>
