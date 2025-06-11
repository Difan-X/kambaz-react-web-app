import { useSelector, useDispatch } from "react-redux";
import { add } from "./addReducer";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useState} from "react";

export default function AddRedux() {
    // 1. Maintain local component state for a and b
    const [a, setA] = useState(12);
    const [b, setB] = useState(23);

    // 2. Use useSelector to read `sum` from state.addReducer
    const { sum } = useSelector((state: any) => state.addReducer);

    // 3. Get the Redux dispatch function
    const dispatch = useDispatch();

    return (
        <div className="w-25" id="wd-add-redux">
            <h1>Add Redux</h1>

            {/* 4. Display the local values of a, b, and the Redux-managed sum */}
            <h2>
                {a} + {b} = {sum}
            </h2>

            {/* 5. Input field for a */}
            <FormControl
                type="number"
                defaultValue={a}
                onChange={(e) => setA(parseInt(e.target.value, 10))}
                className="mb-2"
                id="wd-add-redux-a-input"
            />

            {/* 6. Input field for b */}
            <FormControl
                type="number"
                defaultValue={b}
                onChange={(e) => setB(parseInt(e.target.value, 10))}
                className="mb-2"
                id="wd-add-redux-b-input"
            />

            {/* 7. Button to dispatch the `add` action with payload { a, b } */}
            <Button
                id="wd-add-redux-click"
                onClick={() => dispatch(add({ a, b }))}
                variant="primary"
            >
                Add Redux
            </Button>

            <hr />
        </div>
    );
}