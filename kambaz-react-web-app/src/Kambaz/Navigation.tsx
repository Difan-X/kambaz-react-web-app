import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";

export default function KambazNavigation() {
    const { pathname } = useLocation();

    const links = [
        {
            label: "Account",
            path: "/Kambaz/Account",
            match: (p: string) => p.includes("/Account"),
            icon: FaRegCircleUser,
        },
        {
            label: "Dashboard",
            path: "/Kambaz/Dashboard",
            match: (p: string) => p.includes("/Dashboard"),
            icon: AiOutlineDashboard,
        },
        {
            label: "Courses",
            // Navigate to first course home by default
            path: "/Kambaz/Courses/5400/Home",
            match: (p: string) => p.includes("/Courses/"),
            icon: LiaBookSolid,
        },
        {
            label: "Calendar",
            path: "/Kambaz/Calendar",
            match: (p: string) => p.includes("/Calendar"),
            icon: IoCalendarOutline,
        },
        {
            label: "Inbox",
            path: "/Kambaz/Inbox",
            match: (p: string) => p.includes("/Inbox"),
            icon: FaInbox,
        },
        {
            label: "Labs",
            path: "/Labs",
            match: (p: string) => p.startsWith("/Labs"),
            icon: LiaCogSolid,
        },
    ];

    return (
        <ListGroup
            id="wd-kambaz-navigation"
            className="rounded-0 position-fixed top-0 bottom-0 d-none d-md-block bg-black z-2"
            style={{ width: 120 }}
        >
            {/* Northeastern logo */}
            <ListGroup.Item
                id="wd-neu-link"
                action
                href="https://www.northeastern.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border-0 text-center"
            >
                <img src="/images/NEU.png" width={75} alt="NEU Logo" />
            </ListGroup.Item>

            {/* Dynamic navigation items */}
            {links.map(({ label, path, match, icon: Icon }) => {
                const isActive = match(pathname);
                return (
                    <ListGroup.Item
                        key={label}
                        action
                        as={Link}
                        to={path}
                        className={
                            `text-center border-0 ${
                                isActive ? "bg-white text-danger" : "bg-black text-white"
                            }`
                        }
                    >
                        {/* Icon remains red always */}
                        <Icon className="fs-1 mb-1 text-danger" />
                        <br />
                        <span className={isActive ? "text-danger" : "text-danger"}>
              {label}
            </span>
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}
