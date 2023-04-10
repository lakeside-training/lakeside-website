import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  labData: {
    // labMode -> work & view
    labMode: "",
    data: {},
    isLabEnd: false
  }
}

const labSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {
    // set labData
    setLabData(state, action) {
      state.labData = action.payload
    },
    // reset labData
    resetLabData(state, action) {
      state.labData = initialState.labData
    },
    handleLab(state, action) {
      state.labData = action.payload
    }
  }
})

export const { setLabData } = labSlice.actions
export default labSlice.reducer
