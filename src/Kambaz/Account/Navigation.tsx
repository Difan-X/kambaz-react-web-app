import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
    const { currentUser } = useSelector(
        (s: RootState) => s.accountReducer
    );
    const { pathname } = useLocation();
    const currentSegment = pathname.split("/").pop() || "";

    const links = currentUser
        ? ["Profile"]
        : ["Signin", "Signup"];

    return (
        <ListGroup
            id="wd-account-navigation"
            className="fs-5 rounded-0 wd-list-group"
        >
            {links.map((label) => {
                const toPath = `/Kambaz/Account/${label}`;
                const isActive =
                    currentSegment.toLowerCase() ===
                    label.toLowerCase();
                return (
                    <ListGroup.Item
                        key={label}
                        as={Link}
                        to={toPath}
                        id={`wd-${label.toLowerCase()}-link`}
                        action
                        className={`border-0 ${
                            isActive ? "active" : ""
                        }`}
                    >
                        {label}
                    </ListGroup.Item>
                );
            })}

            {/* ADMIN-only link */}
            {currentUser?.role === "ADMIN" && (
                <ListGroup.Item
                    as={Link}
                    to="/Kambaz/Account/Users"
                    id="wd-users-link"
                    action
                    className={`border-0 ${
                        currentSegment === "Users" ? "active" : ""
                    }`}
                >
                    Users
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}