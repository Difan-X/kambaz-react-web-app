import { createSlice } from "@reduxjs/toolkit";

// 1. Define the initial state for this slice
const initialState = {
    count: 0,
};

// 2. Create a slice with name "counter", initial state, and two reducer functions
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // increment: increase count by 1
        increment: (state) => {
            state.count = state.count + 1;
        },
        // decrement: decrease count by 1
        decrement: (state) => {
            state.count = state.count - 1;
        },
    },
});

// 3. Export the action creators for increment/decrement
export const { increment, decrement } = counterSlice.actions;

// 4. Export the reducer function itself
export default counterSlice.reducer;