"use client"

import { Box } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { type ReactNode } from "react"
import { Provider as ReduxProvider } from "react-redux"
import Toastr from "src/components/base/toastr" // for notification overlays
import SWRProvider from "src/context/swr"
import { store, useSelector } from "src/store"
import { darkTheme, lightTheme } from "src/theme/theme"

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
        <SWRProvider>{children}</SWRProvider>
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
