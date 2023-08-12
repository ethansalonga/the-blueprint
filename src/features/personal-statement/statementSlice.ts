import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../../firebase/init"
import { PersonalStatement } from "../../types/types"

interface InitialStateType {
  personalStatement: PersonalStatement
  fetchStatementStatus: string
  fetchStatementError: string | undefined
  updateStatementStatus: string
  updateStatementError: string | undefined
}

const initialState: InitialStateType = {
  personalStatement: { id: "", statement: "", userRef: "" },
  fetchStatementStatus: "idle",
  fetchStatementError: "",
  updateStatementStatus: "idle",
  updateStatementError: "",
}

export const fetchStatement = createAsyncThunk(
  "statement/fetchStatement",
  async (uid: string) => {
    {
      try {
        const statementRef = collection(db, "statements")
        const q = query(statementRef, where("userRef", "==", uid))
        const querySnap = await getDocs(q)

        let statementCopy = {
          id: "",
          statement: "",
          userRef: "",
        }
        querySnap.forEach((doc) => {
          const { id, statement, userRef } = doc.data()
          statementCopy = {
            id,
            statement,
            userRef,
          }
        })

        return statementCopy
      } catch (err) {
        console.log(err)
      }
    }
  }
)

export const updateStatement = createAsyncThunk(
  "statement/updateStatement",
  async (newStatement: PersonalStatement) => {
    const { id } = newStatement
    const docRef = doc(db, "statements", id!)
    const newStatementCopy = { ...newStatement }
    delete newStatementCopy.id
    await updateDoc(docRef, newStatementCopy)
    return newStatement
  }
)

const statementSlice = createSlice({
  name: "statement",
  initialState,
  reducers: {
    setUpdateStatementStatusIdle(state) {
      state.updateStatementStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      // Fetch statement
      .addCase(fetchStatement.pending, (state) => {
        state.fetchStatementStatus = "loading"
      })
      .addCase(fetchStatement.fulfilled, (state, action) => {
        state.fetchStatementStatus = "succeeded"
        const { id, statement, userRef } = action.payload as PersonalStatement
        state.personalStatement = { id, statement, userRef }
      })
      .addCase(fetchStatement.rejected, (state, action) => {
        state.fetchStatementStatus = "failed"
        state.fetchStatementError = action.error.message
      })

      // Update statement
      .addCase(updateStatement.pending, (state) => {
        state.updateStatementStatus = "loading"
      })
      .addCase(updateStatement.fulfilled, (state, action) => {
        state.updateStatementStatus = "succeeded"
        const { id, statement, userRef } = action.payload
        state.personalStatement = { id, statement, userRef }
      })
      .addCase(updateStatement.rejected, (state, action) => {
        state.updateStatementStatus = "failed"
        state.updateStatementError = action.error.message
      })
  },
})

export const { setUpdateStatementStatusIdle } = statementSlice.actions

export default statementSlice.reducer
