import { useState } from "react";

export default function Counter() {
    // Create and initialize a state variable `count` to 7
    const [count, setCount] = useState(7);

    // Log count to the console whenever this component re-renders
    console.log(count);

    return (
        <div id="wd-counter-use-state">
            <h2>Counter: {count}</h2>

            {/* When clicked, increment the state variable `count`. React will re-render this component
          and update the DOM because setCount() tells React that the state changed. */}
            <button
                onClick={() => setCount(count + 1)}
                id="wd-counter-up-click"
            >
                Up
            </button>

            {/* When clicked, decrement the state variable `count`. */}
            <button
                onClick={() => setCount(count - 1)}
                id="wd-counter-down-click"
            >
                Down
            </button>

            <hr />
        </div>
    );
}