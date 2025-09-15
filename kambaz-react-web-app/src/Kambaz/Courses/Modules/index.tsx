import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    editModule,
} from "./reducer";

// Correct import of RootState from the store
import type { RootState } from "../../store";

export default function Modules() {
    // 1. Extract course ID from URL
    const { cid } = useParams<{ cid: string }>();

    // 2. Local state for new module input
    const [moduleName, setModuleName] = useState<string>("");

    // 3. Read modules array from Redux store
    const modules = useSelector((state: RootState) => state.modulesReducer.modules);

    // 4. Get dispatch function
    const dispatch = useDispatch();

    // 5. Filter only this course's modules
    const courseModules = modules.filter((m) => m.course === cid);

    return (
        <div id="wd-modules">
            {/* Pass down moduleName, setModuleName, and addModule callback */}
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={() => {
                    dispatch(addModule({ name: moduleName, course: cid! }));
                    setModuleName("");
                }}
            />

            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-modules-list">
                {courseModules.map((mod: { _id: string; course: string; name: string; lessons: string[]; editing?: boolean }) => (
                    <ListGroup.Item
                        key={mod._id}
                        className="wd-module p-0 mb-5 fs-5 border-gray"
                    >
                        {/* ===================== */}
                        {/*  Module Title Row   */}
                        {/* ===================== */}
                        <div
                            className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center"
                        >
                            <div className="d-flex align-items-center w-75">
                                {/* Drag‐handle icon */}
                                <BsGripVertical className="me-2 fs-3 text-danger" />

                                {/* If not editing, show plain name; if editing, show input */}
                                {!mod.editing && <span className="flex-grow-1">{mod.name}</span>}
                                {mod.editing && (
                                    <FormControl
                                        className="w-50 d-inline-block"
                                        defaultValue={mod.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            dispatch(updateModule({ ...mod, name: e.target.value }))
                                        }
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === "Enter") {
                                                dispatch(updateModule({ ...mod, editing: false }));
                                            }
                                        }}
                                    />
                                )}
                            </div>

                            {/* ModuleControlButtons with deleteModule and editModule */}
                            <ModuleControlButtons
                                moduleId={mod._id}
                                deleteModule={(id: string) => dispatch(deleteModule(id))}
                                editModule={(id: string) => dispatch(editModule(id))}
                            />
                        </div>

                        {/* ===================== */}
                        {/*   Lessons List       */}
                        {/* ===================== */}
                        {mod.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {mod.lessons.map((lesson: string, idx: number) => (
                                    <ListGroup.Item
                                        key={idx}
                                        className="wd-lesson p-3 ps-3 d-flex justify-content-between align-items-center"
                                    >
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3 text-danger" />
                                            <span>{lesson}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <LessonControlButtons />
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}