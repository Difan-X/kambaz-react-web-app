import { Row, Col } from "react-bootstrap";

export default function BootstrapGrids() {
    return (
        <div id="wd-bs-responsive-grids" className="my-4">
            <h1>Wide browser window shows 4 columns</h1>
            <h2>Responsive grid system</h2>

            {/* 4→2→1 columns as you shrink the window */}
            <Row className="mb-5 g-3">
                <Col xs={12} md={6} xl={3} className="bg-warning p-3 text-center">
                    <h3>Column A</h3>
                </Col>
                <Col xs={12} md={6} xl={3} className="bg-primary text-white p-3 text-center">
                    <h3>Column B</h3>
                </Col>
                <Col xs={12} md={6} xl={3} className="bg-danger text-white p-3 text-center">
                    <h3>Column C</h3>
                </Col>
                <Col xs={12} md={6} xl={3} className="bg-success text-white p-3 text-center">
                    <h3>Column D</h3>
                </Col>
            </Row>

            {/* Moderate width browser window shows 2 columns */}
            <h1>Moderate width browser window shows 2 columns</h1>
            <h2>Responsive grid system</h2>
            <Row className="mb-5 g-3">
                <Col xs={12} md={6} xl={6} className="bg-warning p-3 text-center">
                    <h3>Column A</h3>
                </Col>
                <Col xs={12} md={6} xl={6} className="bg-primary text-white p-3 text-center">
                    <h3>Column B</h3>
                </Col>
                <Col xs={12} md={6} xl={6} className="bg-danger text-white p-3 text-center">
                    <h3>Column C</h3>
                </Col>
                <Col xs={12} md={6} xl={6} className="bg-success text-white p-3 text-center">
                    <h3>Column D</h3>
                </Col>
            </Row>

            {/* Narrow width browser window shows 1 column */}
            <h1>Thin browser window shows only 1 column</h1>
            <h2>Responsive grid system</h2>
            <Row className="g-3">
                <Col xs={12} md={12} xl={12} className="bg-warning p-3 text-center">
                    <h3>Column A</h3>
                </Col>
                <Col xs={12} md={12} xl={12} className="bg-primary text-white p-3 text-center">
                    <h3>Column B</h3>
                </Col>
                <Col xs={12} md={12} xl={12} className="bg-danger text-white p-3 text-center">
                    <h3>Column C</h3>
                </Col>
                <Col xs={12} md={12} xl={12} className="bg-success text-white p-3 text-center">
                    <h3>Column D</h3>
                </Col>
            </Row>

            {/* dramatic 1–12 example */}
            <div id="wd-bs-responsive-dramatic">
                <h2>Responsive grid system</h2>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-warning">
                        <h4>1</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-primary text-white">
                        <h4>2</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-danger text-white">
                        <h4>3</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-success text-white">
                        <h4>4</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-warning">
                        <h4>5</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-primary text-white">
                        <h4>6</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-danger text-white">
                        <h4>7</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-success text-white">
                        <h4>8</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-warning">
                        <h4>9</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-primary text-white">
                        <h4>10</h4></Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                         className="bg-danger text-white">
                        <h4>11</h4></Col>
                    <Col  xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
                          className="bg-success text-white">
                        <h4>12</h4></Col>
                </Row>
            </div>

        </div>
    );
}