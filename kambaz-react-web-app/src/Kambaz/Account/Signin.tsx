import { useState } from "react";
import { FormControl, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, type User } from "./reducer";
import * as db from "../Database"; // should have a `users` array

export default function Signin() {
    const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = () => {
        // Find a matching user in the Database
        const user = db.users.find(
            (u) => u.username === credentials.username && u.password === credentials.password
        );
        if (!user) {
            return; // no match → do nothing or show an error
        }

        // Dispatch the matched user into Redux state
        dispatch(setCurrentUser(user as User));

        // Navigate to Dashboard
        navigate("/Kambaz/Dashboard", { replace: true });
    };

    return (
        <Card id="wd-signin-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Sign In</Card.Title>

                <FormControl
                    type="text"
                    placeholder="Username"
                    className="mb-2"
                    value={credentials.username || ""}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    id="wd-username"
                />

                <FormControl
                    type="password"
                    placeholder="Password"
                    className="mb-2"
                    value={credentials.password || ""}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    id="wd-password"
                />

                <Button onClick={signin} id="wd-signin-btn" className="w-100">
                    Sign In
                </Button>

                <div className="text-center mt-3">
                    <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
                        Need an account? Sign Up
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}