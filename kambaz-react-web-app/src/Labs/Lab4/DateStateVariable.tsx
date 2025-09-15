import { useState } from "react";
import FormControl from "react-bootstrap/FormControl"; // make sure react-bootstrap is installed

export default function DateStateVariable() {
    // 1. Declare and initialize with today's date
    const [startDate, setStartDate] = useState(new Date());

    // 2. Utility: convert a Date object into "YYYY-MM-DD" (zero-padded)
    const dateObjectToHtmlDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is zero-indexed
        const day = date.getDate();
        const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
        return `${year}-${pad(month)}-${pad(day)}`;
    };

    return (
        <div id="wd-date-state-variables">
            <h2>Date State Variables</h2>

            {/* 3. Display the raw Date object (JSON-stringified) */}
            <h3>Raw Date Object: {JSON.stringify(startDate)}</h3>

            {/* 4. Display the same date in YYYY-MM-DD format */}
            <h3>Formatted for Input: {dateObjectToHtmlDateString(startDate)}</h3>

            {/*
        5. Render an <input type="date"> (via React-Bootstrap’s FormControl).
           defaultValue is the YYYY-MM-DD string.
           onChange updates the stateDate to a new Date(e.target.value).
      */}
            <FormControl
                type="date"
                defaultValue={dateObjectToHtmlDateString(startDate)}
                id="wd-date-input"
                onChange={(e) => setStartDate(new Date(e.target.value))}
            />

            <hr />
        </div>
    );
}