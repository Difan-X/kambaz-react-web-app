import { useParams, Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    Form,
    Button,
} from "react-bootstrap";
import * as db from "../../Database";

interface Assignment {
    _id: string;
    courseId: string;
    title: string;
    module: string;
    notAvailable: string;
    due: string;
    pts: number;
    // add any other fields you need, e.g. description
    description?: string;
}

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();

    // find this assignment in the data
    const assignment = (db.assignments as Assignment[]).find(
        (a) => a._id === aid && a.courseId === cid
    );

    return (
        <div id="wd-assignments-editor" className="p-4">
            <h4 className="text-danger mb-3">
                {/* breadcrumb: course name > Assignments > assignment title */}
                {cid} &gt; Assignments &gt; {assignment?.title || aid}
            </h4>
            <hr />

            <Row>
                <Col xl={8}>
                    <Form>
                        <Form.Group controlId="wd-name" className="mb-4">
                            <Form.Label>Assignment Name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={assignment?.title || ""}
                                placeholder={assignment?.title || ""}
                            />
                        </Form.Group>

                        <Form.Group controlId="wd-description" className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                defaultValue={
                                    assignment?.description ||
                                    "The assignment is available online.\nSubmit your link here."
                                }
                            />
                        </Form.Group>
                    </Form>
                </Col>

                <Col xl={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            {/* Points */}
                            <Form.Group controlId="wd-points" className="mb-3">
                                <Form.Label>Points</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={assignment?.pts ?? 100}
                                />
                            </Form.Group>

                            {/* Assignment Group */}
                            <Form.Group controlId="wd-group" className="mb-3">
                                <Form.Label>Assignment Group</Form.Label>
                                <Form.Select defaultValue="ASSIGNMENTS">
                                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                    <option value="QUIZZES">QUIZZES</option>
                                    <option value="EXAMS">EXAMS</option>
                                    <option value="PROJECT">PROJECT</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Display Grade As */}
                            <Form.Group controlId="wd-display-grade-as" className="mb-3">
                                <Form.Label>Display Grade as</Form.Label>
                                <Form.Select defaultValue="Percentage">
                                    <option>Percentage</option>
                                    <option>Points</option>
                                    <option>Letter Grade</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Submission Type */}
                            <Form.Group controlId="wd-submission-type" className="mb-3">
                                <Form.Label>Submission Type</Form.Label>
                                <Form.Select defaultValue="Online">
                                    <option>Online</option>
                                    <option>On Paper</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Online Entry Options */}
                            <Form.Group className="mb-3">
                                <Form.Label>Online Entry Options</Form.Label>
                                <div>
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-text-entry"
                                        label="Text Entry"
                                        defaultChecked
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-website-url"
                                        label="Website URL"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-media-recordings"
                                        label="Media Recordings"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-student-annotation"
                                        label="Student Annotation"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-file-upload"
                                        label="File Uploads"
                                    />
                                </div>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            {/* Assign To */}
                            <Form.Group controlId="wd-assign-to" className="mb-3">
                                <Form.Label>Assign To</Form.Label>
                                <Form.Control type="text" defaultValue="Everyone" />
                            </Form.Group>

                            {/* Due Date */}
                            <Form.Group controlId="wd-due-date" className="mb-3">
                                <Form.Label>Due</Form.Label>
                                <Form.Control
                                    type="date"
                                    defaultValue={assignment?.due
                                        .split(" at")[0] /* e.g. "2023-05-13" */}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    {/* Available From */}
                                    <Form.Group controlId="wd-available-from" className="mb-3">
                                        <Form.Label>Available from</Form.Label>
                                        <Form.Control
                                            type="date"
                                            defaultValue={assignment?.notAvailable
                                                .split(" at")[0]}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    {/* Available Until */}
                                    <Form.Group controlId="wd-available-until" className="mb-3">
                                        <Form.Label>Until</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
                <Link to="../">
                    <Button variant="light" className="me-2">
                        Cancel
                    </Button>
                </Link>
                <Link to="../">
                    <Button variant="danger">Save</Button>
                </Link>
            </div>
        </div>
    );
}
