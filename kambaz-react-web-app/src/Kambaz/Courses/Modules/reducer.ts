import { createSlice } from "@reduxjs/toolkit";
import { modules as dbModules } from "../../Database";
import { v4 as uuidv4 } from "uuid";

interface Module {
    _id: string;
    course: string;
    name: string;
    lessons: string[];
    editing?: boolean;
}

interface ModulesState {
    modules: Module[];
}

const initialState: ModulesState = {
    // 1. Seed initial state from Database
    modules: dbModules.map((m: any) => ({
        _id: m._id,
        course: m.courseId,
        name: m.title,
        lessons: m.lessons ?? [],
        editing: false,
    })),
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        // 2. Add a new module: payload = { name, course }
        addModule: (state, { payload }: { payload: { name: string; course: string } }) => {
            const newModule: Module = {
                _id: uuidv4(),
                course: payload.course,
                name: payload.name,
                lessons: [],
                editing: false,
            };
            state.modules.push(newModule);
        },

        // 3. Delete a module by ID: payload = moduleId
        deleteModule: (state, { payload }: { payload: string }) => {
            state.modules = state.modules.filter((m) => m._id !== payload);
        },

        // 4. Update a module object: payload = full Module
        updateModule: (state, { payload }: { payload: Module }) => {
            state.modules = state.modules.map((m) =>
                m._id === payload._id ? { ...payload } : m
            );
        },

        // 5. Set a module to “editing” mode: payload = moduleId
        editModule: (state, { payload }: { payload: string }) => {
            state.modules = state.modules.map((m) =>
                m._id === payload ? { ...m, editing: true } : m
            );
        },
    },
});

// 6. Export action creators
export const { addModule, deleteModule, updateModule, editModule } =
    modulesSlice.actions;

// 7. Export the reducer
export default modulesSlice.reducer;