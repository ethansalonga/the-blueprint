import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "../features/global/globalSlice"
import rolesReducer from "../features/roles/rolesSlice"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    roles: rolesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
