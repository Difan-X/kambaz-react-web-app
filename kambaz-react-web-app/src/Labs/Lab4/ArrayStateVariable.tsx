import { useState } from "react";

export default function ArrayStateVariable() {
    // 1. Declare array state with initial values [1, 2, 3, 4, 5]
    const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);

    // 2. Append a random integer to the end of the array
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    // 3. Remove the element at the given index
    const deleteElement = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>

            {/* 4. Button to call addElement */}
            <button
                onClick={addElement}
                className="btn btn-success mb-3"
                id="wd-add-element-click"
            >
                Add Element
            </button>

            {/* 5. Render the array as a Bootstrap-styled list */}
            <ul className="list-group">
                {array.map((item, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {/* Render the item's value */}
                        {item}

                        {/* Button to delete this element by its index */}
                        <button
                            onClick={() => deleteElement(index)}
                            className="btn btn-danger btn-sm"
                            id={`wd-delete-element-${index}-click`}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <hr />
        </div>
    );
}