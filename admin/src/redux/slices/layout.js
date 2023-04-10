import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  curentPage: "courses"
}

const authSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // set page for in dashboard default page
    setPage(state, action) {
      state.curentPage = action.payload
    }
  }
})

export const { setPage } = authSlice.actions
export default authSlice.reducer
