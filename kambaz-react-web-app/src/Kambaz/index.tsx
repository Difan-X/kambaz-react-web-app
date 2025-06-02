import { Route, Routes, Navigate } from "react-router-dom";
import KambazNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as db from "./Database";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// 1. Define a Course interface that matches `db.courses`
interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
}

export function Kambaz() {
    // 2. State for the full list of courses (initially from Database)
    const [courses, setCourses] = useState<Course[]>(db.courses);

    // 3. State for the “working” course (used by the Dashboard form for add/edit)
    const [course, setCourse] = useState<Course>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    // 4. Handler to append a brand‐new course
    const addNewCourse = () => {
        const newCourse: Course = { ...course, _id: uuidv4() };
        setCourses([...courses, newCourse]);

        // Clear the “working” form fields after adding
        setCourse({
            _id: "0",
            name: "",
            number: "",
            startDate: "",
            endDate: "",
            image: "/images/reactjs.jpg",
            description: "",
        });
    };

    // 5. Handler to update an existing course (matching by _id)
    const updateCourse = () => {
        setCourses(
            courses.map((c) => (c._id === course._id ? { ...course } : c))
        );

        // Clear the form fields after updating
        setCourse({
            _id: "0",
            name: "",
            number: "",
            startDate: "",
            endDate: "",
            image: "/images/reactjs.jpg",
            description: "",
        });
    };

    // 6. Handler to delete a course by its ID
    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((c) => c._id !== courseId));
    };

    // 7. Handler to copy a course into the form for editing
    const editCourse = (c: Course) => {
        setCourse({ ...c });
    };

    return (
        <div id="wd-kambaz" className="d-flex">
            {/* 8. Sidebar navigation (hidden on xs/sm, visible on md+) */}
            <div className="d-none d-md-block">
                <KambazNavigation />
            </div>

            {/* 9. Main content area (offset from sidebar) */}
            <div className="flex-fill wd-main-content-offset p-3">
                <Routes>
                    {/* Default route → Redirect to “Dashboard” */}
                    <Route path="/" element={<Navigate to="Dashboard" replace />} />

                    {/* Account (Signin/Signup/Profile) lowers to <Account> component */}
                    <Route path="Account/*" element={<Account />} />

                    {/* Protected “Dashboard”: only accessible if user is signed in */}
                    <Route
                        path="Dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    course={course}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                    editCourse={editCourse}
                                />
                            </ProtectedRoute>
                        }
                    />

                    {/* Protected “Courses/:cid/*”: only accessible if user is signed in */}
                    <Route
                        path="Courses/:cid/*"
                        element={
                            <ProtectedRoute>
                                <Courses courses={courses} />
                            </ProtectedRoute>
                        }
                    />

                    {/* (Optionally add other top‐level Kambaz routes here) */}
                </Routes>
            </div>
        </div>
    );
}