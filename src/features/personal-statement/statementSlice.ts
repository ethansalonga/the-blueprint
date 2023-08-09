import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../firebase/init"

interface InitialStateType {
  personalStatement: string
  fetchStatementStatus: string
  fetchStatementError: string | undefined
  updateStatementStatus: string
  updateStatementError: string | undefined
}

const initialState: InitialStateType = {
  personalStatement: "",
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
        const statementRef = collection(db, "statement")
        const q = query(statementRef, where("userRef", "==", uid))
        const querySnap = await getDocs(q)

        let statement: DocumentData = {
          statement: "",
          userRef: "",
        }
        querySnap.forEach((doc) => {
          statement = doc.data()
        })

        return statement.statement
      } catch (err) {
        console.log(err)
      }
    }
  }
)

export const updateStatement = createAsyncThunk(
  "statement/updateStatement",
  async (statement: string) => {
    // const { id } = statement
    // const docRef = doc(db, "milestones", id!)
    // const newMilestoneCopy = { ...newMilestone }
    // delete newMilestoneCopy.id
    // await updateDoc(docRef, newMilestoneCopy)
    // return newMilestone
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
      .addCase(fetchStatement.pending, (state) => {
        state.fetchStatementStatus = "loading"
      })
      .addCase(fetchStatement.fulfilled, (state, action) => {
        state.fetchStatementStatus = "succeeded"
        state.personalStatement = action.payload
      })
      .addCase(fetchStatement.rejected, (state, action) => {
        state.fetchStatementStatus = "failed"
        state.fetchStatementError = action.error.message
      })
  },
})

export const { setUpdateStatementStatusIdle } = statementSlice.actions

export default statementSlice.reducer
