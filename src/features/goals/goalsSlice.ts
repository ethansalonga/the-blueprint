import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Goal } from "../../types/types"
import axios from "axios"

interface InitialStateType {
  goals: Goal[]
  fetchGoalsStatus: string
  fetchGoalsError: string | undefined
  addNewGoalStatus: string
  addNewGoalError: string | undefined
  updateGoalStatus: string
  updateGoalError: string | undefined
  deleteGoalStatus: string
  deleteGoalError: string | undefined
}

const GOALS_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/goals"

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const response = await axios.get(GOALS_URL)
  return response.data
})

export const addNewGoal = createAsyncThunk(
  "goals/addNewGoal",
  async (newGoal: Goal) => {
    const response = await axios.post(GOALS_URL, newGoal)
    return response.data
  }
)

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (newGoal: Goal) => {
    const { id } = newGoal

    const response = await axios.put(`${GOALS_URL}/${id}`, newGoal)
    return response.data
  }
)

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (id: number) => {
    const response = await axios.delete(`${GOALS_URL}/${id}`)
    return response.data
  }
)

const initialState: InitialStateType = {
  goals: [],
  fetchGoalsStatus: "idle", // "idle", "loading", "succeeded", "failed"
  fetchGoalsError: "",
  addNewGoalStatus: "idle",
  addNewGoalError: "",
  updateGoalStatus: "idle",
  updateGoalError: "",
  deleteGoalStatus: "idle",
  deleteGoalError: "",
}

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setAddNewGoalStatusIdle(state) {
      state.addNewGoalStatus = "idle"
    },
    setUpdateGoalStatusIdle(state) {
      state.updateGoalStatus = "idle"
    },
    setDeleteGoalStatusIdle(state) {
      state.deleteGoalStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      // Fetch goals
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

      // Add new goal
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

      // Update goal
      .addCase(updateGoal.pending, (state) => {
        state.updateGoalStatus = "loading"
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.updateGoalStatus = "succeeded"
        const { id } = action.payload
        const newGoals = state.goals.filter((role) => role.id !== id)
        state.goals = [...newGoals, action.payload].sort((a, b) => a.id - b.id)
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.updateGoalStatus = "failed"
        state.updateGoalError = action.error.message
      })

      // Delete goal
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

export const {
  setAddNewGoalStatusIdle,
  setUpdateGoalStatusIdle,
  setDeleteGoalStatusIdle,
} = goalsSlice.actions

export default goalsSlice.reducer
