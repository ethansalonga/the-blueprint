import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Goal } from "../../types/types"
import axios from "axios"

interface InitialStateType {
  goals: Goal[]
  fetchGoalsStatus: string
  fetchGoalsError: string | undefined
  addNewGoalStatus: string
  addNewGoalError: string | undefined
  deleteGoalStatus: string
  deleteGoalError: string | undefined
}

const GOALS_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/goals"

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const response = await axios.get(GOALS_URL)
  return response.data
})

export const addNewGoal = createAsyncThunk(
  "roles/addNewGoal",
  async (newGoal: Goal) => {
    const response = await axios.post(GOALS_URL, newGoal)
    return response.data
  }
)

export const deleteGoal = createAsyncThunk(
  "roles/deleteGoal",
  async (id: number) => {
    const response = await axios.delete(`${GOALS_URL}/${id}`)
    return response.data
  }
)

const initialState: InitialStateType = {
  goals: [],
  fetchGoalsStatus: "idle", // "idle", "loading", "succeeded", "failed"
  fetchGoalsError: "",
  addNewGoalStatus: "idle", // "idle", "loading", "succeeded", "failed"
  addNewGoalError: "",
  deleteGoalStatus: "idle", // "idle", "loading", "succeeded", "failed"
  deleteGoalError: "",
}

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setAddNewGoalStatusIdle(state) {
      state.addNewGoalStatus = "idle"
    },
    setDeleteGoalStatusIdle(state) {
      state.deleteGoalStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.fetchGoalsStatus = "loading"
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.fetchGoalsStatus = "succeeded"
        state.goals = state.goals.concat(action.payload)
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.fetchGoalsStatus = "failed"
        state.deleteGoalError = action.error.message
      })
      .addCase(addNewGoal.pending, (state) => {
        state.addNewGoalStatus = "loading"
      })
      .addCase(addNewGoal.fulfilled, (state, action) => {
        state.addNewGoalStatus = "succeeded"
        state.goals.push(action.payload)
      })
      .addCase(addNewGoal.rejected, (state, action) => {
        state.addNewGoalStatus = "failed"
        state.addNewGoalError = action.error.message
      })
      .addCase(deleteGoal.pending, (state) => {
        state.deleteGoalStatus = "loading"
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.deleteGoalStatus = "succeeded"
        const { id } = action.payload
        const newGoals = state.goals.filter((goal) => goal.id !== id)
        state.goals = newGoals
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.deleteGoalStatus = "failed"
        state.deleteGoalError = action.error.message
      })
  },
})

export const { setAddNewGoalStatusIdle, setDeleteGoalStatusIdle } =
  goalsSlice.actions

export default goalsSlice.reducer
