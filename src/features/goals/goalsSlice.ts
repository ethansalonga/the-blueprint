import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Goal } from "../../types/types"
import axios from "axios"

interface InitialStateType {
  goals: Goal[]
  status: string
  error: string | undefined
}

const GOALS_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/goals"

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const response = await axios.get(GOALS_URL)
  return response.data
})

const initialState: InitialStateType = {
  goals: [],
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: "",
}

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.goals = state.goals.concat(action.payload)
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default goalsSlice.reducer
