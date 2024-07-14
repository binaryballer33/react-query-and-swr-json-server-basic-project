"use client"

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

/*
 * Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top

 * NEVER DO THIS: per docs: https://tanstack.com/query/latest/docs/framework/react/guides/ssr#initial-setup
 * const queryClient = new QueryClient()
 *
 * Creating the queryClient at the file root level makes the cache shared
 * between all requests and means _all_ data gets passed to _all_ users.
 * Besides being bad for performance, this also leaks any sensitive data.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // set some default staleTime to avoid refetching immediately on the client
      },
    },
  })
}

// use hook useQueryClient to get the query client instance for client components
let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  // Server: ALWAYS make a new query client
  if (isServer) return makeQueryClient()

  /* Docs: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
   * Browser: make a new query client if we don't already have one
   * This is very important, so we don't re-make a new client if React
   * suspends during the initial render. This may not be needed if we
   * have a suspense boundary BELOW the creation of the query client
   */
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

type ReactQueryClientProviderProps = {
  children: React.ReactNode
}

export default function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
