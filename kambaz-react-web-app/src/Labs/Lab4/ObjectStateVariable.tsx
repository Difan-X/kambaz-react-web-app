import { useState } from "react";
import FormControl from "react-bootstrap/FormControl"; // ensure react-bootstrap is installed

export default function ObjectStateVariable() {
    // Declare and initialize object state variable with two fields
    const [person, setPerson] = useState({ name: "Peter", age: 24 });

    return (
        <div id="wd-object-state-variables">
            <h2>Object State Variables</h2>

            {/* Display the raw object as formatted JSON */}
            <pre>{JSON.stringify(person, null, 2)}</pre>

            {/*
        Input for `name`:
        - defaultValue is bound to person.name.
        - onChange creates a new object by spreading `person` and overriding `name`.
      */}
            <FormControl
                type="text"
                defaultValue={person.name}
                onChange={(e) =>
                    setPerson({
                        ...person,
                        name: e.target.value,
                    })
                }
                id="wd-person-name-input"
                className="mb-2"
            />

            {/*
        Input for `age`:
        - defaultValue is bound to person.age.
        - onChange creates a new object by spreading `person` and overriding `age`.
        - parseInt is used to convert the input string to a number.
      */}
            <FormControl
                type="number"
                defaultValue={person.age}
                onChange={(e) =>
                    setPerson({
                        ...person,
                        age: parseInt(e.target.value, 10),
                    })
                }
                id="wd-person-age-input"
                className="mb-2"
            />

            <hr />
        </div>
    );
}