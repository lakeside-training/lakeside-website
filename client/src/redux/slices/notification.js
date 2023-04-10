import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification: [],
    notificationCount: 0
};

const notifications = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notification(state, action) {
            state.notification = action.payload
        },
        notificationCount(state, action) {
            state.notificationCount = action.payload
        }
    },
});

export const { notification, notificationCount } = notifications.actions;
export default notifications.reducer;