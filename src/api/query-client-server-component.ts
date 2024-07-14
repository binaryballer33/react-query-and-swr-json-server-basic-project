"use server"

import { QueryClient } from "@tanstack/react-query"

/*
 * need to create a new queryClient for each request for server components
 * only used in server components
 */
export default async function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // set some default staleTime to avoid refetching immediately on the client
      },
    },
  })
}
