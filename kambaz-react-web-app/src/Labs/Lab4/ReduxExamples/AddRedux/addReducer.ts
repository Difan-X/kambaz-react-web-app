import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Define the initial state for this slice (sum starts at 0)
const initialState = {
    sum: 0,
};

// 2. Create a slice named "add" with one reducer that reads payload.a and payload.b
const addSlice = createSlice({
    name: "add",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<{ a: number; b: number }>) => {
            // Compute sum = a + b
            state.sum = action.payload.a + action.payload.b;
        },
    },
});

// 3. Export the action creator "add"
export const { add } = addSlice.actions;

// 4. Export the reducer function for this slice
export default addSlice.reducer;