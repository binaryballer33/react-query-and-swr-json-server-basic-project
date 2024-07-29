"use client"

import { Box, CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material"
import { type ReactNode } from "react"
import { Provider as ReduxProvider } from "react-redux"
import ReactQueryClientProvider from "src/api/query-client-provider"
import Toastr from "src/components/base/toastr" // for notification overlays
import { store, useSelector } from "src/store"
import { darkTheme, lightTheme } from "src/theme/theme"
import "src/i18n/i18n" // for multilanguage support

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
                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
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
