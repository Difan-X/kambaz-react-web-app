import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaFileDownload } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdNotifications } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" className="p-3 bg-white shadow-sm">
            <h2>Course Status</h2>

            {/* Publish controls */}
            <div className="d-flex mb-3">
                <div className="w-50 pe-1">
                    <Button
                        id="wd-unpublish-btn"
                        variant="secondary"
                        size="lg"
                        className="w-100 text-nowrap"
                    >
                        <MdDoNotDisturbAlt className="me-2 fs-5" />
                        Unpublish
                    </Button>
                </div>
                <div className="w-50">
                    <Button
                        id="wd-publish-btn"
                        variant="success"
                        size="lg"
                        className="w-100"
                    >
                        <FaCheckCircle className="me-2 fs-5" />
                        Publish
                    </Button>
                </div>
            </div>

            {/* Import buttons */}
            <Button
                id="wd-import-existing-btn"
                variant="secondary"
                size="lg"
                className="w-100 mb-2 text-start"
            >
                <BiImport className="me-2 fs-5" />
                Import Existing Content
            </Button>
            <Button
                id="wd-import-commons-btn"
                variant="secondary"
                size="lg"
                className="w-100 mb-2 text-start"
            >
                <LiaFileImportSolid className="me-2 fs-5" />
                Import from Commons
            </Button>

            {/* Export and settings */}
            <Button
                id="wd-export-btn"
                variant="secondary"
                size="lg"
                className="w-100 mb-2 text-start"
            >
                <FaFileDownload className="me-2 fs-5" />
                Export Course Content
            </Button>
            <Button
                id="wd-settings-btn"
                variant="secondary"
                size="lg"
                className="w-100 mb-2 text-start"
            >
                <FiSettings className="me-2 fs-5" />
                Course Settings
            </Button>

            {/* Notifications link */}
            <Button
                id="wd-notifications-btn"
                variant="link"
                size="lg"
                className="w-100 text-start"
            >
                <IoMdNotifications className="me-2 fs-5" />
                View Course Notifications
            </Button>
        </div>
    );
}