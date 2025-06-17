import { useState, useEffect } from "react";
import { Form, Spinner, Alert } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable, { type User } from "../Courses/People/Table";
import * as client from "./client";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [roleFilter, setRoleFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");

    // Load or reload users list
    const fetchUsers = async () => {
        setLoading(true);
        setError(undefined);
        try {
            const list = await client.findAllUsers();
            setUsers(list as unknown as User[]);
        } catch (e) {
            console.error(e);
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    // Create new user
    const createUser = async () => {
        try {
            const user = await client.createUser({
                firstName: "New",
                lastName: `User${users.length + 1}`,
                username: `newuser${Date.now()}`,
                password: "password123",
                email: `email${users.length + 1}@neu.edu`,
                section: "S101",
                role: "STUDENT",
            });
            setUsers([...users, user as unknown as User]);
        } catch (e) {
            console.error(e);
            setError("Failed to create user");
        }
    };

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter by role
    const filterUsersByRole = async (role: string) => {
        setRoleFilter(role);
        setNameFilter("");
        setLoading(true);
        try {
            if (role) {
                const list = await client.findUsersByRole(role);
                setUsers(list as unknown as User[]);
            } else {
                await fetchUsers();
            }
        } catch {
            setError("Failed to filter by role");
        } finally {
            setLoading(false);
        }
    };

    // Filter by partial name
    const filterUsersByName = async (name: string) => {
        setNameFilter(name);
        setRoleFilter("");
        setLoading(true);
        try {
            if (name) {
                const list = await client.findUsersByPartialName(name);
                setUsers(list as unknown as User[]);
            } else {
                await fetchUsers();
            }
        } catch {
            setError("Failed to filter by name");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border"/> Loading users…
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Users</h3>
                <button onClick={createUser} className="btn btn-danger wd-add-people">
                    <FaPlus className="me-2" />
                    People
                </button>
            </div>

            {/* Filters */}
            <div className="d-flex mb-3">
                <Form.Select
                    value={roleFilter}
                    onChange={(e) => filterUsersByRole(e.target.value)}
                    className="me-2 w-auto"
                >
                    <option value="">All Roles</option>
                    <option value="STUDENT">Students</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrators</option>
                </Form.Select>

                <Form.Control
                    value={nameFilter}
                    onChange={(e) => filterUsersByName(e.target.value)}
                    placeholder="Search by name"
                    className="w-auto ms-2"
                />
            </div>

            {/* Table with refreshUsers callback */}
            <PeopleTable
                users={users}
                enrollments={[]}      // or your actual enrollments slice if still needed
                courseId={""}         // not used on admin screen
                refreshUsers={fetchUsers}
            />
        </div>
    );
}