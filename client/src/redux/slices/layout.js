import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: "courses",
};

const authSlice = createSlice({
	name: "layout",
	initialState,
	reducers: {
		// set page for in dashboard default page
		setPage(state, action) {
			console.log("action", action.payload);
			state.currentPage = action.payload;
		},
	},
});

export const { setPage } = authSlice.actions;
export default authSlice.reducer;
