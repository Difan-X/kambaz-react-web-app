import { useParams, Link } from "react-router-dom";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    Button,
    Badge,
    Dropdown,
    ListGroup,
} from "react-bootstrap";
import {
    FaPlus,
    FaEllipsisV,
    FaCheckCircle,
    FaGripVertical,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import * as db from "../../Database";

interface Assignment {
    _id: string;
    courseId: string;
    title: string;
    module: string;
    notAvailable: string;
    due: string;
    pts: number;
}

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    // pick up only the assignments whose courseId matches the URL param
    const assignments = (db.assignments as Assignment[]).filter(
        (a) => a.courseId === cid
    );

    return (
        <div id="wd-assignments-screen" className="p-3">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <h4 className="mb-0 text-danger">Assignments</h4>
                </Col>
                <Col className="d-flex justify-content-center">
                    <InputGroup className="wd-search" style={{ maxWidth: 300 }}>
                        <InputGroup.Text>
                            <i className="bi bi-search" />
                        </InputGroup.Text>
                        <FormControl placeholder="Search…" />
                    </InputGroup>
                </Col>
                <Col xs="auto" className="d-flex justify-content-end">
                    <Button variant="light" className="me-2">
                        <FaPlus /> Group
                    </Button>
                    <Button variant="danger">
                        <FaPlus /> Assignment
                    </Button>
                </Col>
            </Row>

            <div className="d-flex align-items-center bg-light border px-3 py-2 mb-2">
                <FaGripVertical className="me-2 text-secondary" />
                <MdKeyboardArrowDown className="me-2" />
                <h5 className="mb-0 flex-grow-1">ASSIGNMENTS</h5>
                <Badge bg="secondary" className="me-2">
                    40% of Total
                </Badge>
                <Button variant="link" className="p-0 me-2 text-dark">
                    <FaPlus />
                </Button>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="p-0 text-dark">
                        <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Edit Group</Dropdown.Item>
                        <Dropdown.Item>Delete Group</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <ListGroup>
                {assignments.map((a) => (
                    <ListGroup.Item
                        key={a._id}
                        className="d-flex align-items-center border-start border-success py-3"
                    >
                        <FaGripVertical className="me-3 text-muted" />
                        <i className="bi bi-file-earmark-text me-2 text-success" />
                        <Link
                            to={`${a._id}`}
                            className="fw-bold me-3 text-decoration-none text-dark"
                        >
                            {a.title}
                        </Link>
                        <small className="text-muted me-3">
                            <Link to={`${a._id}`} className="text-decoration-none">
                                {a.module}
                            </Link>{" "}
                            | Not available until {a.notAvailable} |
                        </small>
                        <small className="text-muted me-3">Due {a.due} |</small>
                        <small className="text-muted me-3">{a.pts} pts</small>
                        <FaCheckCircle className="text-success me-3" />
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" className="p-0 text-dark">
                                <FaEllipsisV />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}