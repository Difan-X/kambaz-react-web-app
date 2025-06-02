import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    FormControl,
    Button,
    Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
    type Assignment,
    addAssignment,
    updateAssignment,
} from "./assignmentsReducer";

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. Grab the assignments array from Redux
    const allAssignments: Assignment[] = useSelector(
        (state: RootState) => state.assignmentsReducer.assignments
    );

    // 2. If this is “edit” mode (aid !== "new"), attempts to find that assignment:
    const existing = allAssignments.find((a) => a._id === aid);

    // 3. Local form state that will hold all assignment fields:
    const [formState, setFormState] = useState<Partial<Assignment>>({
        // default for “new” mode:
        _id: "new",         // sentinel to indicate “create new”
        courseId: cid || "",
        title: "",
        module: "",
        notAvailable: "",
        due: "",
        pts: 100,
        description: "",
    });

    // 4. On mount, if `aid !== "new"` and we found an existing assignment, load it into formState.
    useEffect(() => {
        if (aid && aid !== "new") {
            if (!existing) {
                // If no assignment with that ID was found, just redirect back to the list:
                navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true });
            } else {
                // Copy the big assignment object into formState
                setFormState({ ...existing });
            }
        }
        // If aid === "new", we keep our default formState for a brand‐new record.
    }, [aid, existing, navigate, cid]);

    // 5. If for some reason the formState is still missing, we can fallback to an empty screen:
    if (!formState) {
        return null;
    }

    // 6. Handler for “Save”
    const onSave = () => {
        // Gather a full Assignment object. Since formState might be Partial<Assignment>,
        // we “type‐cast” it to Assignment (we know all fields are present).
        const assignmentToSave = formState as Assignment;

        if (aid === "new") {
            // CREATE NEW
            dispatch(addAssignment(assignmentToSave));
        } else {
            // UPDATE EXISTING
            dispatch(updateAssignment(assignmentToSave));
        }

        // Then navigate back to the assignments list:
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    // 7. Handler for “Cancel” just navigates back without touching Redux
    const onCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-4">
            <h4 className="text-danger mb-3">
                {cid} &gt; Assignments &gt;{" "}
                {aid === "new" ? "New Assignment" : formState.title}
            </h4>
            <hr />

            <Row>
                <Col xl={8}>
                    {/* NAME + DESCRIPTION */}
                    <Form>
                        <Form.Group controlId="wd-name" className="mb-4">
                            <Form.Label>Assignment Name</Form.Label>
                            <FormControl
                                type="text"
                                value={formState.title || ""}
                                placeholder="New Assignment"
                                onChange={(e) =>
                                    setFormState({ ...formState, title: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="wd-description" className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={6}
                                value={formState.description || ""}
                                placeholder="New Assignment Description"
                                onChange={(e) =>
                                    setFormState({ ...formState, description: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Col>

                <Col xl={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            {/* POINTS */}
                            <Form.Group controlId="wd-points" className="mb-3">
                                <Form.Label>Points</Form.Label>
                                <FormControl
                                    type="number"
                                    value={formState.pts !== undefined ? formState.pts : 100}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            pts: parseInt(e.target.value, 10) || 0,
                                        })
                                    }
                                />
                            </Form.Group>

                            {/* MODULE (for simplicity, free‐text) */}
                            <Form.Group controlId="wd-module" className="mb-3">
                                <Form.Label>Module</Form.Label>
                                <FormControl
                                    type="text"
                                    value={formState.module || ""}
                                    placeholder="e.g. Week 1: Basics"
                                    onChange={(e) =>
                                        setFormState({ ...formState, module: e.target.value })
                                    }
                                />
                            </Form.Group>

                            {/* DUE DATE */}
                            <Form.Group controlId="wd-due-date" className="mb-3">
                                <Form.Label>Due</Form.Label>
                                <FormControl
                                    type="date"
                                    value={(formState.due || "").split(" at")[0]}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            // We convert the date to e.g. "YYYY-MM-DD at 11:59pm"
                                            due: e.target.value + " at 11:59pm",
                                        })
                                    }
                                />
                            </Form.Group>

                            {/* NOT AVAILABLE UNTIL */}
                            <Form.Group controlId="wd-not-available" className="mb-3">
                                <Form.Label>Not available until</Form.Label>
                                <FormControl
                                    type="date"
                                    value={(formState.notAvailable || "").split(" at")[0]}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            notAvailable: e.target.value + " at 12:00am",
                                        })
                                    }
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
                <Button
                    variant="light"
                    className="me-2"
                    onClick={onCancel}
                    id="wd-cancel-assignment-btn"
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onSave}
                    id="wd-save-assignment-btn"
                >
                    Save
                </Button>
            </div>
        </div>
    );
}