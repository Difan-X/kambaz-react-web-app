import { Link } from "react-router-dom";

export default function TOC() {
    return (
        <ul id="wd-toc">
            <li>
                <Link to="/Labs" id="wd-labs-link">
                    Labs
                </Link>
            </li>
            <li>
                <Link to="/Labs/Lab1" id="wd-lab1-link">
                    Lab 1
                </Link>
            </li>
            <li>
                <Link to="/Labs/Lab2" id="wd-lab2-link">
                    Lab 2
                </Link>
            </li>
            <li>
                <Link to="/Labs/Lab3" id="wd-lab3-link">
                    Lab 3
                </Link>
            </li>
            <li>
                <Link to="/Kambaz" id="wd-kambaz-link">
                    Kambaz
                </Link>
            </li>
            <li>
                <a
                    id="wd-github"
                    href="https://github.com/Difan-X/kambaz-react-web-app"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub Repo
                </a>
            </li>
            <li id="wd-fullname">Difan Xie</li>
        </ul>
    );
}