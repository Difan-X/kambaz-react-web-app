import { Form, Row, Col, Button } from "react-bootstrap";

export default function BootstrapResponsiveForms() {
    return (
        <>
            {/* ---------- Responsive Form Example 1 ---------- */}
            <div id="wd-css-responsive-forms-1" className="mb-5">
                <h3>Responsive forms (Example 1)</h3>
                <Form.Group as={Row} className="mb-3" controlId="email1">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" defaultValue="email@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password1">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="textarea2">
                    <Form.Label column sm={2}>
                        Bio
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" style={{ height: 100 }} />
                    </Col>
                </Form.Group>
            </div>

            {/* ---------- Responsive Form Example 2 ---------- */}
            <div id="wd-css-responsive-forms-2" className="mb-5">
                <h3>Responsive forms (Example 2)</h3>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="email2">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="password2">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Radios
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="First radio"
                                    name="formHorizontalRadios"
                                    defaultChecked
                                />
                                <Form.Check
                                    type="radio"
                                    label="Second radio"
                                    name="formHorizontalRadios"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Third radio"
                                    name="formHorizontalRadios"
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}