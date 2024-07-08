import { colors, lighten, NeutralColors, PaletteMode } from "@mui/material"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { modifiedComponents } from "./modified-components"

declare module "@mui/material/styles" {
  export interface NeutralColors {
    25: string
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  interface Palette {
    neutral: NeutralColors
  }

  interface PaletteOptions {
    neutral?: NeutralColors
  }
}

export type PaletteColorKey = "success" | "error" | "warning" | "info" | "primary" | "secondary"

const common = {
  white: "#ffffff",
  black: "#151821",
  neutral: "#14191e",
}

export const neutral: NeutralColors = {
  25: lighten(common.neutral, 0.98),
  50: lighten(common.neutral, 0.96),
  100: lighten(common.neutral, 0.93),
  200: lighten(common.neutral, 0.9),
  300: lighten(common.neutral, 0.85),
  400: lighten(common.neutral, 0.77),
  500: lighten(common.neutral, 0.68),
  600: lighten(common.neutral, 0.5),
  700: lighten(common.neutral, 0.4),
  800: lighten(common.neutral, 0.2),
  900: common.neutral,
}

const lightTheme = responsiveFontSizes(
  createTheme({
    // typography: modified_typography(),
    components: modifiedComponents(),
    palette: {
      mode: "light" as PaletteMode,
      primary: {
        main: colors.blue[700],
        light: colors.blue[400],
        dark: colors.blue[900],
      },
      secondary: {
        main: colors.teal[600],
        light: colors.teal[400],
        dark: colors.teal[800],
      },
      info: {
        main: colors.deepPurple[700],
        light: colors.deepPurple[400],
        dark: colors.deepPurple[900],
      },
      neutral,
      background: {
        default: colors.grey[300], // Light grey
        paper: lighten(colors.grey[200], 0.01),
      },
      text: {
        primary: colors.common.black,
        secondary: colors.grey[800],
      },
      divider: colors.grey[400],
    },
  }),
)

const darkTheme = responsiveFontSizes(
  createTheme({
    // typography: modified_typography(),
    components: modifiedComponents(),
    palette: {
      mode: "dark" as PaletteMode,
      primary: {
        main: colors.teal[300],
        light: colors.teal[100],
        dark: colors.teal[500],
      },
      secondary: {
        main: colors.blue[700],
        light: colors.blue[500],
        dark: colors.blue[900],
      },
      info: {
        main: colors.deepPurple[300],
        light: colors.deepPurple[100],
        dark: colors.deepPurple[500],
      },
      neutral,
      background: {
        default: neutral[900],
        paper: lighten(neutral[900], 0.033),
      },
      text: {
        primary: colors.common.white,
        secondary: colors.grey[400],
      },
      divider: colors.grey[700],
    },
  }),
)

export { lightTheme, darkTheme }
