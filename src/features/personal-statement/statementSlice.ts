import { createSlice } from "@reduxjs/toolkit"

interface InitialStateType {
  personalStatement: string
}

const initialState: InitialStateType = {
  personalStatement: "",
}

const statementSlice = createSlice({
  name: "statement",
  initialState,
  reducers: {},
})

export default statementSlice.reducer
