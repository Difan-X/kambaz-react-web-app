import axios from "axios";

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

export interface Module {
    _id: string;
    course: string;
    name: string;
    lessons: string[];
}

export interface Assignment {
    _id: string;
    course: string;
    title: string;
    description?: string;
    dueDate?: string;
}

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API   = `${REMOTE_SERVER}/api/courses`;
const ax = axios.create({ withCredentials: true });

// --- Courses API ---

export const fetchAllCourses = async (): Promise<Course[]> => {
    const { data } = await ax.get(COURSES_API);
    return data;
};

export const createCourse = async (course: Course): Promise<Course> => {
    const { data } = await ax.post(COURSES_API, course);
    return data;
};

export const updateCourse = async (
    course: Course
): Promise<{ acknowledged: boolean; modifiedCount: number }> => {
    const { data } = await ax.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
    await ax.delete(`${COURSES_API}/${id}`);
};

// --- Modules API ---

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
    const { data } = await ax.get(`${COURSES_API}/${courseId}/modules`);
    return data;
};

export const createModuleForCourse = async (
    courseId: string,
    moduleData: { name: string; description?: string }
): Promise<Module> => {
    const { data } = await ax.post(`${COURSES_API}/${courseId}/modules`, moduleData);
    return data;
};

// 根据教师查课程
export const fetchAllCoursesByFaculty = async (facultyId: string): Promise<Course[]> => {
    const { data } = await ax.get(`${COURSES_API}?faculty=${facultyId}`);
    return data;
};

// 查询学生自己已选课程（通常是 enrollments 路由）
export const fetchEnrolledCourses = async (): Promise<Course[]> => {
    const { data } = await ax.get(`${REMOTE_SERVER}/api/enrollments`);
    return data;
};

// 选课
export const enrollIntoCourse = async (_userId: string, courseId: string): Promise<void> => {
    await ax.post(`${REMOTE_SERVER}/api/enrollments/${courseId}`);
};
// 退课
export const unenrollFromCourse = async (_userId: string, courseId: string): Promise<void> => {
    await ax.delete(`${REMOTE_SERVER}/api/enrollments/${courseId}`);
};
// --- Assignments API ---

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
    const { data } = await ax.get(`${COURSES_API}/${courseId}/assignments`);
    return data;
};

export const findAssignmentById = async (id: string): Promise<Assignment> => {
    const { data } = await ax.get(`${COURSES_API}/assignments/${id}`);
    return data;
};

export const createAssignmentForCourse = async (
    courseId: string,
    assignment: Omit<Assignment, "_id">
): Promise<Assignment> => {
    const { data } = await ax.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return data;
};

export const updateAssignment = async (assignment: Assignment): Promise<Assignment> => {
    const { data } = await ax.put(`${COURSES_API}/assignments/${assignment._id}`, assignment);
    return data;
};

export const deleteAssignment = async (id: string): Promise<void> => {
    await ax.delete(`${COURSES_API}/assignments/${id}`);
};