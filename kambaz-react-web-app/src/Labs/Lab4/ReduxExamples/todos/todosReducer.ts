import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: string;
    title: string;
}

// 1. Define initial state for this slice
const initialState: {
    todos: Todo[];
    todo: { title: string; id?: string };
} = {
    todos: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ],
    // “working” todo object; id is omitted or can be undefined when adding
    todo: { title: "Learn Mongo" },
};

// 2. Create a slice named “todos” with reducers that update `state` directly
const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // Add a new todo: payload should be { title, id? }
        addTodo: (state, action: PayloadAction<{ title: string; id?: string }>) => {
            const newTodos = [
                ...state.todos,
                {
                    ...action.payload,
                    id: new Date().getTime().toString(), // assign unique ID
                } as Todo,
            ];
            state.todos = newTodos;
            state.todo = { title: "" }; // clear the “working” todo
        },
        // Delete a todo by its ID (payload is string)
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        // Update an existing todo (payload is full Todo object)
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            state.todo = { title: "" }; // clear the “working” todo
        },
        // Set the “working” todo (payload is full Todo object)
        setTodo: (state, action: PayloadAction<Todo>) => {
            state.todo = action.payload;
        },
    },
});

// 3. Export action creators
export const { addTodo, deleteTodo, updateTodo, setTodo } =
    todosSlice.actions;

// 4. Export reducer for store configuration
export default todosSlice.reducer;