import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    Button,
    Badge,
    Dropdown,
    ListGroup,
    Modal,
} from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
    type Assignment,
    deleteAssignment,
} from "./assignmentsReducer";
import { useState } from "react";

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. Pull all assignments from Redux
    const allAssignments: Assignment[] = useSelector(
        (state: RootState) => state.assignmentsReducer.assignments
    );

    // 2. Filter to only those for this course:
    const assignments: Assignment[] = allAssignments.filter(
        (a) => a.courseId === cid
    );

    // 3. Local state to control the “Are you sure you want to delete?” modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);

    // 4. When the user clicks “Delete” on an assignment, we store its ID and open the modal:
    const confirmDelete = (assignmentId: string) => {
        setToDeleteId(assignmentId);
        setShowDeleteModal(true);
    };

    // 5. If the user clicks “Yes, delete,” we dispatch and close the modal:
    const doDelete = () => {
        if (toDeleteId) {
            dispatch(deleteAssignment(toDeleteId));
        }
        setShowDeleteModal(false);
        setToDeleteId(null);
    };

    // 6. If “No,” we simply close the modal without dispatch:
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setToDeleteId(null);
    };

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
                    {/* + Group (not implemented fully here) */}
                    <Button variant="light" className="me-2" disabled>
                        <FaPlus /> Group
                    </Button>

                    {/* + Assignment → navigate to “new” route */}
                    <Button
                        variant="danger"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
                    >
                        <FaPlus /> Assignment
                    </Button>
                </Col>
            </Row>

            {/* This is just a static “Group” header area; you can style or remove it */}
            <div className="d-flex align-items-center bg-light border px-3 py-2 mb-2">
                <MdKeyboardArrowDown className="me-2" />
                <h5 className="mb-0 flex-grow-1">ASSIGNMENTS</h5>
                <Badge bg="secondary" className="me-2">
                    {/* Calculate total points % or some summary if you wish */}
                    {assignments.length} Assignment{assignments.length !== 1 && "s"}
                </Badge>
                <Button variant="link" className="p-0 me-2 text-dark" disabled>
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

            {/* ==== The actual list of assignments ==== */}
            <ListGroup>
                {assignments.map((a) => (
                    <ListGroup.Item
                        key={a._id}
                        className="d-flex align-items-center border-start border-success py-3"
                    >
                        <i className="bi bi-file-earmark-text me-2 text-success" />

                        {/* Assignment title navigates to its editor */}
                        <Link
                            to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                            className="fw-bold me-3 text-decoration-none text-dark"
                        >
                            {a.title}
                        </Link>

                        <small className="text-muted me-3">
                            <Link
                                to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                                className="text-decoration-none"
                            >
                                {a.module}
                            </Link>{" "}
                            |
                        </small>

                        <small className="text-muted me-3">Due {a.due} |</small>
                        <small className="text-muted me-3">{a.pts} pts</small>

                        <FaCheckCircle className="text-success me-3" />

                        {/* Dropdown for “Edit / Delete” on the far right */}
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" className="p-0 text-dark">
                                <FaEllipsisV />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() =>
                                        navigate(
                                            `/Kambaz/Courses/${cid}/Assignments/${a._id}`
                                        )
                                    }
                                >
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => confirmDelete(a._id)}>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* ===== Delete Confirmation Modal ===== */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this assignment?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={doDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}