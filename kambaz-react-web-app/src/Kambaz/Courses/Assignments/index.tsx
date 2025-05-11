import { Link } from "react-router-dom";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            {/* Search field */}
            <input
                id="wd-search-assignment"
                placeholder="Search for Assignments"
            />
            {/* Action buttons */}
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>

            {/* Dropdown: Group */}
            <select id="wd-group" defaultValue="default">
                <option value="default" disabled>
                    Select Group…
                </option>
                <option value="assignments">Assignments</option>
                <option value="quizzes">Quizzes</option>
                <option value="exams">Exams</option>
                <option value="projects">Project</option>
            </select>

            {/* Dropdown: Display Grade As */}
            <select id="wd-display-grade-as" defaultValue="percentage">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
                <option value="letter">Letter Grade</option>
            </select>

            {/* Dropdown: Submission Type */}
            <select id="wd-submission-type" defaultValue="online">
                <option value="online">Online</option>
                <option value="onpaper">On Paper</option>
            </select>

            {/* Section heading */}
            <h3 id="wd-assignments-title">
                ASSIGNMENTS <small>(40% of Total)</small>{" "}
                <button id="wd-toggle-assignments">+</button>
            </h3>

            {/* List of assignments in this group */}
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <Link
                        to="123"
                        className="wd-assignment-link"
                    >
                        A1 – ENV + HTML
                    </Link>
                </li>
                <li className="wd-assignment-list-item">
                    <Link to="124" className="wd-assignment-link">
                        A2 – CSS Layout
                    </Link>
                </li>
                <li className="wd-assignment-list-item">
                    <Link to="125" className="wd-assignment-link">
                        A3 – JavaScript Basics
                    </Link>
                </li>
            </ul>

            {/* You can similarly add QUIZZES, EXAMS, and PROJECT sections below */}
            <h3 id="wd-quizzes-title">
                QUIZZES <button id="wd-toggle-quizzes">+</button>
            </h3>
            <ul id="wd-quiz-list">
                <li className="wd-assignment-list-item">
                    <Link to="q1" className="wd-assignment-link">
                        Quiz 1 – HTML
                    </Link>
                </li>
            </ul>
            {/* … */}
        </div>
    );
}
