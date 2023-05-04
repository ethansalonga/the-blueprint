import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Role } from "../../types/types"
import axios from "axios"

interface InitialStateType {
  roles: Role[]
  fetchRolesStatus: string
  fetchRolesError: string | undefined
  addNewRoleStatus: string
  addNewRoleError: string | undefined
  deleteRoleStatus: string
  deleteRoleError: string | undefined
}

const ROLES_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/roles"

const initialState: InitialStateType = {
  roles: [],
  fetchRolesStatus: "idle", // "idle", "loading", "succeeded", "failed"
  fetchRolesError: "",
  addNewRoleStatus: "idle",
  addNewRoleError: "",
  deleteRoleStatus: "idle",
  deleteRoleError: "",
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

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id: number) => {
    const response = await axios.delete(`${ROLES_URL}/${id}`)
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
    setDeleteRoleStatusIdle(state) {
      state.deleteRoleStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRoles.pending, (state) => {
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
      .addCase(addNewRole.pending, (state) => {
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
      .addCase(deleteRole.pending, (state) => {
        state.deleteRoleStatus = "loading"
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.deleteRoleStatus = "succeeded"
        const { id } = action.payload
        const newRoles = state.roles.filter((role) => role.id !== id)
        state.roles = newRoles
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.deleteRoleStatus = "failed"
        state.deleteRoleError = action.error.message
      })
  },
})

export const { setAddNewRoleStatusIdle, setDeleteRoleStatusIdle } =
  rolesSlice.actions

export default rolesSlice.reducer
