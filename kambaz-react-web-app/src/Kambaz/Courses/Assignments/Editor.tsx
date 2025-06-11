import { Link, useParams } from "react-router-dom";

export default function AssignmentEditor() {
    const { aid } = useParams();

    return (
        <div id="wd-assignments-editor">
            {/* Header */}
            <h2>Edit Assignment</h2>

            {/* Assignment Name */}
            <label htmlFor="wd-name">Assignment Name</label>
            <input
                id="wd-name"
                type="text"
                defaultValue={`A${aid} – Example Title`}
            />
            <br />
            <br />

            {/* Description */}
            <label htmlFor="wd-description">Description</label>
            <textarea
                id="wd-description"
                rows={4}
                defaultValue="The assignment is available online. Submit a link to your repo."
            />
            <br />
            <br />

            <table>
                {/* Points */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" type="number" defaultValue={100} />
                    </td>
                </tr>
                {/* Group */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group" defaultValue="assignments">
                            <option value="assignments">Assignments</option>
                            <option value="quizzes">Quizzes</option>
                            <option value="exams">Exams</option>
                            <option value="projects">Project</option>
                        </select>
                    </td>
                </tr>
                {/* Display Grade As */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade As</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as" defaultValue="percentage">
                            <option value="percentage">Percentage</option>
                            <option value="points">Points</option>
                            <option value="letter">Letter Grade</option>
                        </select>
                    </td>
                </tr>
                {/* Submission Type */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type" defaultValue="online">
                            <option value="online">Online</option>
                            <option value="onpaper">On Paper</option>
                        </select>
                    </td>
                </tr>
                {/* Online Entry Options */}
                <tr>
                    <td align="right" valign="top">
                        <label>Online Entry Options</label>
                    </td>
                    <td>
                        <input type="checkbox" id="wd-text-entry" defaultChecked />{" "}
                        <label htmlFor="wd-text-entry">Text Entry</label>
                        <br />
                        <input type="checkbox" id="wd-website-url" />{" "}
                        <label htmlFor="wd-website-url">Website URL</label>
                        <br />
                        <input type="checkbox" id="wd-media-recordings" />{" "}
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                        <br />
                        <input type="checkbox" id="wd-student-annotation" />{" "}
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                        <br />
                        <input type="checkbox" id="wd-file-upload" />{" "}
                        <label htmlFor="wd-file-upload">File Upload</label>
                    </td>
                </tr>
                {/* Assign To */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign To</label>
                    </td>
                    <td>
                        <input
                            id="wd-assign-to"
                            type="text"
                            defaultValue="Everyone"
                        />
                    </td>
                </tr>
                {/* Due Date */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Due Date</label>
                    </td>
                    <td>
                        <input
                            id="wd-due-date"
                            type="date"
                            defaultValue="2025-05-15"
                        />
                    </td>
                </tr>
                {/* Available From */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-available-from">Available From</label>
                    </td>
                    <td>
                        <input
                            id="wd-available-from"
                            type="date"
                            defaultValue="2025-05-01"
                        />
                    </td>
                </tr>
                {/* Available Until */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-available-until">Available Until</label>
                    </td>
                    <td>
                        <input
                            id="wd-available-until"
                            type="date"
                            defaultValue="2025-05-30"
                        />
                    </td>
                </tr>
            </table>

            <br />

            {/* Save and Cancel Buttons */}
            <Link to="../" id="wd-save-assignment">
                <button>Save</button>
            </Link>{" "}
            <Link to="../" id="wd-cancel-assignment">
                <button>Cancel</button>
            </Link>
        </div>
    );
}
