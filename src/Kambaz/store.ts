import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/assignmentsReducer";
import courseReducer from "./Courses/courseReducer";
import enrollmentsReducer from "./Enrollments/enrollmentsReducer";
import quizzesReducer from "./Courses/Quizzes/quizzesSlice";

const store = configureStore({
    reducer: {
        modules: modulesReducer,
        account: accountReducer,
        assignment: assignmentsReducer,
        courses: courseReducer,
        enrollment: enrollmentsReducer,
        quizzes: quizzesReducer,
    },
});

export default store;

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ===== Add these hooks =====
import {type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Typed versions of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;