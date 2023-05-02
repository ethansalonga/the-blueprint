import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface InitialStateType {
  roles: Role[]
  fetchRolesStatus: string
  fetchRolesError: string | undefined
  addNewRoleStatus: string
  addNewRoleError: string | undefined
}

type Role = {
  id?: number
  title: string
  description: string
}

const ROLES_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/roles"

const initialState: InitialStateType = {
  roles: [],
  fetchRolesStatus: "idle", // "idle", "loading", "succeeded", "failed"
  fetchRolesError: "",
  addNewRoleStatus: "idle",
  addNewRoleError: "",
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
    setAddNewRoleStatusIdle(state) {
      state.addNewRoleStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRoles.pending, (state, _) => {
        state.fetchRolesStatus = "loading"
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.fetchRolesStatus = "succeeded"
        state.roles = state.roles.concat(action.payload)
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.fetchRolesStatus = "failed"
        state.fetchRolesError = action.error.message
      })
      .addCase(addNewRole.pending, (state, _) => {
        state.addNewRoleStatus = "loading"
      })
      .addCase(addNewRole.fulfilled, (state, action) => {
        state.addNewRoleStatus = "succeeded"
        state.roles.push(action.payload)
      })
      .addCase(addNewRole.rejected, (state, action) => {
        state.addNewRoleStatus = "failed"
        state.addNewRoleError = action.error.message
      })
  },
})

export const { setAddNewRoleStatusIdle } = rolesSlice.actions

export default rolesSlice.reducer
