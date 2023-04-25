import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface InitialStateType {
  roles: {
    title: string
    description: string
  }[]
  status: string
  error: string | undefined
}

const ROLES_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/roles"

const initialState: InitialStateType = {
  roles: [],
  status: "idle",
  error: "",
}

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axios.get(ROLES_URL)
  return response.data
})

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
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
  },
})

export default rolesSlice.reducer
