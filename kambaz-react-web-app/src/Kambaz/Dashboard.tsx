import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import * as db from "./Database";

export default function Dashboard() {
    const courses = db.courses;

    return (
        <Container fluid id="wd-dashboard" className="p-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 id="wd-dashboard-title" className="h4 text-danger mb-0">
                    Dashboard
                </h1>
                <span id="wd-dashboard-published" className="text-muted small">
          Published Courses ({courses.length})
        </span>
            </div>
            <hr />

            {/* Fixed-width cards, auto-wrapped */}
            <Row id="wd-dashboard-courses" className="g-4 justify-content-start">
                {courses.map((course) => (
                    <Col key={course._id} xs="auto">
                        <Card style={{ width: 300 }} className="h-100 shadow-sm">
                            <Link
                                to={`/Kambaz/Courses/${course._id}/Home`}
                                className="text-decoration-none text-body h-100 d-flex flex-column"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/reactjs.jpg"
                                    style={{ height: 140, objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fs-6 text-truncate mb-1">
                                        {course.name}
                                    </Card.Title>
                                    <Card.Text
                                        className="text-muted flex-grow-1 fs-7 text-truncate"
                                        style={{ maxHeight: "4.5em" }}
                                    >
                                        {course.description}
                                    </Card.Text>
                                    <Button variant="outline-danger" size="sm" className="mt-auto">
                                        Go
                                    </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}