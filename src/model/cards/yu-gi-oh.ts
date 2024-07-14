import { z } from "zod"
import { basicCardSchema } from "./basic-card"

export const yuGiOhCardSchema = basicCardSchema.extend({
  attack: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
  defense: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
})

export const yuGiOhCardSchemaWithoutId = yuGiOhCardSchema.omit({ id: true })

export type NestedConditionalType<T> = {
  [K in keyof T]: T[K]
} & {}

export type YuGiOhCard = NestedConditionalType<z.infer<typeof yuGiOhCardSchema>>
export type YuGiOhCardWithoutId = NestedConditionalType<z.infer<typeof yuGiOhCardSchemaWithoutId>>
// export type YuGiOhCard = z.infer<typeof yuGiOhCardSchema>
// export type YuGiOhCardWithoutId = z.infer<typeof yuGiOhCardSchemaWithoutId>
