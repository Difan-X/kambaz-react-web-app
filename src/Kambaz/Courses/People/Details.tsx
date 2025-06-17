import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as client from "../../Account/client";
import type { User } from "./Table";

export default function PeopleDetails({
                                          refreshUsers,
                                      }: {
    refreshUsers: () => void;
}) {
    const { uid } = useParams<{ uid?: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    // Load user details
    useEffect(() => {
        if (!uid) return;
        client.findUserById(uid).then((u) => {
            setUser(u);
            setName(`${u.firstName} ${u.lastName}`);
            setEmail(u.email || "");
            setRole(u.role);
        });
    }, [uid]);

    if (!uid || !user) return null;

    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updated: User = {
            ...user,
            firstName: firstName || "",
            lastName: lastName || "",
            email,
            role,
        };
        await client.updateUser(updated as never);
        setUser(updated as User);
        setEditing(false);
        refreshUsers();
        navigate(-1);
    };

    const cancel = () => {
        navigate(-1);
    };

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={cancel} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>

            <div className="text-center mt-2">
                <FaUserCircle className="text-secondary me-2 fs-1" />
            </div>

            <hr />

            <div className="mb-3 d-flex justify-content-between">
                <button
                    onClick={cancel}
                    className="btn btn-secondary wd-cancel"
                >
                    Cancel
                </button>
                <button
                    onClick={async () => {
                        await client.deleteUser(uid!);
                        refreshUsers();
                        navigate(-1);
                    }}
                    className="btn btn-danger wd-delete"
                >
                    Delete
                </button>
            </div>

            <div className="text-danger fs-4 position-relative">
                {!editing && (
                    <FaPencil
                        className="position-absolute end-0 fs-5 wd-edit"
                        onClick={() => setEditing(true)}
                    />
                )}
                {editing && (
                    <FaCheck
                        className="position-absolute end-0 fs-5 wd-save"
                        onClick={saveUser}
                    />
                )}

                {!editing && (
                    <div onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}
                    </div>
                )}
                {editing && (
                    <Form.Control
                        type="text"
                        className="wd-edit-name mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveUser()}
                    />
                )}
            </div>

            <div className="mb-2">
                <b>Email:</b>{" "}
                {editing ? (
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                ) : (
                    <span>{user.email}</span>
                )}
            </div>

            <div className="mb-2">
                <b>Role:</b>{" "}
                {editing ? (
                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="STUDENT">STUDENT</option>
                        <option value="FACULTY">FACULTY</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </Form.Select>
                ) : (
                    <span>{user.role}</span>
                )}
            </div>

            <div className="mb-2">
                <b>Login ID:</b> <span>{user.loginId}</span>
            </div>
            <div className="mb-2">
                <b>Section:</b> <span>{user.section}</span>
            </div>
            <div className="mb-2">
                <b>Last Activity:</b> <span>{user.lastActivity}</span>
            </div>
            <div className="mb-2">
                <b>Total Activity:</b> <span>{user.totalActivity}</span>
            </div>
        </div>
    );
}