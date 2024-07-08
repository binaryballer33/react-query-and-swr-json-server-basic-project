"use client"

import { Box } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type ReactNode } from "react"
import { Provider as ReduxProvider } from "react-redux"
import Toastr from "src/components/base/toastr" // for notification overlays
import { store, useSelector } from "src/store"
import { darkTheme, lightTheme } from "src/theme/theme"

const queryClient = new QueryClient()

type ThemeProviderProps = {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useSelector((state) => state.theme)
  const theme = mode === "dark" ? darkTheme : lightTheme

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" minHeight="100vh">
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Box>
      <Toastr />
    </MuiThemeProvider>
  )
}

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  )
}
