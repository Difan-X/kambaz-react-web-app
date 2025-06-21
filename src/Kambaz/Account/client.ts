import axios from "axios";
import type { User } from "./reducer";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER =
    import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;

/** Signin */
export const signin = async (credentials: {
    username: string;
    password: string;
}): Promise<User> => {
    const res = await axiosWithCredentials.post(
        `${USERS_API}/signin`,
        credentials
    );
    return res.data;
};

/** Signup */
export const signup = async (user: {
    username: string;
    password: string;
    role: "FACULTY" | "STUDENT";
}): Promise<User> => {
    const res = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return res.data;
};

/** Profile */
export const profile = async (): Promise<User> => {
    const res = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return res.data;
};

/** Signout */
export const signout = async (): Promise<void> => {
    await axiosWithCredentials.post(`${USERS_API}/signout`);
};

/** Fetch all users */
export const findAllUsers = async (): Promise<User[]> => {
    const res = await axiosWithCredentials.get(USERS_API);
    return res.data;
};

/** Fetch by role */
export const findUsersByRole = async (
    role: string
): Promise<User[]> => {
    const res = await axiosWithCredentials.get(
        `${USERS_API}?role=${encodeURIComponent(role)}`
    );
    return res.data;
};

/** Fetch by partial name */
export const findUsersByPartialName = async (
    name: string
): Promise<User[]> => {
    const res = await axiosWithCredentials.get(
        `${USERS_API}?name=${encodeURIComponent(name)}`
    );
    return res.data;
};

/** Fetch a user by ID */
export const findUserById = async (id: string): Promise<User> => {
    const res = await axiosWithCredentials.get(`${USERS_API}/${id}`);
    return res.data;
};

/** Delete a user by ID */
export const deleteUser = async (userId: string): Promise<void> => {
    await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

/** Update an existing user */
export const updateUser = async (user: Partial<User>): Promise<User> => {
    const res = await axiosWithCredentials.put(
        `${USERS_API}/${user._id}`,
        user
    );
    return res.data;
};

/** Create a new user */
export const createUser = async (user: {
    firstName: string;
    lastName: `User${number}`;
    username: `newuser${number}`;
    password: string;
    email: `email${number}@neu.edu`;
    section: string;
    role: string
}): Promise<User> => {
    const res = await axiosWithCredentials.post(USERS_API, user);
    return res.data;
};

export const findCoursesForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

/** Enroll a user into a course by userId & courseId */
export const enrollIntoCourse = async (
    userId: string,
    courseId: string
): Promise<void> => {
    await axiosWithCredentials.post(
        `${USERS_API}/${userId}/courses/${courseId}`
    );
};

/** Unenroll a user from a course */
export const unenrollFromCourse = async (
    userId: string,
    courseId: string
): Promise<void> => {
    await axiosWithCredentials.delete(
        `${USERS_API}/${userId}/courses/${courseId}`
    );
};