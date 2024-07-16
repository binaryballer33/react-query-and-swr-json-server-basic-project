// /* eslint-disable no-console */
// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import toast from "react-hot-toast"
// import QUERY_KEYS from "src/api/query-keys"
// import { YuGiOhCard, YuGiOhCardWithoutId } from "src/model/cards/yu-gi-oh"
// import QUERY_ROUTES from "src/router/query-routes"
// import axiosInstance from "../../xhr-request-instance"

// // export async function createYuGiOhCard(card: YuGiOhCardWithoutId) {
// //   return (await axiosInstance.post(QUERY_ROUTES.CREATE_YUGIOH_CARD, card)).data
// // }
// export async function createYuGiOhCard(card: YuGiOhCard) {
//   return (await axiosInstance.post(QUERY_ROUTES.CREATE_YUGIOH_CARD, card)).data
// }

// // type MutationContext = {
// //   previousYuGiOhCardsContext?: YuGiOhCardWithoutId[]
// // }
// type MutationContext = {
//   previousYuGiOhCardsContext?: YuGiOhCard[]
// }

// export default function useCreateYuGiOhCardMutation() {
//   const queryClient = useQueryClient()

//   // return useMutation<YuGiOhCard, Error, YuGiOhCard, MutationContext>({
//   return useMutation<YuGiOhCardWithoutId, Error, YuGiOhCardWithoutId, MutationContext>({
//     // mutationFn: (card: YuGiOhCard) => createYuGiOhCard(card),
//     mutationFn: (card: YuGiOhCardWithoutId) => createYuGiOhCard(card),

//     // When mutate is called: Optimistically update the cache with the new card, don't refetch, less expensive
//     onMutate: async (card) => {
//       // TODO: am i creating this with the wrong query key?
//       // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
//       // await queryClient.cancelQueries({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id) })

//       // Snapshot the previous value
//       const previousYuGiOhCardsContext = queryClient.getQueryData<YuGiOhCardWithoutId[]>(QUERY_KEYS.ALL_YU_GI_OH_CARDS)
//       // const previousYuGiOhCardsContext = queryClient.getQueryData<YuGiOhCard[]>(QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id)

//       // Optimistically update to the new value
//       queryClient.setQueryData<YuGiOhCardWithoutId[]>(QUERY_KEYS.ALL_YU_GI_OH_CARDS, (old) =>
//         old ? [...old, card] : [card],
//       )
//       // queryClient.setQueryData<YuGiOhCard[]>(QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id), (old) =>
//       //   old ? [...old, card] : [card],
//       // )

//       // Return a context object with the snapshotted value
//       return { previousYuGiOhCardsContext }
//     },

//     // If the mutation fails, use the context returned from onMutate to roll back
//     onError(error, card, context) {
//       console.error(`Error Creating YuGiOh Card: ${card.name} ${error}`)
//       toast.error(`Error Creating YuGiOh Card: ${card.name} ${error}`)
//       queryClient.setQueryData([QUERY_KEYS.ALL_YU_GI_OH_CARDS], context?.previousYuGiOhCardsContext)
//     },

//     onSuccess(_data, card, _context) {
//       toast.success(`Yu-Gi-Oh Card: ${card.name} Created Successfully`)
//     },

//     // Always refetch after error or success:
//     onSettled: async (_data, _error, _variables, _context) => {
//       // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
//     },
//   })
// }

// create

/* eslint-disable no-console */
// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import toast from "react-hot-toast"
// import QUERY_KEYS from "src/api/query-keys"
// import { YuGiOhCard, YuGiOhCardWithoutId } from "src/model/cards/yu-gi-oh"
// import QUERY_ROUTES from "src/router/query-routes"
// import axiosInstance from "../../xhr-request-instance"

// export async function createYuGiOhCard(card: YuGiOhCardWithoutId) {
//   return (await axiosInstance.post(QUERY_ROUTES.CREATE_YUGIOH_CARD, card)).data
// }
// export async function createYuGiOhCard(card: YuGiOhCardWithoutId) {
//   return (await axiosInstance.post(QUERY_ROUTES.CREATE_YUGIOH_CARD, card)).data
// }

// type MutationContext = {
//   previousYuGiOhCardsContext?: YuGiOhCardWithoutId[]
// }
// type MutationContext = {
//   previousYuGiOhCardsContext?: YuGiOhCardWithoutId[]
// }

// export default function useCreateYuGiOhCardMutation() {
//   const queryClient = useQueryClient()

//   return useMutation<YuGiOhCardWithoutId, Error, YuGiOhCardWithoutId, MutationContext>({
//     // Before the mutation, but after mutate is called: Optimistically update the cache with the new card, don't refetch, less expensive
//     onMutate: async (card) => {
//       // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
//       // await queryClient.cancelQueries({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id) })

//       // Snapshot the previous value
//       const previousYuGiOhCardsContext = queryClient.getQueryData<YuGiOhCardWithoutId[]>(QUERY_KEYS.ALL_YU_GI_OH_CARDS)
//       // const previousYuGiOhCardsContext = queryClient.getQueryData<YuGiOhCard[]>(QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id))

//       // Optimistically update to the new value
//       queryClient.setQueryData<YuGiOhCardWithoutId[]>(QUERY_KEYS.ALL_YU_GI_OH_CARDS, (old) =>
//         old?.filter((oldCard) => oldCard.id !== card.id),
//       )
//       // queryClient.setQueryData<YuGiOhCard[]>(QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id), (old) =>
//       //   old?.filter((oldCard) => oldCard.id !== card.id),
//       // )

//       // Return a context object with the snapshotted value
//       return { previousYuGiOhCardsContext }
//     },

//     // The mutation function
//     mutationFn: (card) => createYuGiOhCard(card),

//     // If the mutation fails, use the context returned from onMutate to roll back
//     onError(error, card, context) {
//       console.error(`Error Creating YuGiOh Card ${card.name}: ${error}`)
//       toast.error(`Error Creating YuGiOh Card ${card.name}: ${error}`)
//       queryClient.setQueryData(QUERY_KEYS.ALL_YU_GI_OH_CARDS, context?.previousYuGiOhCardsContext)
//       // queryClient.setQueryData(QUERY_KEYS.YU_GI_OH_CARD_BY_ID(card.id), context?.previousYuGiOhCardsContext)
//     },

//     onSuccess(_data, card, _context) {
//       toast.success(`Yu-Gi-Oh Card: ${card.name} Created Successfully`)
//     },

//     // Always refetch after error or success:
//     onSettled: async (data, _error, _card, _context) => {
//       // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
//       // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(data!.id) })
//     },
//   })
// }
