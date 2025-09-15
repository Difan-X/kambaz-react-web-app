import { Link } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";

interface Course {
    _id: string;
    name: string;
    description: string;
    image?: string;
}

export default function CourseCard({
                                       c,
                                       onEdit,
                                       onDelete,
                                   }: {
    c: Course;
    onEdit: (course: Course) => void;
    onDelete: (courseId: string) => void;
}) {
    return (
        <Col xs="auto">
            {/*
        Each Card is a flex column so that the footer stays at the bottom
        even if the description is short.
      */}
            <Card style={{ width: 300 }} className="h-100 shadow-sm d-flex flex-column">
                {/*
          1. Card image at the top. If no image is provided, use a default.
        */}
                <Card.Img
                    variant="top"
                    src={c.image || "/images/reactjs.jpg"}
                    style={{ height: 140, objectFit: "cover" }}
                />

                {/*
          2. Card body holds the course title and description, and flex-grows
             to fill available vertical space between image and footer.
        */}
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
                </Card.Body>

                {/*
          3. Card footer contains all three buttons (“Go”, “Edit”, “Delete”),
             arranged horizontally and spaced evenly.
        */}
                <Card.Footer className="bg-white border-0 py-2">
                    <div className="d-flex justify-content-around">
                        {/*
              “Go” button: wraps in a <Link> so it navigates to the course screen.
              Only this button should trigger navigation.
            */}
                        <Link to={`/Kambaz/Courses/${c._id}/Home`}>
                            <Button variant="primary" size="sm" id="wd-go-course-click">
                                Go
                            </Button>
                        </Link>

                        {/*
              “Edit” button: prevent link navigation, then call onEdit callback.
              This copies the selected course into the form above.
            */}
                        <Button
                            variant="warning"
                            size="sm"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                                e.preventDefault();
                                onEdit(c);
                            }}
                        >
                            Edit
                        </Button>

                        {/*
              “Delete” button: prevent link navigation, then call onDelete callback.
              This removes the course from state.
            */}
                        <Button
                            variant="danger"
                            size="sm"
                            id="wd-delete-course-click"
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete(c._id);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    );
}