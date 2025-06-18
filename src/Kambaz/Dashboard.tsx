import { type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    FormControl,
} from "react-bootstrap";

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
    enrolled?: boolean;
}

export interface DashboardProps {
    courses: Course[];
    courseForm: Course;
    setCourseForm: Dispatch<SetStateAction<Course>>;
    addCourse: () => Promise<void>;
    saveCourse: () => Promise<void>;
    removeCourse: (courseId: string) => Promise<void>;
    editCourse: (c: Course) => void;
    enrolling: boolean;
    setEnrolling: Dispatch<SetStateAction<boolean>>;
    updateEnrollment: (courseId: string, enroll: boolean) => Promise<void>;
}

export default function Dashboard({
                                      courses,
                                      courseForm,
                                      setCourseForm,
                                      addCourse,
                                      saveCourse,
                                      removeCourse,
                                      editCourse,
                                      enrolling,
                                      setEnrolling,
                                      updateEnrollment,
                                  }: DashboardProps) {
    const isEditing = courseForm._id !== "0";

    return (
        <Container fluid className="p-3" id="wd-dashboard">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="h4 text-danger mb-0">Dashboard</h1>
                <span className="text-muted small">
          Published Courses ({courses.length})
        </span>
            </div>
            <hr />

            {/* 切换视图 */}
            <div className="mb-3">
                <Button
                    size="sm"
                    variant={enrolling ? "outline-primary" : "primary"}
                    className="me-2"
                    onClick={() => setEnrolling(false)}
                >
                    My Courses
                </Button>
                <Button
                    size="sm"
                    variant={enrolling ? "primary" : "outline-primary"}
                    onClick={() => setEnrolling(true)}
                >
                    All Courses
                </Button>
            </div>

            {/* Add/Edit */}
            <div className="mb-4">
                <h5 className="d-flex justify-content-between align-items-center">
                    <span>{isEditing ? "Edit Course" : "New Course"}</span>
                    <div>
                        {!isEditing ? (
                            <Button size="sm" variant="primary" onClick={addCourse}>
                                Add
                            </Button>
                        ) : (
                            <Button size="sm" variant="warning" onClick={saveCourse}>
                                Update
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="secondary"
                            className="ms-2"
                            onClick={() =>
                                setCourseForm({
                                    _id: "0",
                                    name: "",
                                    number: "",
                                    startDate: "",
                                    endDate: "",
                                    image: "/images/reactjs.jpg",
                                    description: "",
                                })
                            }
                        >
                            Reset
                        </Button>
                    </div>
                </h5>
                <FormControl
                    value={courseForm.name}
                    placeholder="Course Name"
                    className="mb-2"
                    onChange={(e) =>
                        setCourseForm({ ...courseForm, name: e.target.value })
                    }
                />
                <FormControl
                    as="textarea"
                    rows={3}
                    value={courseForm.description}
                    placeholder="Description"
                    onChange={(e) =>
                        setCourseForm({ ...courseForm, description: e.target.value })
                    }
                />
            </div>
            <hr />

            {/* Course Cards */}
            <Row className="g-4">
                {courses.map((c) => {
                    const enrolled = Boolean(c.enrolled);
                    return (
                        <Col key={c._id} xs="auto">
                            <Card
                                className="h-100"
                                style={{ width: 300, position: "relative" }}
                            >
                                <Card.Img
                                    src={c.image || "/images/reactjs.jpg"}
                                    style={{ height: 140, objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="flex-grow-1 text-truncate mb-1">
                                        {c.name}
                                        {enrolled && <span className="ms-2 text-success">✔</span>}
                                    </Card.Title>
                                    <Card.Text className="flex-grow-1 text-truncate">
                                        {c.description}
                                    </Card.Text>
                                    <div className="d-flex gap-2 mt-2">
                                        <Button
                                            size="sm"
                                            variant={enrolled ? "outline-secondary" : "success"}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateEnrollment(c._id, !enrolled);
                                            }}
                                        >
                                            {enrolled ? "Unenroll" : "Enroll"}
                                        </Button>
                                        <Link
                                            to={`/Kambaz/Courses/${c._id}/Home`}
                                            className="flex-fill"
                                        >
                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                className="w-100"
                                            >
                                                Go
                                            </Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                                <Button
                                    size="sm"
                                    variant="warning"
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
                                    size="sm"
                                    variant="danger"
                                    className="position-absolute"
                                    style={{ top: 8, right: 8 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeCourse(c._id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}