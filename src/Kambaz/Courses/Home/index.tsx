import Modules from "../Modules";
import CourseStatus from "./Status";
import "./../../styles.css";

export default function Home() {
    return (
        /* two-column flex: modules + sidebar */
        <div id="wd-home" className="d-flex">
            {/* Main content: module list */}
            <div className="flex-fill me-3">
                <Modules />
            </div>

            {/* Sidebar: hidden below xl */}
            <div className="d-none d-xl-block" style={{ width: "300px" }}>
                <CourseStatus />
            </div>
        </div>
    );
}