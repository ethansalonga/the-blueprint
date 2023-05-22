import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "../../firebase/init"
import { AuthFormData } from "../../types/types"

interface initialStateType {
  error: string | undefined
  message: string
  loading: boolean
  userSignedIn: boolean
}

const initialState: initialStateType = {
  error: "",
  message: "",
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }
)

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
      // Sign up
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

      // Sign in
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

      // Sign out
      .addCase(signUserOut.fulfilled, (state) => {
        state.error = ""
        state.userSignedIn = false
        state.loading = false
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.error = ""
        state.loading = true
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.message = "Please check your inbox for further instructions"
        state.loading = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  },
})

export const { setError } = authSlice.actions

export default authSlice.reducer
