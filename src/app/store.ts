import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "../features/global/globalSlice"
import rolesReducer from "../features/roles/rolesSlice"
import goalsReducer from "../features/goals/five-year-goals/goalsSlice"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    roles: rolesReducer,
    goals: goalsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
