import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth"
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { auth, db } from "../../firebase/init"
import {
  AuthFormData,
  AuthFormDataCopy,
  AuthUpdateData,
  AuthAvatarData,
} from "../../types/types"

interface initialStateType {
  error: string | undefined
  message: string
  loading: boolean
  currentUser: User | null
}

const initialState: initialStateType = {
  error: "",
  message: "",
  loading: false,
  currentUser: null,
}

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formData: AuthFormData) => {
    const { email, password } = formData
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    const formDataCopy: AuthFormDataCopy = { ...formData }
    delete formDataCopy.password
    formDataCopy.timestamp = serverTimestamp()

    await setDoc(doc(db, "users", user.uid), formDataCopy)
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

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData: AuthUpdateData) => {
    const { user, email, password } = formData
    await updateEmail(user, email)

    if (password) {
      await updatePassword(user, password)
    }
  }
)

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (formData: AuthAvatarData) => {
    const docRef = doc(db, "users", formData.uid!)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data()
      const updatedData = {
        ...currentData,
        image: formData.url,
      }

      await updateDoc(docRef, updatedData)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
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
        state.loading = false
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })

      // Sign out
      .addCase(signUserOut.fulfilled, (state) => {
        state.error = ""
        state.currentUser = null
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

      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.error = ""
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.message = "Information successfully updated"
        state.loading = false
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  },
})

export const { setMessage, setError, setCurrentUser } = authSlice.actions

export default authSlice.reducer
