import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function CourseNavigation() {
    return (
        <Nav variant="pills" className="flex-column nav-pills fs-5 wd" id="wd-courses-navigation">
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="Home"
                    end
                >
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="Modules"
                >
                    Modules
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="Piazza"
                >
                    Piazza
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="Zoom"
                >
                    Zoom
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="Assignments"
                >
                    Assignments
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="Quizzes"
                >
                    Quizzes
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="People"
                >
                    People
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}