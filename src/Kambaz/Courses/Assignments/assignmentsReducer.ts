import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Assignment {
    _id: string;
    courseId: string;
    title: string;
    module: string;
    notAvailable: string;
    due: string;
    pts: number;
    description?: string;
}

interface AssignmentsState {
    assignments: Assignment[];
}

const initialState: AssignmentsState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action: PayloadAction<Assignment[]>) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments.push(action.payload);
        },
        updateAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments = state.assignments.map((a) =>
                a._id === action.payload._id ? action.payload : a
            );
        },
        deleteAssignment: (state, action: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(
                (a) => a._id !== action.payload
            );
        },
    },
});

export const {
    setAssignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;