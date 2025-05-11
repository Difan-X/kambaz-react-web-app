import { Link } from "react-router-dom";

interface Course {
    cid: string;
    code: string;
    title: string;
}

export default function Dashboard() {
    const courses: Course[] = [
        { cid: "5400", code: "CS 5400", title: "Principles of Programming Language" },
        { cid: "5500", code: "CS 5500", title: "Foundations of Software Engineering" },
        { cid: "5520", code: "CS 5520", title: "Mobile Application Development" },
        { cid: "5600", code: "CS 5600", title: "Computer Systems" },
        { cid: "5610", code: "CS 5610", title: "Web Development" },
        { cid: "5700", code: "CS 5700", title: "Fundamentals of Computer Networking" },
        { cid: "5850", code: "CS 5850", title: "Building Game Engines" },
    ];

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div
                id="wd-dashboard-courses"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "flex-start",
                }}
            >
                {courses.map((course) => (
                    <div
                        key={course.cid}
                        className="wd-dashboard-course"
                        style={{
                            width: "220px",
                            background: "#f8f9fa",
                            border: "1px solid #dee2e6",
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                        }}
                    >
                        <Link
                            to={`/Kambaz/Courses/${course.cid}/Home`}
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                            <div>
                                <h5 className="mt-2 mb-1">{course.code}</h5>
                                <p className="wd-dashboard-course-title mb-2" style={{ fontSize: "0.9rem" }}>
                                    {course.title}
                                </p>
                                <button className="btn btn-primary btn-sm">Go</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}