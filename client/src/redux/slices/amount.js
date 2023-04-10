import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  amount: [] 
}

const authSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    // set page for in dashboard default page
    setAmount(state, action) {
        const isExisit =
          state.amount.findIndex((item) => item.id == action.payload.id) !== -1;
  
        if (isExisit) {
          state.amount = state.amount.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
               
              };
            }
            return item;
          });
        } else {
          state.amount.push(action.payload);
        }
      },
      removeAmount: (state, action) => {
        const newSate = current(state.amount);
        const index = newSate.filter((i) => i.id !== action.payload.id);
        if (index.length >= 0) state.amount = index;
      },
    ClearAmount(state) {
      state.amount = []
    }
  }
})

export const { setAmount, ClearAmount, removeAmount } = authSlice.actions
export default authSlice.reducer
