import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AccountNavigation() {
    return (
        <ListGroup id="wd-account-navigation" className="fs-5 rounded-0 wd list-group">
            <ListGroup.Item
                as={Link}
                to="/Kambaz/Account/Signin"
                id="wd-signin-link"
                action
                className="border-0"
            >
                Sign In
            </ListGroup.Item>

            <ListGroup.Item
                as={Link}
                to="/Kambaz/Account/Signup"
                id="wd-signup-link"
                action
                className="border-0 text-danger"
            >
                Sign Up
            </ListGroup.Item>

            <ListGroup.Item
                as={Link}
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