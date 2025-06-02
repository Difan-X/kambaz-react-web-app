import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

interface Credentials {
    username: string;
    password: string;
    passwordVerify: string;
}

export default function SignUp() {
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: "",
        passwordVerify: "",
    });
    const navigate = useNavigate();

    const handleSignUp = () => {
        // 1. Make sure username is not empty and passwords match
        if (
            !credentials.username ||
            credentials.password !== credentials.passwordVerify
        ) {
            alert("Username is required and passwords must match.");
            return;
        }

        // 2. Check if that username already exists
        const existing = db.users.find((u) => u.username === credentials.username);
        if (existing) {
            alert("That username is already taken.");
            return;
        }

        // 3. Build a new user object that has ALL of the required fields
        //    (We fill missing fields with empty strings so TypeScript is happy.)
        const newUser = {
            _id: uuidv4(),
            username: credentials.username,
            password: credentials.password,
            firstName: "",       // <-- required by your Database.ts
            lastName: "",        // <-- required
            email: "",           // <-- required
            dob: "",             // <-- required
            role: "STUDENT",     // default to STUDENT
            loginId: "",         // <-- required
            section: "",         // <-- required
            lastActivity: "",    // <-- required
            totalActivity: "",   // <-- required
        };

        // 4. Push this newUser into the in‐memory db.users array
        db.users.push(newUser);

        // 5. Redirect back to SignIn screen
        navigate("/Kambaz/Account/Signin");
    };

    return (
        <Card
            id="wd-signup-screen"
            className="p-4 shadow-sm mx-auto"
            style={{ maxWidth: 400 }}
        >
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>

                <Form>
                    <Form.Group className="mb-3" controlId="wd-signup-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a username"
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                            id="wd-signup-username"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="wd-signup-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter a password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            id="wd-signup-password"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="wd-signup-password-verify">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter your password"
                            value={credentials.passwordVerify}
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    passwordVerify: e.target.value,
                                })
                            }
                            id="wd-signup-password-verify"
                        />
                    </Form.Group>

                    <Button
                        variant="success"
                        className="w-100"
                        onClick={handleSignUp}
                        id="wd-signup-btn"
                    >
                        Sign Up
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Link to="/Kambaz/Account/Signin" id="wd-signin-link">
                        Already have an account? Sign In
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}