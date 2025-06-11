import { useState } from "react";

export default function ControlledInput() {
    // Initialize an empty string in state to hold the input’s value
    const [text, setText] = useState("");

    // Update the state on every keystroke
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div id="wd-controlled-input">
            <h2>Controlled Input Example</h2>
            <label htmlFor="wd-input" className="form-label">
                Type something:
            </label>
            <input
                id="wd-input"
                type="text"
                value={text}                   // value is bound to state
                onChange={handleChange}        // onChange updates state
                className="form-control mb-2"
                placeholder="Enter text here"
            />
            <p>You typed: <strong>{text || "(nothing yet)"}</strong></p>
            <hr />
        </div>
    );
}