import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./store"; // ← 推荐自定义 hook

import KambazNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";

import {
    fetchAllCourses,
    createCourse as createCourseClient,
    updateCourse as updateCourseClient,
    deleteCourse as deleteCourseClient,
} from "./Courses/client";
import * as enrollmentsClient from "./Enrollments/client";

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
    department?: string;
    credits?: number;
    author?: string;
    enrolled?: boolean;
}

export default function Kambaz() {
    // 👇 用 useAppSelector 正确读取 currentUser
    const currentUser = useAppSelector(state => state.account.currentUser);

    const [courses, setCourses] = useState<Course[]>([]);
    const [courseForm, setCourseForm] = useState<Course>({
        _id: "0",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        image: "/images/reactjs.jpg",
        description: "",
        department: "",
        credits: 3,
        author: "",
    });
    const [enrolling, setEnrolling] = useState<boolean>(false);

    // 课程数据加载
    const refreshCourses = async () => {
        if (!currentUser) {
            setCourses([]);
            return;
        }
        if (enrolling) {
            // "所有课程"：标记已enroll
            const all = await fetchAllCourses();
            const mine: Course[] = await enrollmentsClient.fetchEnrollments();
            setCourses(
                all.map((c) =>
                    mine.some((m: Course) => m._id === c._id)
                        ? { ...c, enrolled: true }
                        : c
                )
            );
        } else {
            // "我的课程"
            const mine: Course[] = await enrollmentsClient.fetchEnrollments();
            setCourses(mine);
        }
    };

    useEffect(() => {
        refreshCourses();
    }, [currentUser, enrolling]);

    const resetForm = () =>
        setCourseForm({
            _id: "0",
            name: "",
            number: "",
            startDate: "",
            endDate: "",
            image: "/images/reactjs.jpg",
            description: "",
            department: "",
            credits: 3,
            author: "",
        });

    const addCourse = async () => {
        if (!courseForm.name.trim()) return;
        try {
            await createCourseClient(courseForm);
            await refreshCourses();
            resetForm();
        } catch (e) {
            console.error("Error creating course", e);
        }
    };

    const saveCourse = async () => {
        if (courseForm._id === "0") return;
        try {
            await updateCourseClient(courseForm);
            await refreshCourses();
            resetForm();
        } catch (e) {
            console.error("Error updating course", e);
        }
    };

    const removeCourse = async (id: string) => {
        try {
            await deleteCourseClient(id);
            await refreshCourses();
        } catch (e) {
            console.error("Error deleting course", e);
        }
    };

    const editCourse = (c: Course) => {
        setCourseForm({ ...c });
    };

    const updateEnrollment = async (courseId: string, enroll: boolean) => {
        if (!currentUser) return;
        if (enroll) {
            await enrollmentsClient.enrollCourse(courseId);
        } else {
            await enrollmentsClient.unenrollCourse(courseId);
        }
        await refreshCourses();
    };

    return (
        <Session>
            <div id="wd-kambaz" className="d-flex">
                <div className="d-none d-md-block">
                    <KambazNavigation />
                </div>
                <div className="flex-fill wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" replace />} />
                        <Route path="Account/*" element={<Account />} />
                        <Route
                            path="Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        courseForm={courseForm}
                                        setCourseForm={setCourseForm}
                                        addCourse={addCourse}
                                        saveCourse={saveCourse}
                                        removeCourse={removeCourse}
                                        editCourse={editCourse}
                                        enrolling={enrolling}
                                        setEnrolling={setEnrolling}
                                        updateEnrollment={updateEnrollment}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}