import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import type { RootState } from "../store";

export default function AccountNavigation() {
    // 1. Read currentUser from Redux
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // 2. Decide which links to show
    //    If someone is signed in, show only “Profile”
    //    If no one is signed in, show “Signin” and “Signup”
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

    // 3. Determine the current path to mark the active link
    const { pathname } = useLocation();
    //    Example pathname: "/Kambaz/Account/Signin" or "/Kambaz/Account/Profile"
    //    We just care about the last segment:
    const currentSegment = pathname.split("/").pop() || "";

    return (
        <ListGroup id="wd-account-navigation" className="fs-5 rounded-0 wd-list-group">
            {links.map((label) => {
                // 4. Build the “to” path for each link:
                //    label === "Signin"  → "Signin"
                //    label === "Signup"  → "Signup"
                //    label === "Profile" → "Profile"
                const toPath = `/Kambaz/Account/${label}`;

                // 5. Determine if this link is currently active
                //    We compare the capitalized label to the last part of the pathname
                const isActive = currentSegment.toLowerCase() === label.toLowerCase();

                return (
                    <ListGroup.Item
                        key={label}
                        as={Link}
                        to={toPath}
                        id={`wd-${label.toLowerCase()}-link`}
                        action
                        className={`border-0 ${isActive ? "active" : ""}`}
                    >
                        {label}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}