import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  steps: {}
}

const authSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    // set page for in dashboard default page
    setSteps(state, action) {
      state.steps = action.payload
    },
    stepClear(state) {
      state.steps = {}
    }
  }
})

export const { setSteps, stepClear } = authSlice.actions
export default authSlice.reducer
