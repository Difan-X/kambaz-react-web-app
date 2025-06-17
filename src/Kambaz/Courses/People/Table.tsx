import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";

export type User = {
    _id?: string;
    firstName: string;
    lastName: string;
    email?: string;
    role: string;
    loginId?: string;
    section?: string;
    lastActivity?: string;
    totalActivity?: string;
};

export type Enrollment = { user: string; course: string };

type Props = {
    users: User[];
    enrollments: Enrollment[];   // if you're still filtering by course
    courseId: string;
    refreshUsers: () => void;
};

export default function PeopleTable({
                                        users,
                                        refreshUsers,
                                    }: Props) {
    return (
        <div id="wd-people-table">
            {/* Renders Details when URL has /Users/:uid */}
            <PeopleDetails refreshUsers={refreshUsers} />

            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Name</th><th>Login ID</th><th>Section</th>
                    <th>Role</th><th>Last Activity</th><th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u, idx) => (
                    <tr key={u._id} className={idx % 2 === 0 ? "table-light" : ""}>
                        <td>
                            <Link to={`/Kambaz/Account/Users/${u._id}`} className="d-flex align-items-center text-decoration-none">
                                <FaUserCircle className="me-2 fs-3 text-secondary" />
                                {u.firstName} {u.lastName}
                            </Link>
                        </td>
                        <td>{u.loginId}</td>
                        <td>{u.section}</td>
                        <td>{u.role}</td>
                        <td>{u.lastActivity}</td>
                        <td>{u.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
