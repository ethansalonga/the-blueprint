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
import { db } from "../../firebase/init"
import { Role } from "../../types/types"

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

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (uid: string) => {
    try {
      const rolesRef = collection(db, "roles")
      const q = query(
        rolesRef,
        orderBy("rank", "asc"),
        where("userRef", "==", uid)
      )
      const querySnap = await getDocs(q)

      let roles: Role[] = []
      querySnap.forEach((doc) => {
        const { title, description, rank, userRef } = doc.data()
        roles.push({
          id: doc.id,
          title,
          description,
          rank,
          userRef,
        })
      })

      return roles
    } catch (err) {
      console.log(err)
    }
  }
)

export const addNewRole = createAsyncThunk(
  "roles/addNewRole",
  async (newRole: Role) => {
    const docRef = await addDoc(collection(db, "roles"), newRole)
    const createdRole = {
      ...newRole,
      id: docRef.id,
    }
    return createdRole
  }
)

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (newRole: Role) => {
    const { id } = newRole
    const docRef = doc(db, "roles", id!)
    const newRoleCopy = { ...newRole }
    delete newRoleCopy.id
    await updateDoc(docRef, newRoleCopy)
    return newRole
  }
)

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id: string) => {
    await deleteDoc(doc(db, "roles", id))
    return id
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
        state.roles = action.payload as Role[]
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
        state.roles = [...newRoles, action.payload].sort(
          (a, b) => a.rank - b.rank
        )
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
        const id = action.payload
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
