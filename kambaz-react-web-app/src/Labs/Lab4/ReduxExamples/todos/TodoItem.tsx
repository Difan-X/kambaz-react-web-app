import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {/* “Delete” button dispatches deleteTodo with payload = todo.id */}
            <Button
                variant="danger"
                size="sm"
                onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="me-2"
            >
                Delete
            </Button>

            {/* “Edit” button dispatches setTodo with payload = todo object */}
            <Button
                variant="secondary"
                size="sm"
                onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="me-2"
            >
                Edit
            </Button>

            {/* Render the todo’s title */}
            <span>{todo.title}</span>
        </ListGroup.Item>
    );
}