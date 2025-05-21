import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <Card id="wd-profile-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Your Profile</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="wd-firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" defaultValue="Alice" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" defaultValue="Wonderland" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" defaultValue="alice@wonderland.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" defaultValue="2000-01-01" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wd-role">
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="FACULTY">
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
                <div className="d-flex">
                    <Link to="/Kambaz/Account/Signin" className="me-auto">
                        <Button variant="outline-secondary">Sign Out</Button>
                    </Link>
                    <Button variant="primary">Save Changes</Button>
                </div>
            </Card.Body>
        </Card>
    );
}