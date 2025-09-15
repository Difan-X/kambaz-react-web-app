import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button, Dropdown } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";

/**
 * ModulesControls renders the "+ Module" button, Publish dropdown,
 * "View Progress", and "Collapse All" buttons. It also shows ModuleEditor
 * when "Add Module" is clicked.
 */
export default function ModulesControls({
                                            moduleName,
                                            setModuleName,
                                            addModule,
                                        }: {
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
}) {
    // Local state to toggle ModuleEditor visibility
    const [show, setShow] = useState(false);

    // Hide modal
    const handleClose = () => setShow(false);

    // Show modal
    const handleShow = () => setShow(true);

    return (
        <div id="wd-modules-controls" className="text-nowrap mb-3">
            {/* + Module button */}
            <Button
                variant="danger"
                size="lg"
                className="me-2 float-end"
                id="wd-add-module-btn"
                onClick={handleShow}
            >
                <FaPlus
                    className="position-relative me-2"
                    style={{ bottom: "1px" }}
                />
                Module
            </Button>

            {/* Publish All dropdown (example options) */}
            <Dropdown className="float-end me-2">
                <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item id="wd-publish-all">Publish All</Dropdown.Item>
                    <Dropdown.Item id="wd-publish-all-modules-and-items">
                        Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-modules-only">
                        Publish modules only
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        Unpublish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-modules-only">
                        Unpublish modules only
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* View Progress button */}
            <Button
                variant="outline-secondary"
                id="wd-view-progress"
                className="me-2 float-end"
            >
                View Progress
            </Button>

            {/* Collapse All button */}
            <Button
                variant="outline-secondary"
                id="wd-collapse-all"
                className="float-end"
            >
                Collapse All
            </Button>

            {/* ModuleEditor modal dialog */}
            <ModuleEditor
                show={show}
                handleClose={handleClose}
                dialogTitle="Add Module"
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={addModule}
            />
        </div>
    );
}