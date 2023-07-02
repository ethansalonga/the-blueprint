import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase/init"
import { Milestone } from "../../../types/types"

type InitialStateType = {
  milestones: Milestone[]
  fetchMilestonesStatus: string
  fetchMilestonesError: string | undefined
}

const initialState: InitialStateType = {
  milestones: [],
  fetchMilestonesStatus: "idle",
  fetchMilestonesError: "",
}

export const fetchMilestones = createAsyncThunk(
  "milestones/fetchMilestones",
  async (uid: string) => {
    try {
      const milestonesRef = collection(db, "milestones")
      const q = query(milestonesRef, where("userRef", "==", uid))
      const querySnap = await getDocs(q)

      let milestones: Milestone[] = []
      querySnap.forEach((doc) => {
        const { category, paths, userRef } = doc.data()
        milestones.push({
          id: doc.id,
          category,
          paths,
          userRef,
        })
      })

      return milestones
    } catch (err) {
      console.log(err)
    }
  }
)

const milestonesSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch milestones
      .addCase(fetchMilestones.pending, (state) => {
        state.fetchMilestonesStatus = "loading"
      })
      .addCase(fetchMilestones.fulfilled, (state, action) => {
        state.fetchMilestonesStatus = "succeeded"
        state.milestones = action.payload as Milestone[]
      })
      .addCase(fetchMilestones.rejected, (state, action) => {
        state.fetchMilestonesStatus = "failed"
        state.fetchMilestonesError = action.error.message
      })
  },
})

export default milestonesSlice.reducer
