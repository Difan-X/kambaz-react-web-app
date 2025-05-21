import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";

export default function KambazNavigation() {
    const base = "list-group-item text-center border-0 text-danger";
    return (
        <ListGroup
            id="wd-kambaz-navigation"
            style={{ width: 120 }}
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
        >
            {/* Northeastern logo */}
            <ListGroup.Item
                id="wd-neu-link"
                action
                href="https://www.northeastern.edu/"
                target="_blank"
                className="bg-black border-0 text-center"
            >
                <img src="/images/NEU.png" width={75} alt="NEU" />
            </ListGroup.Item>
            <br />

            {/* 以下几项用 NavLink + children fn 来拿 isActive */}
            <NavLink to="/Kambaz/Account">
                {({ isActive }: { isActive: boolean }) => (
                    <ListGroup.Item
                        id="wd-account-link"
                        action
                        className={`${base} ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <FaRegCircleUser className="fs-1 mb-1" />
                        <br />
                        Account
                    </ListGroup.Item>
                )}
            </NavLink>
            <br />

            <NavLink to="/Kambaz/Dashboard">
                {({ isActive }: { isActive: boolean }) => (
                    <ListGroup.Item
                        id="wd-dashboard-link"
                        action
                        className={`${base} ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <AiOutlineDashboard className="fs-1 mb-1" />
                        <br />
                        Dashboard
                    </ListGroup.Item>
                )}
            </NavLink>
            <br />

            <NavLink to="/Kambaz/Courses/1234">
                {({ isActive }: { isActive: boolean }) => (
                    <ListGroup.Item
                        id="wd-course-link"
                        action
                        className={`${base} ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <LiaBookSolid className="fs-1 mb-1" />
                        <br />
                        Courses
                    </ListGroup.Item>
                )}
            </NavLink>
            <br />

            <NavLink to="/Kambaz/Calendar">
                {({ isActive }: { isActive: boolean }) => (
                    <ListGroup.Item
                        id="wd-calendar-link"
                        action
                        className={`${base} ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <IoCalendarOutline className="fs-1 mb-1" />
                        <br />
                        Calendar
                    </ListGroup.Item>
                )}
            </NavLink>
            <br />

            <NavLink to="/Kambaz/Inbox">
                {({ isActive }: { isActive: boolean }) => (
                    <ListGroup.Item
                        id="wd-inbox-link"
                        action
                        className={`${base} ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <FaInbox className="fs-1 mb-1" />
                        <br />
                        Inbox
                    </ListGroup.Item>
                )}
            </NavLink>
            <br />

            <NavLink to="/Labs">
                {({ isActive }: { isActive: boolean }) => (
                    <ListGroup.Item
                        id="wd-labs-link"
                        action
                        className={`${base} ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <LiaCogSolid className="fs-1 mb-1" />
                        <br />
                        Labs
                    </ListGroup.Item>
                )}
            </NavLink>
        </ListGroup>
    );
}