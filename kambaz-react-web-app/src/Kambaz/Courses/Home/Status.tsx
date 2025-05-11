export default function CourseStatus() {
    return (
        <div id="wd-course-status" className="p-3 bg-white shadow-sm">
            <h2>Course Status</h2>
            <div className="mb-3">
                <button className="btn btn-outline-danger me-2">Unpublish</button>
                <button className="btn btn-danger">Publish</button>
            </div>
            {/* Course Details */}
            <p><strong>Visibility:</strong> Published</p>
            <p><strong>Enrolled Students:</strong> 42</p>
            <p><strong>Start Date:</strong> 2025-01-15</p>
            <button className="btn btn-link p-0">View Course Notifications</button>
        </div>
    );
}