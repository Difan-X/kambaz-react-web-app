import { Route, Routes, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function Kambaz() {
    return (
        /* top-level flex: sidebar + main area */
        <div id="wd-kambaz" className="d-flex">
            {/* Sidebar: hidden on xs/sm, shows on md+ */}
            <div className="d-none d-md-block">
                <KambazNavigation />
            </div>

            {/* Main content: takes remaining width, offset via CSS */}
            <div className="flex-fill wd-main-content-offset p-3">
                <Routes>
                    {/* default to Account screen */}
                    <Route path="/" element={<Navigate to="Account" replace />} />
                    <Route path="Account/*" element={<Account />} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="Courses/:cid/*" element={<Courses />} />
                    <Route path="Calendar" element={<h1>Calendar</h1>} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}