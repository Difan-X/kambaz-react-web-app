import { Routes, Route, Navigate } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

export default function Courses() {
    return (
        <div id="wd-courses" className="d-flex">
            <div className="d-none d-md-block">
                <CourseNavigation />
            </div>
            <div className="flex-fill p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" replace />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="People" element={<PeopleTable />} />
                </Routes>
            </div>
        </div>
    );
}