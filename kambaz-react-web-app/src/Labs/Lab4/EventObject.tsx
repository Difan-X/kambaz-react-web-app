import React, { useState } from "react";

export default function EventObject() {
    const [event, setEvent] = useState<any>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Create a shallow copy of the event, replacing target with its outerHTML
        const evt = {
            ...e,
            target: (e.target as HTMLElement).outerHTML,
        };
        // Remove the view property as it's not serializable
        delete (evt as any).view;
        setEvent(evt);
    };

    return (
        <div id="wd-event-object">
            <h2>Event Object</h2>
            <button
                onClick={handleClick}
                className="btn btn-primary"
                id="wd-display-event-obj-click"
            >
                Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr />
        </div>
    );
}