import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

interface Course {
    cid: string;
    code: string;
    title: string;
}

export default function Dashboard() {
    const courses: Course[] = [
        { cid: "5400", code: "CS 5400", title: "Principles of Programming Languages" },
        { cid: "5500", code: "CS 5500", title: "Foundations of Software Engineering" },
        { cid: "5520", code: "CS 5520", title: "Mobile Application Development" },
        { cid: "5600", code: "CS 5600", title: "Computer Systems" },
        { cid: "5610", code: "CS 5610", title: "Web Development" },
        { cid: "5700", code: "CS 5700", title: "Fundamentals of Networking" },
        { cid: "5850", code: "CS 5850", title: "Building Game Engines" },
    ];

    return (
        <Container fluid id="wd-dashboard" className="p-3">
            {/* Heading + subtitle */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 id="wd-dashboard-title" className="h4 text-danger mb-0">
                    Dashboard
                </h1>
                <span id="wd-dashboard-published" className="text-muted small">
          Published Courses ({courses.length})
        </span>
            </div>
            <hr />

            {/* Responsive grid: 1 / 2 / 3 / 4 / 5 cards across */}
            <Row
                xs={1}
                sm={2}
                md={3}
                lg={4}
                xl={5}
                className="g-4"
                id="wd-dashboard-courses"
            >
                {courses.map((course) => (
                    <Col key={course.cid}>
                        <Card className="h-100 shadow-sm">
                            <Link
                                to={`/Kambaz/Courses/${course.cid}/Home`}
                                className="text-decoration-none text-body h-100 d-flex flex-column"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/reactjs.jpg"
                                    style={{ height: 140, objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fs-6 text-truncate mb-1">
                                        {course.code}
                                    </Card.Title>
                                    <Card.Text
                                        className="text-muted flex-grow-1 fs-7 text-truncate"
                                    >
                                        {course.title}
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