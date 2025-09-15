import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as db from "../../Database";

export default function PeopleTable() {
    const { cid } = useParams<{ cid: string }>();
    const { users, enrollments } = db;
    // Users enrolled in this course per enrollments.json
    const enrolled = users.filter(usr =>
        enrollments.some(en => en.user === usr._id && en.course === cid)
    );
    // If no enrollments found, fallback to showing all users
    const displayList = enrolled.length > 0 ? enrolled : users;

    console.log("PeopleTable—cid:", cid, "enrolled:", enrolled);

    return (
        <div id="wd-people-table" className="p-3 bg-white shadow-sm">
            <Table striped>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {displayList.map(user => (
                    <tr key={user._id}>
                        <td className="wd-full-name text-nowrap">
                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                            <span className="wd-first-name">{user.firstName}</span>{" "}
                            <span className="wd-last-name">{user.lastName}</span>
                        </td>
                        <td className="wd-login-id">{user.loginId}</td>
                        <td className="wd-section">{user.section}</td>
                        <td className="wd-role">{user.role}</td>
                        <td className="wd-last-activity">{user.lastActivity}</td>
                        <td className="wd-total-activity">{user.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}