import axios from "axios";

// Redux 中使用的 Assignment 类型
export interface Assignment {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    module: string;
    notAvailable: string;
    due: string;
    pts: number;
}

// 后端原始返回的字段类型
interface RawAssignment {
    _id: string;
    course: string;
    title: string;
    description?: string;
    module?: string;
    notAvailable?: string;
    dueDate?: string;
    pts?: number;
}

const ax = axios.create({ withCredentials: true });
const REMOTE = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES = `${REMOTE}/api/courses`;
const ASSIGN  = `${REMOTE}/api/assignments`;

/**
 * 拉取某课程下所有作业
 */
export const fetchAssignmentsForCourse = async (
    courseId: string
): Promise<Assignment[]> => {
    const { data } = await ax.get<RawAssignment[]>(
        `${COURSES}/${courseId}/assignments`
    );
    return data.map((a) => ({
        _id: a._id,
        courseId: a.course,
        title: a.title,
        description: a.description,
        module: a.module ?? "",
        notAvailable: a.notAvailable ?? "",
        due: a.dueDate ?? "",
        pts: a.pts ?? 100,
    }));
};

/**
 * 根据 ID 拉取单个作业
 */
export const fetchAssignmentById = async (
    id: string
): Promise<Assignment> => {
    const { data } = await ax.get<RawAssignment>(`${ASSIGN}/${id}`);
    return {
        _id: data._id,
        courseId: data.course,
        title: data.title,
        description: data.description,
        module: data.module ?? "",
        notAvailable: data.notAvailable ?? "",
        due: data.dueDate ?? "",
        pts: data.pts ?? 100,
    };
};

/**
 * 在某课程下创建新作业
 */
export const createAssignment = async (
    courseId: string,
    a: Omit<Assignment, "_id">
): Promise<Assignment> => {
    const { data } = await ax.post<RawAssignment>(
        `${COURSES}/${courseId}/assignments`,
        {
            title: a.title,
            description: a.description,
            module: a.module,
            notAvailable: a.notAvailable,
            dueDate: a.due,
            pts: a.pts,
        }
    );
    return {
        _id: data._id,
        courseId: data.course,
        title: data.title,
        description: data.description,
        module: data.module ?? "",
        notAvailable: data.notAvailable ?? "",
        due: data.dueDate ?? "",
        pts: data.pts ?? 100,
    };
};

/**
 * 更新已有作业
 */
export const updateAssignment = async (
    id: string,
    a: Partial<Assignment>
): Promise<Assignment> => {
    const { data } = await ax.put<RawAssignment>(`${ASSIGN}/${id}`, {
        title: a.title,
        description: a.description,
        module: a.module,
        notAvailable: a.notAvailable,
        dueDate: a.due,
        pts: a.pts,
    });
    return {
        _id: data._id,
        courseId: data.course,
        title: data.title,
        description: data.description,
        module: data.module ?? "",
        notAvailable: data.notAvailable ?? "",
        due: data.dueDate ?? "",
        pts: data.pts ?? 100,
    };
};

/**
 * 删除作业
 */
export const deleteAssignment = (id: string): Promise<void> =>
    ax.delete(`${ASSIGN}/${id}`).then(() => {});