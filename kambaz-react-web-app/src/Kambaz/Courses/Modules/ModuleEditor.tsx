import { Modal, FormControl, Button } from "react-bootstrap";

interface ModuleEditorProps {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    moduleName: string;
    setModuleName: (name: string) => void;
    addModule: () => void;
}

/**
 * ModuleEditor displays a modal dialog where users can type a new module name.
 */
export default function ModuleEditor({
                                         show,
                                         handleClose,
                                         dialogTitle,
                                         moduleName,
                                         setModuleName,
                                         addModule,
                                     }: ModuleEditorProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Input field bound to moduleName state */}
                <FormControl
                    value={moduleName}
                    placeholder="Enter module title"
                    onChange={(e) => {
                        setModuleName(e.target.value);
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                {/* Cancel button simply closes without adding */}
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                {/* Add Module: invoke addModule, then close */}
                <Button
                    variant="primary"
                    onClick={() => {
                        addModule();
                        handleClose();
                    }}
                >
                    Add Module
                </Button>
            </Modal.Footer>
        </Modal>
    );
}