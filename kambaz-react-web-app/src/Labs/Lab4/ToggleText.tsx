import { useState } from "react";

export default function ToggleText() {
    // Initialize a boolean in state; `false` means “Off”
    const [isOn, setIsOn] = useState(false);

    // Flip the boolean whenever the button is clicked
    const handleToggle = () => {
        setIsOn((prev) => !prev);
    };

    return (
        <div id="wd-toggle-text">
            <h2>Toggle Text Example</h2>
            <p>The toggle is currently: <strong>{isOn ? "On" : "Off"}</strong></p>
            <button
                onClick={handleToggle}
                className="btn btn-secondary"
                id="wd-toggle-button"
            >
                {isOn ? "Turn Off" : "Turn On"}
            </button>
            <hr />
        </div>
    );
}