import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <Card id="wd-signup-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="wd-signup-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="newuser" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-signup-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="••••••" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-signup-password-verify">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control type="password" placeholder="••••••" />
                    </Form.Group>
                    <Link to="/Kambaz/Account/Profile">
                        <Button variant="success" className="w-100">Sign Up</Button>
                    </Link>
                </Form>
                <div className="text-center mt-3">
                    <Link to="/Kambaz/Account/Signin">
                        Already have an account? Sign In
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}