import { useState } from "react";

export default function BooleanStateVariables() {
    // Declare and initialize a boolean state variable `done`, initially true
    const [done, setDone] = useState(true);

    return (
        <div id="wd-boolean-state-variables">
            <h2>Boolean State Variables</h2>

            {/* Display text based on the boolean state `done` */}
            <p>{done ? "Done" : "Not done"}</p>

            {/*
        Render a checkbox whose `checked` is bound to `done`.
        Toggling the checkbox calls setDone(!done) to flip the boolean.
      */}
            <label className="form-control">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={() => setDone(!done)}
                />{" "}
                Done
            </label>

            {/*
        Conditionally render the alert DIV only if `done` is true.
      */}
            {done && (
                <div className="alert alert-success">
                    Yay! you are done
                </div>
            )}

            <hr />
        </div>
    );
}