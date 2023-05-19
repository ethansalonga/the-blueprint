import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "../features/global/globalSlice"
import authReducer from "../features/auth/authSlice"
import rolesReducer from "../features/roles/rolesSlice"
import goalsReducer from "../features/goals/five-year-goals/goalsSlice"
import milestonesReducer from "../features/goals/milestone-goals/milestonesSlice"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    roles: rolesReducer,
    goals: goalsReducer,
    milestones: milestonesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
