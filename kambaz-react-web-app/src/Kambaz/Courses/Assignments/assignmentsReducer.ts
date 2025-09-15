import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { assignments as initialAssignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

/**
 * 1. Define an Assignment interface that matches your Database.ts shape.
 *    Adjust fields to match exactly what `db.assignments` contains.
 */
export interface Assignment {
    _id: string;
    courseId: string;
    title: string;
    module: string;
    notAvailable: string; // e.g. "2023-05-13 at 11:59pm"
    due: string;          // e.g. "2023-05-13 at 11:59pm"
    pts: number;
    description?: string;
    // (Add more fields if your Database.ts has them, e.g. “availableFrom” or “availableUntil” etc.)
}

/**
 * 2. The slice’s state will simply be an array of Assignment objects.
 */
interface AssignmentsState {
    assignments: Assignment[];
}

const initialState: AssignmentsState = {
    // Spread the imported “initial assignments” into our own array so we can modify them.
    assignments: [...(initialAssignments as Assignment[])],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        /**
         * addAssignment:
         *  - payload will include a partial assignment { courseId, title, module, notAvailable, due, pts, description }
         *  - We generate a new `_id` via uuidv4()
         */
        addAssignment: (
            state,
            action: PayloadAction<
                Omit<Assignment, "_id"> // everything but the _id
            >
        ) => {
            const newAssignment: Assignment = {
                _id: uuidv4(),
                ...action.payload,
            };
            state.assignments.push(newAssignment);
        },

        /**
         * updateAssignment:
         *  - payload is a full Assignment (including its existing _id).
         *  - We replace whichever assignment in the array has that same `_id`.
         */
        updateAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments = state.assignments.map((a) =>
                a._id === action.payload._id ? action.payload : a
            );
        },

        /**
         * deleteAssignment:
         *  - payload is the assignment’s _id (string).
         *  - We filter out that assignment from the array.
         */
        deleteAssignment: (state, action: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(
                (a) => a._id !== action.payload
            );
        },
    },
});

export const {
    addAssignment,
    updateAssignment,
    deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;