import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isDarkMode: false,
  currentTab: "Home",
}

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    darkModeToggled(state) {
      state.isDarkMode = !state.isDarkMode
    },
    setCurrentTab(state, action) {
      state.currentTab = action.payload
    },
  },
})

export const { darkModeToggled, setCurrentTab } = globalSlice.actions

export default globalSlice.reducer
