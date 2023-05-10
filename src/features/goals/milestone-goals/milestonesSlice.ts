import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { MilestoneSection } from "../../../types/types"

type InitialStateType = MilestoneSection[]

const initialState: InitialStateType = []

const milestonesSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {},
  extraReducers(builder) {},
})

export default milestonesSlice.reducer
