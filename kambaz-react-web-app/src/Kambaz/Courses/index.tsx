import { courses } from "../Database";
import { FaAlignJustify } from "react-icons/fa6";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

export default function Courses() {
    const { cid } = useParams();
    const course = courses.find(c => c._id === cid);
    const { pathname } = useLocation();
    const parts = pathname.split("/");
    const section = parts[4] || "Home";

    return (
        <div id="wd-courses" className="d-flex">
            {/* Sidebar navigation */}
            <div className="d-none d-md-block">
                <CourseNavigation />
            </div>

            {/* Main content area */}
            <div className="flex-fill p-3">
                {/* Breadcrumb header showing selected course and section */}
                <h2 className="text-danger d-flex align-items-center">
                    <FaAlignJustify className="me-2 fs-4" />
                    {course ? course.name : "Course"} &gt; {section}
                </h2>
                <hr />

                <Routes>
                    <Route index element={<Navigate to="Home" replace />} />
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
