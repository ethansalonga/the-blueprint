import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth } from "../../firebase/init"
import { AuthFormData } from "../../types/types"

interface initialStateType {
  error: string | undefined
  loading: boolean
  userSignedIn: boolean
}

const initialState: initialStateType = {
  error: "",
  loading: false,
  userSignedIn: false,
}

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formData: AuthFormData) => {
    const { email, password } = formData
    await createUserWithEmailAndPassword(auth, email, password)
  }
)

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (formData: AuthFormData) => {
    const { email, password } = formData
    await signInWithEmailAndPassword(auth, email, password)
  }
)

export const signUserOut = createAsyncThunk("auth/signOut", async () => {
  await signOut(auth)
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.error = ""
        state.loading = true
      })
      .addCase(signUp.fulfilled, (state) => {
        state.userSignedIn = true
        state.loading = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
      .addCase(signIn.pending, (state) => {
        state.error = ""
        state.loading = true
      })
      .addCase(signIn.fulfilled, (state) => {
        state.userSignedIn = true
        state.loading = false
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
      .addCase(signUserOut.fulfilled, (state) => {
        state.error = ""
        state.userSignedIn = false
        state.loading = false
      })
  },
})

export const { setError } = authSlice.actions

export default authSlice.reducer
