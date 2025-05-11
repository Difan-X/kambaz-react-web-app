import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <h2>Assignment Editor</h2>

            <form>
                {/* Assignment Name */}
                <div>
                    <label htmlFor="wd-name">Assignment Name</label><br />
                    <input type="text" id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="wd-description">Description</label><br />
                    <textarea id="wd-description" rows={4}>
The assignment is available online. Submit a link to the landing page of your solution.
          </textarea><br /><br />
                </div>

                {/* Points */}
                <div>
                    <label htmlFor="wd-points">Points</label><br />
                    <input type="number" id="wd-points" defaultValue={100} /><br /><br />
                </div>

                {/* Group */}
                <div>
                    <label htmlFor="wd-group">Group</label><br />
                    <select id="wd-group">
                        <option value="none">None</option>
                        <option value="group1">Group 1</option>
                        <option value="group2">Group 2</option>
                    </select><br /><br />
                </div>

                {/* Display Grade As */}
                <div>
                    <label htmlFor="wd-display-grade-as">Display Grade As</label><br />
                    <select id="wd-display-grade-as">
                        <option value="points">Points</option>
                        <option value="percent">Percentage</option>
                        <option value="letter">Letter Grade</option>
                    </select><br /><br />
                </div>

                {/* Submission Type */}
                <div>
                    <label htmlFor="wd-submission-type">Submission Type</label><br />
                    <select id="wd-submission-type">
                        <option value="text-entry">Text Entry</option>
                        <option value="website-url">Website URL</option>
                        <option value="media-recordings">Media Recordings</option>
                        <option value="student-annotation">Student Annotation</option>
                        <option value="file-upload">File Upload</option>
                    </select><br /><br />
                </div>

                {/* Text Entry */}
                <div>
                    <label htmlFor="wd-text-entry">Text Entry</label><br />
                    <textarea id="wd-text-entry" rows={3} placeholder="Type your answer here…" />
                    <br /><br />
                </div>

                {/* Website URL */}
                <div>
                    <label htmlFor="wd-website-url">Website URL</label><br />
                    <input type="url" id="wd-website-url" placeholder="https://example.com" />
                    <br /><br />
                </div>

                {/* Media Recordings */}
                <div>
                    <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                    <select id="wd-media-recordings">
                        <option value="any">Any</option>
                        <option value="audio">Audio Only</option>
                        <option value="video">Video Only</option>
                    </select><br /><br />
                </div>

                {/* Student Annotation */}
                <div>
                    <label htmlFor="wd-student-annotation">
                        <input type="checkbox" id="wd-student-annotation" /> Allow Student Annotation
                    </label><br /><br />
                </div>

                {/* File Upload */}
                <div>
                    <label htmlFor="wd-file-upload">File Upload</label><br />
                    <input type="file" id="wd-file-upload" /><br /><br />
                </div>

                {/* Assign To */}
                <div>
                    <label htmlFor="wd-assign-to">Assign To</label><br />
                    <select id="wd-assign-to">
                        <option value="everyone">Everyone</option>
                        <option value="group">Specific Group</option>
                        <option value="individual">Individual Students</option>
                    </select><br /><br />
                </div>

                {/* Dates */}
                <div>
                    <label htmlFor="wd-due-date">Due Date</label><br />
                    <input type="date" id="wd-due-date" /><br /><br />

                    <label htmlFor="wd-available-from">Available From</label><br />
                    <input type="date" id="wd-available-from" /><br /><br />

                    <label htmlFor="wd-available-until">Available Until</label><br />
                    <input type="date" id="wd-available-until" /><br /><br />
                </div>

                {/* Save / Cancel */}
                <div style={{ marginTop: 16 }}>
                    {/* 保存后回到作业列表 */}
                    <Link to="/Kambaz/Courses/1234/Assignments">
                        <button type="button" id="wd-save">Save</button>
                    </Link>
                    {/* 取消也回到作业列表 */}
                    <Link to="/Kambaz/Courses/1234/Assignments" style={{ marginLeft: 8 }}>
                        <button type="button" id="wd-cancel">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}