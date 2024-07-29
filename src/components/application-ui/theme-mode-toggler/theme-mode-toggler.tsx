"use client"

import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone"
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone"
import { alpha, BoxProps, Button, Tooltip, useTheme } from "@mui/material"
import { toggleTheme } from "src/slices/theme"
import { useDispatch } from "src/store"

function ThemeModeToggler(props: BoxProps) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const handleThemeToggle = () => dispatch(toggleTheme())

    return (
        <Tooltip title="Toggle Dark/Light Mode" arrow sx={{ ...props }}>
            <Button
                variant="outlined"
                onClick={handleThemeToggle}
                aria-label="Dark/Light Mode Toggler"
                sx={{
                    borderRadius: 2,
                    minWidth: "auto",
                    padding: 0.5,
                    borderColor: alpha(theme.palette.divider, 0.2),
                }}
            >
                {theme.palette.mode === "light" ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />}
            </Button>
        </Tooltip>
    )
}

export default ThemeModeToggler
