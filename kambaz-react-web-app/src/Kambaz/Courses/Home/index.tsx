import "./styles.css";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
    return (
        <div id="wd-home" className="d-flex">
            {/* Main content area: Modules */}
            <div className="flex-fill p-3">
                <Modules />
            </div>

            {/* Sidebar: Course Status (hidden on smaller screens) */}
            <div className="d-none d-xl-block" style={{ width: "300px", padding: "1rem" }}>
                <CourseStatus />
            </div>
        </div>
    );
}