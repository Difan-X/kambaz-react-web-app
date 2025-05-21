import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
    return (
        <Card id="wd-signin-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="wd-text-fields-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="jdoe" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-text-fields-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="••••••" />
                    </Form.Group>
                    <Link to="/Kambaz/Account/Profile" id="wd-signin-btn">
                        <Button variant="primary" className="w-100">Sign In</Button>
                    </Link>
                </Form>
                <div className="text-center mt-3">
                    <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
                        Need an account? Sign Up
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}