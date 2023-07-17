import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../../../firebase/init"
import { Milestone, NewMilestone } from "../../../types/types"

type InitialStateType = {
  milestones: Milestone[]
  fetchMilestonesStatus: string
  fetchMilestonesError: string | undefined
  addNewMilestoneStatus: string
  addNewMilestoneError: string | undefined
  updateMilestoneStatus: string
  updateMilestoneError: string | undefined
  deleteMilestoneStatus: string
  deleteMilestoneError: string | undefined
}

const initialState: InitialStateType = {
  milestones: [],
  fetchMilestonesStatus: "idle",
  fetchMilestonesError: "",
  addNewMilestoneStatus: "idle",
  addNewMilestoneError: "",
  updateMilestoneStatus: "idle",
  updateMilestoneError: "",
  deleteMilestoneStatus: "idle",
  deleteMilestoneError: "",
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

export const addNewMilestone = createAsyncThunk(
  "milestone/addNewMilestone",
  async (newMilestone: NewMilestone) => {
    const { category, pathName, userRef } = newMilestone
    const createdMilestone = {
      category,
      paths: [{ goals: [], name: pathName }],
      userRef,
    }

    const docRef = await addDoc(collection(db, "milestones"), {
      ...createdMilestone,
    })
    const createdMilestoneCopy = {
      ...createdMilestone,
      id: docRef.id,
    }
    return createdMilestoneCopy
  }
)

export const updateMilestone = createAsyncThunk(
  "milestones/updateMilestone",
  async (newMilestone: Milestone) => {
    const { id } = newMilestone
    const docRef = doc(db, "milestones", id!)
    const newMilestoneCopy = { ...newMilestone }
    delete newMilestoneCopy.id
    await updateDoc(docRef, newMilestoneCopy)
    return newMilestone
  }
)

export const deleteMilestone = createAsyncThunk(
  "goals/deleteMilestone",
  async (id: string) => {
    await deleteDoc(doc(db, "milestones", id))
    return id
  }
)

const milestonesSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {
    setAddNewMilestoneStatusIdle(state) {
      state.addNewMilestoneStatus = "idle"
    },
    setUpdateMilestoneStatusIdle(state) {
      state.updateMilestoneStatus = "idle"
    },
    setDeleteMilestoneStatusIdle(state) {
      state.deleteMilestoneStatus = "idle"
    },
  },
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

      // Add new milestone
      .addCase(addNewMilestone.pending, (state) => {
        state.addNewMilestoneStatus = "loading"
      })
      .addCase(addNewMilestone.fulfilled, (state, action) => {
        state.addNewMilestoneStatus = "succeeded"
        state.milestones.push(action.payload)
      })
      .addCase(addNewMilestone.rejected, (state, action) => {
        state.addNewMilestoneStatus = "failed"
        state.addNewMilestoneError = action.error.message
      })

      // Update milestone
      .addCase(updateMilestone.pending, (state) => {
        state.updateMilestoneStatus = "loading"
      })
      .addCase(updateMilestone.fulfilled, (state, action) => {
        state.updateMilestoneStatus = "succeeded"
        const { id } = action.payload
        const newMilestones = state.milestones.map((milestone) =>
          milestone.id === id ? action.payload : milestone
        )
        state.milestones = [...newMilestones]
      })
      .addCase(updateMilestone.rejected, (state, action) => {
        state.updateMilestoneStatus = "failed"
        state.updateMilestoneError = action.error.message
      })

      // Delete milestone
      .addCase(deleteMilestone.pending, (state) => {
        state.deleteMilestoneStatus = "loading"
      })
      .addCase(deleteMilestone.fulfilled, (state, action) => {
        state.deleteMilestoneStatus = "succeeded"
        const id = action.payload
        const newMilestones = state.milestones.filter(
          (milestone) => milestone.id !== id
        )
        state.milestones = newMilestones
      })
      .addCase(deleteMilestone.rejected, (state, action) => {
        state.deleteMilestoneStatus = "failed"
        state.deleteMilestoneError = action.error.message
      })
  },
})

export const {
  setAddNewMilestoneStatusIdle,
  setUpdateMilestoneStatusIdle,
  setDeleteMilestoneStatusIdle,
} = milestonesSlice.actions

export default milestonesSlice.reducer
