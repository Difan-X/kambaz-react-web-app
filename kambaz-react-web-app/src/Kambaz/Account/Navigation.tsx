import { ListGroup } from "react-bootstrap";
import { NavLink }   from "react-router-dom";

export default function AccountNavigation() {
    return (
        <ListGroup id="wd-account-navigation" className="fs-5 rounded-0 wd list-group">
            <ListGroup.Item
                as={NavLink}
                to="/Kambaz/Account/Signin"
                end
                id="wd-signin-link"
                action
                className="border-0"
            >
                Sign In
            </ListGroup.Item>

            <ListGroup.Item
                as={NavLink}
                to="/Kambaz/Account/Signup"
                id="wd-signup-link"
                action
                className="border-0"
            >
                Sign Up
            </ListGroup.Item>

            <ListGroup.Item
                as={NavLink}
                to="/Kambaz/Account/Profile"
                id="wd-profile-link"
                action
                className="border-0"
            >
                Profile
            </ListGroup.Item>
        </ListGroup>
    );
}