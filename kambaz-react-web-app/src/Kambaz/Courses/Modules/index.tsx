export default function Modules() {
    return (
        <div id="wd-modules">
            <div id="wd-modules-controls" style={{ marginBottom: 16 }}>
                <button id="wd-collapse-all">Collapse All</button>
                <button id="wd-view-progress" style={{ marginLeft: 8 }}>View Progress</button>
                <select id="wd-publish-all" style={{ marginLeft: 8 }}>
                    <option value="publish-all">Publish All</option>
                    <option value="publish-modules-only">Publish Modules Only</option>
                    <option value="publish-all-items">Publish All Modules &amp; Items</option>
                </select>
                <button id="wd-add-module" style={{ marginLeft: 8 }}>+ Module</button>
            </div>

            <ul id="wd-modules-list">
                <li className="wd-module">
                    <strong>Week 1</strong>
                    <ul className="wd-lessons">
                        <li>LEARNING OBJECTIVES
                            <ul>
                                <li>Introduction to the course</li>
                                <li>Learn what is Web Development</li>
                            </ul>
                        </li>
                        <li>READING
                            <ul>
                                <li>Full Stack Developer – Chapter 1 – Introduction</li>
                                <li>Full Stack Developer – Chapter 2 – Creating User Interfaces</li>
                            </ul>
                        </li>
                        <li>SLIDES
                            <ul>
                                <li>Introduction to Web Development</li>
                                <li>Creating an HTTP server with Node.js</li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li className="wd-module">
                    <strong>Week 2</strong>
                    <ul className="wd-lessons">
                        <li>Lecture 1 – Advanced JavaScript</li>
                        <li>Lecture 2 – State Management</li>
                    </ul>
                </li>

            </ul>
        </div>
    );
}