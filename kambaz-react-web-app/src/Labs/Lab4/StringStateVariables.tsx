import { useState } from "react";
import FormControl from "react-bootstrap/FormControl"; // make sure react-bootstrap is installed

export default function StringStateVariables() {
    // Declare and initialize a string state variable `firstName` to "John"
    const [firstName, setFirstName] = useState("John");

    return (
        <div id="wd-string-state-variables">
            <h2>String State Variables</h2>

            {/* Render the current value of the string state variable */}
            <p>{firstName}</p>

            {/*
        Render a text input whose defaultValue is bound to `firstName`.
        On each keystroke, update `firstName` via setFirstName(e.target.value).
      */}
            <FormControl
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="wd-firstname-input"
            />

            <hr />
        </div>
    );
}