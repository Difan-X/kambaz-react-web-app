import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function CourseNavigation() {
    const base = "/Kambaz/Courses/1234";

    return (
        <ListGroup
            id="wd-courses-navigation"
            className="wd list-group fs-5 rounded-0"
        >
            <ListGroup.Item
                as={NavLink}
                to={`${base}/Home`}
                end
                className="border-0"
            >
                Home
            </ListGroup.Item>
            <ListGroup.Item
                as={NavLink}
                to={`${base}/Modules`}
                className="border-0"
            >
                Modules
            </ListGroup.Item>
            <ListGroup.Item
                as={NavLink}
                to={`${base}/Piazza`}
                className="border-0"
            >
                Piazza
            </ListGroup.Item>
            <ListGroup.Item
                as={NavLink}
                to={`${base}/Zoom`}
                className="border-0"
            >
                Zoom
            </ListGroup.Item>
            <ListGroup.Item
                as={NavLink}
                to={`${base}/Assignments`}
                className="border-0"
            >
                Assignments
            </ListGroup.Item>
            <ListGroup.Item
                as={NavLink}
                to={`${base}/Quizzes`}
                className="border-0"
            >
                Quizzes
            </ListGroup.Item>
            <ListGroup.Item
                as={NavLink}
                to={`${base}/People`}
                className="border-0"
            >
                People
            </ListGroup.Item>
        </ListGroup>
    );
}