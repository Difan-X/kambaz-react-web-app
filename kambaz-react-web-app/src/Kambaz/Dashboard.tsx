import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, FormControl } from "react-bootstrap";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
}

interface DashboardProps {
    courses: Course[];
    course: Course;
    setCourse: (course: Course) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    editCourse: (course: Course) => void;
}

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                      editCourse,
                                  }: DashboardProps) {
    return (
        <Container fluid className="p-3" id="wd-dashboard">
            {/* ======== Header ======== */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 id="wd-dashboard-title" className="h4 text-danger mb-0">
                    Dashboard
                </h1>
                {/* Since we’re showing ALL courses unfiltered, this count is just courses.length */}
                <span id="wd-dashboard-published" className="text-muted small">
          Published Courses ({courses.length})
        </span>
            </div>
            <hr />

            {/* ======== ADD / UPDATE FORM ======== */}
            <div className="mb-4">
                <h5 className="d-flex justify-content-between align-items-center">
                    <span>New Course</span>
                    <div>
                        {/* Simply call parent’s addNewCourse() */}
                        <Button
                            id="wd-add-new-course-click"
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={addNewCourse}
                        >
                            Add
                        </Button>

                        {/* Call parent’s updateCourse() */}
                        <Button
                            id="wd-update-course-click"
                            variant="warning"
                            size="sm"
                            onClick={updateCourse}
                        >
                            Update
                        </Button>
                    </div>
                </h5>

                {/* Text input bound to `course.name` */}
                <FormControl
                    value={course.name}
                    placeholder="Course Name"
                    className="mb-2"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })}
                />

                {/* Textarea bound to `course.description` */}
                <FormControl
                    as="textarea"
                    rows={3}
                    value={course.description}
                    placeholder="Course Description"
                    className="mb-2"
                    onChange={(e) =>
                        setCourse({ ...course, description: e.target.value })
                    }
                />
            </div>

            <hr />

            {/* ======== GRID OF COURSE CARDS ======== */}
            <Row id="wd-dashboard-courses" className="g-4 justify-content-start">
                {courses.map((c: Course) => (
                    <Col key={c._id} xs="auto">
                        <Card
                            style={{ width: 300 }}
                            className="h-100 shadow-sm position-relative d-flex flex-column"
                        >
                            {/* Clicking the card navigates to that course’s Home */}
                            <Link
                                to={`/Kambaz/Courses/${c._id}/Home`}
                                className="text-decoration-none text-body h-100 d-flex flex-column"
                            >
                                <Card.Img
                                    variant="top"
                                    src={c.image || "/images/reactjs.jpg"}
                                    style={{ height: 140, objectFit: "cover" }}
                                />
                                <Card.Body className="flex-grow-1 d-flex flex-column">
                                    <Card.Title className="fs-6 text-truncate mb-1">
                                        {c.name}
                                    </Card.Title>
                                    <Card.Text
                                        className="text-muted flex-grow-1 fs-7 text-truncate"
                                        style={{ maxHeight: "4.5em" }}
                                    >
                                        {c.description}
                                    </Card.Text>
                                    <Button variant="outline-danger" size="sm" className="mt-auto">
                                        Go
                                    </Button>
                                </Card.Body>
                            </Link>

                            {/* Always show Edit/Delete buttons for now */}
                            <Button
                                id="wd-edit-course-click"
                                variant="warning"
                                size="sm"
                                className="position-absolute"
                                style={{ top: 8, right: 60 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    editCourse(c);
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                id="wd-delete-course-click"
                                variant="danger"
                                size="sm"
                                className="position-absolute"
                                style={{ top: 8, right: 8 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteCourse(c._id);
                                }}
                            >
                                Delete
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}