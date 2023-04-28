import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface InitialStateType {
  roles: Role[]
  status: string
  error: string | undefined
}

type Role = {
  id?: number
  title: string
  description: string
}

const ROLES_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/roles"

const initialState: InitialStateType = {
  roles: [],
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: "",
}

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axios.get(ROLES_URL)
  return response.data
})

export const addNewRole = createAsyncThunk(
  "roles/addNewRole",
  async (newRole: Role) => {
    const response = await axios.post(ROLES_URL, newRole)
    return response.data
  }
)

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRoles.pending, (state, _) => {
        state.status = "loading"
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.roles = state.roles.concat(action.payload)
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addNewRole.pending, (state, _) => {
        state.status = "loading"
      })
      .addCase(addNewRole.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.roles.push(action.payload)
      })
      .addCase(addNewRole.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default rolesSlice.reducer
