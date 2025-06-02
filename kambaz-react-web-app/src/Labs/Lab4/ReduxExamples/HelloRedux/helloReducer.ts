import { createSlice } from "@reduxjs/toolkit";

// 1. Define the initial state for this slice
const initialState = {
    message: "Hello World",
};

// 2. Create a slice with a name, initial state, and (empty) reducers object
const helloSlice = createSlice({
    name: "hello",
    initialState,
    reducers: {
        // No reducer actions needed for this simple “read‐only” example
    },
});

// 3. Export the reducer function for this slice
export default helloSlice.reducer;