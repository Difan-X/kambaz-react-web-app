import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// (Other Lab 3 imports omitted for brevity)
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
// import TodoList from "./todos/TodoList";  // <-- Remove or rename if you still need the local version
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";
import {ListGroup} from "react-bootstrap";

export default function Lab3() {
    // Select `todos` from the Redux store’s todosReducer slice
    const { todos } = useSelector((state: any) => state.todosReducer);

    console.log("Hello World!");

    return (
        <div id="wd-lab3" className="p-3">
            <h2>Lab 3</h2>
            <Outlet />

            {/* ---------------------------------------------------------------- */}
            {/* DISPLAY REDUX-MANAGED TODOS AT THE TOP OF LAB 3 */}
            {/* ---------------------------------------------------------------- */}
            <div id="wd-lab3-todos" className="mb-4">
                <h3>Shared Todo List (from Redux)</h3>
                <ListGroup>
                    {todos.map((todo: any) => (
                        <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
                    ))}
                </ListGroup>
                <hr />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* THE REST OF YOUR EXISTING LAB 3 CONTENT BELOW */}
            {/* ---------------------------------------------------------------- */}
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanVariables />
            <IfElse />
            <TernaryOperator />
            <ConditionalOutputIfElse />
            <ConditionalOutputInline />
            <LegacyFunctions />
            <ArrowFunctions />
            <ImpliedReturn />
            <TemplateLiterals />
            <SimpleArrays />
            <ArrayIndexAndLength />
            <AddingAndRemovingToFromArrays />
            <ForLoops />
            <MapFunction />
            <FindFunction />
            <FindIndex />
            <FilterFunction />
            <JsonStringify />
            <House />

            {/* If you still want to render the old local-state TodoList, you can do so here
          under a different name (e.g., <LocalTodoList />) after renaming its import. */}
            {/* <h3>Local TodoList (component‐state only)</h3>
          <LocalTodoList />  */}

            <Spreading />
            <Destructing />
            <FunctionDestructing />
            <DestructingImports />
            <Classes />

            <h4>Square of 4</h4>
            <Square>4</Square>
            <hr />

            <h4>Highlighted Text</h4>
            <Highlight>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eaque
                illo minus cum, saepe totam vel nihil repellat nemo explicabo
                excepturi consectetur.
            </Highlight>
            <hr />

            <Add a={3} b={4} />
            <hr />

            <PathParameters />

            <h3>JavaScript</h3>
        </div>
    );
}