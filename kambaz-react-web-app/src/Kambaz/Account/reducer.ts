import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Define a User type that exactly matches what `db.users` contains.
//    Adjust fields to match your Database.ts `users` array shape.
export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

// 2. The account slice state holds either a User object or null when signed out.
interface AccountState {
    currentUser: User | null;
}

const initialState: AccountState = {
    currentUser: null, // start with no one signed in
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // 3. Now specify that setCurrentUser accepts a payload of type User | null
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
    },
});

// 4. Export the action creator and the reducer
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;