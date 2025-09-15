import HelloRedux from "./HelloRedux/HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList"; // <-- fix the path here

export default function ReduxExamples() {
    return (
        <div id="wd-redux-examples">
            <h2>Redux Examples</h2>

            {/* 1. Hello World from Redux state */}
            <HelloRedux />

            {/* 2. Counter example that dispatches increment/decrement */}
            <CounterRedux />

            {/* 3. Passing data to reducers (arithmetic addition) */}
            <AddRedux />

            {/* 4.3.5.1 Breaking up Large Components: Todo List (local state) */}
            <TodoList />
        </div>
    );
}