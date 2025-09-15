import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

export default function TodoForm() {
    // 1. Read `todo` from Redux state
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex align-items-center">
            {/* “Add” button dispatches addTodo with payload = current todo */}
            <Button
                variant="success"
                size="sm"
                onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"
                className="me-2"
            >
                Add
            </Button>

            {/* “Update” button dispatches updateTodo with payload = current todo */}
            <Button
                variant="warning"
                size="sm"
                onClick={() => dispatch(updateTodo(todo as Todo))}
                id="wd-update-todo-click"
                className="me-2"
            >
                Update
            </Button>

            {/* Text input bound to todo.title */}
            <FormControl
                type="text"
                value={(todo as Todo).title || ""}
                placeholder="Enter todo title"
                onChange={(e) =>
                    dispatch(setTodo({ ...(todo as Todo), title: e.target.value }))
                }
                id="wd-todo-input"
            />
        </ListGroup.Item>
    );
}