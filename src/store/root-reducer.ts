import { combineReducers } from "@reduxjs/toolkit"
import themeReducer from "src/slices/theme"

const rootReducer = combineReducers({
  theme: themeReducer,
})

export default rootReducer
