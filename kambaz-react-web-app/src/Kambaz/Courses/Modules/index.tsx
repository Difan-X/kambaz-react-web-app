import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import * as db from "../../Database";

export default function Modules() {
    // grab the course ID from the URL
    const { cid } = useParams<{ cid: string }>();
    // filter modules by that ID
    const modules = db.modules.filter((m) => m.courseId === cid);

    return (
        <div id="wd-modules">
            <ModulesControls />
            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-modules">
                {modules.map((mod) => (
                    <ListGroup.Item
                        key={mod._id}
                        className="wd-module p-0 mb-5 fs-5 border-gray"
                    >
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {mod.title}
                            <ModuleControlButtons />
                        </div>

                        {mod.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {mod.lessons.map((lesson, idx) => (
                                    <ListGroup.Item
                                        key={idx}
                                        className="wd-lesson p-3 ps-3"
                                    >
                                        <BsGripVertical className="me-2 fs-3" />
                                        {lesson}
                                        <LessonControlButtons />
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