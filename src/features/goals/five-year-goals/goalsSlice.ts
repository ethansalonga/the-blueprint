import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../../../firebase/init"
import { FiveYearGoal } from "../../../types/types"

interface InitialStateType {
  goals: FiveYearGoal[]
  fetchGoalsStatus: string
  fetchGoalsError: string | undefined
  addNewGoalStatus: string
  addNewGoalError: string | undefined
  updateGoalStatus: string
  updateGoalError: string | undefined
  deleteGoalStatus: string
  deleteGoalError: string | undefined
}

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

export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (uid: string) => {
    try {
      const goalsRef = collection(db, "goals")
      const q = query(
        goalsRef,
        orderBy("rank", "asc"),
        where("userRef", "==", uid)
      )
      const querySnap = await getDocs(q)

      let goals: FiveYearGoal[] = []
      querySnap.forEach((doc) => {
        const { goal, rank, userRef } = doc.data()
        goals.push({
          id: doc.id,
          goal,
          rank,
          userRef,
        })
      })

      return goals
    } catch (err) {
      console.log(err)
    }
  }
)

export const addNewGoal = createAsyncThunk(
  "goals/addNewGoal",
  async (newGoal: FiveYearGoal) => {
    const docRef = await addDoc(collection(db, "goals"), newGoal)
    const createdGoal = {
      ...newGoal,
      id: docRef.id,
    }
    return createdGoal
  }
)

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (newGoal: FiveYearGoal) => {
    const { id } = newGoal
    const docRef = doc(db, "goals", id!)
    const newGoalCopy = { ...newGoal }
    delete newGoalCopy.id
    await updateDoc(docRef, newGoalCopy)
    return newGoal
  }
)

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (id: string) => {
    await deleteDoc(doc(db, "goals", id))
    return id
  }
)

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
        state.goals = action.payload as FiveYearGoal[]
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.fetchGoalsStatus = "failed"
        state.fetchGoalsError = action.error.message
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
        const newGoals = state.goals.filter((goal) => goal.id !== id)
        state.goals = [...newGoals, action.payload].sort(
          (a, b) => a.rank - b.rank
        )
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
        const id = action.payload
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
