import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";

export default function CounterRedux() {
    // 1. Read `count` from state.counterReducer
    const { count } = useSelector((state: any) => state.counterReducer);

    // 2. Get the Redux dispatch function
    const dispatch = useDispatch();

    return (
        <div id="wd-counter-redux">
            <h2>Counter Redux</h2>

            {/* Display the current count */}
            <h3>{count}</h3>

            {/* Dispatch increment action when clicked */}
            <button
                onClick={() => dispatch(increment())}
                className="btn btn-primary me-2"
                id="wd-counter-redux-increment-click"
            >
                Increment
            </button>

            {/* Dispatch decrement action when clicked */}
            <button
                onClick={() => dispatch(decrement())}
                className="btn btn-secondary"
                id="wd-counter-redux-decrement-click"
            >
                Decrement
            </button>
            <hr />
        </div>
    );
}
