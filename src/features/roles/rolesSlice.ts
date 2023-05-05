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
  updateRoleStatus: string
  updateRoleError: string | undefined
}

const ROLES_URL = "https://6445b2bb0431e885f002abd2.mockapi.io/roles"

const initialState: InitialStateType = {
  roles: [],
  fetchRolesStatus: "idle", // "idle", "loading", "succeeded", "failed"
  fetchRolesError: "",
  addNewRoleStatus: "idle",
  addNewRoleError: "",
  updateRoleStatus: "idle",
  updateRoleError: "",
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

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (newRole: Role) => {
    const { id } = newRole

    const response = await axios.put(`${ROLES_URL}/${id}`, newRole)
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
    setUpdateRoleStatusIdle(state) {
      state.updateRoleStatus = "idle"
    },
    setDeleteRoleStatusIdle(state) {
      state.deleteRoleStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      // Fetch roles
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

      // Add new role
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

      // Update role
      .addCase(updateRole.pending, (state) => {
        state.updateRoleStatus = "loading"
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.updateRoleStatus = "succeeded"
        const { id } = action.payload
        const newRoles = state.roles.filter((role) => role.id !== id)
        state.roles = [...newRoles, action.payload].sort((a, b) => a.id - b.id)
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.updateRoleStatus = "failed"
        state.updateRoleError = action.error.message
      })

      // Delete role
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

export const {
  setAddNewRoleStatusIdle,
  setUpdateRoleStatusIdle,
  setDeleteRoleStatusIdle,
} = rolesSlice.actions

export default rolesSlice.reducer
