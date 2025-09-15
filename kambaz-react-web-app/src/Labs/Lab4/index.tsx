import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import EventObject from "./EventObject";
import ToggleText from "./ToggleText";
import ControlledInput from "./ControlledInput";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ChildStateComponent from "./ChildStateComponent";
import ReduxExamples from "./ReduxExamples";
import HelloRedux from "./ReduxExamples/HelloRedux/HelloRedux";
import TodoList from "./ReduxExamples/todos/TodoList";


export default function Lab4() {
    // A simple function to demonstrate passing functions as props
    function sayHello() {
        alert("Hello");
    }

    return (
        <div id="wd-lab4">
            <h2>Lab 4: Handling Events, State & Redux</h2>

            {/* 1. Click event examples */}
            <ClickEvent />

            {/* 2. Passing data to event handlers */}
            <PassingDataOnEvent />

            {/* 3. Passing functions as props */}
            <PassingFunctions theFunction={sayHello} />

            {/* 4. Counter component using useState */}
            <Counter />

            {/* 5. Displaying the native Event object */}
            <EventObject />

            {/* ------------------------------------------------------------ */}
            {/* 4.2.2 Managing Component State – useState examples below */}
            {/* ------------------------------------------------------------ */}

            {/* 6. Toggle between “On” and “Off” */}
            <ToggleText />

            {/* 7. Controlled text input example */}
            <ControlledInput />

            {/* 8. Boolean state variables (show/hide & checkbox) */}
            <BooleanStateVariables />

            {/* 9. String state variables (text input bound to state) */}
            <StringStateVariables />

            {/* 10. Date state variables (HTML date picker bound to state) */}
            <DateStateVariable />

            {/* 11. Object state variables (multiple fields in one state object) */}
            <ObjectStateVariable />

            {/* 12. Array state variables (add/remove items in an array) */}
            <ArrayStateVariable />

            {/* ------------------------------------------------------------ */}
            {/* 4.2.2.8 Sharing State Between Components */}
            {/* ------------------------------------------------------------ */}

            {/* 13. Parent-Child counter example. */}
            <ParentStateComponent />
            <ChildStateComponent
                counter={0}
                setCounter={() => {}}
            />
            {/*
        Note: The ChildStateComponent will also be rendered inside ParentStateComponent,
        so you could remove this standalone line if you only want the child inside its parent.
      */}

            {/* ------------------------------------------------------------ */}
            {/* 4.3 Managing Application State with Redux */}
            {/* ------------------------------------------------------------ */}

            {/* 14. Placeholder for Redux examples */}
            <ReduxExamples />
            {/* 15. Hello World Redux component */}
            <HelloRedux />
            {/* 4.3.5 Todo List using only component state */}
            <TodoList />
        </div>
    );
}