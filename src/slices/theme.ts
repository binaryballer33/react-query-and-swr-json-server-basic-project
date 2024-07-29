import { createSlice } from "@reduxjs/toolkit"
import { ThemeState } from "src/model/theme-state"

const initialState: ThemeState = {
    mode: "dark",
}

const slice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === "dark" ? "light" : "dark"
        },
    },
})

export const { toggleTheme } = slice.actions

export default slice.reducer
