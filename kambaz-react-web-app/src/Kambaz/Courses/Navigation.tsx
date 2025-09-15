import { ListGroup } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";

export default function CourseNavigation() {
    const { cid } = useParams();
    const base = `/Kambaz/Courses/${cid}`;
    const links = [
        "Home",
        "Modules",
        "Piazza",
        "Zoom",
        "Assignments",
        "Quizzes",
        "Grades",
        "People",
    ];

    return (
        <ListGroup
            id="wd-courses-navigation"
            className="fs-5 wd list-group rounded-0"
        >
            {links.map((label) => (
                <ListGroup.Item
                    key={label}
                    as={NavLink}
                    to={`${base}/${label}`}
                    end={label === "Home"}
                    className="border-0"
                >
                    {label}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
