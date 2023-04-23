import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isDarkMode: false,
}

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    darkModeToggled(state) {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

export const { darkModeToggled } = globalSlice.actions

export default globalSlice.reducer
