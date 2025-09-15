import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

interface Todo {
    id: string;
    title: string;
}

export default function TodoList() {
    // 1. Read the array of todos from Redux state
    const { todos } = useSelector((state: any) => state.todosReducer);

    return (
        <div id="wd-todo-list-redux">
            <h2>Todo List</h2>
            <ListGroup>
                {/* 2. Render the form for add/update */}
                <TodoForm />

                {/* 3. Map over all todos in Redux and render each item */}
                {todos.map((todo: Todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}