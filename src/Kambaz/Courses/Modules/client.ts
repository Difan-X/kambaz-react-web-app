import axios from "axios";

export interface Module {
    _id: string;
    course: string;
    name: string;
    lessons: string[];
    editing?: boolean;
}

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const ax = axios.create({ withCredentials: true });

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

export const updateModule = async (module: Module): Promise<Module> => {
    const { data } = await ax.put(`${MODULES_API}/${module._id}`, module);
    return data;
};

export const deleteModule = async (moduleId: string): Promise<void> => {
    await ax.delete(`${MODULES_API}/${moduleId}`);
};