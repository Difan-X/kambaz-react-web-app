import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

export default function ParentStateComponent() {
    // Declare and initialize counter state
    const [counter, setCounter] = useState(123);

    return (
        <div id="wd-parent-state">
            <h2>Parent Counter: {counter}</h2>

            {/*
        Pass both the current counter value and the setCounter mutator
        down to the child via props.
      */}
            <ChildStateComponent
                counter={counter}
                setCounter={setCounter}
            />

            <hr />
        </div>
    );
}