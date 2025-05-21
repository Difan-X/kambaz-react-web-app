import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
    return (
        <div id="wd-account-screen" className="d-flex">
            <div className="d-none d-md-block">
                <AccountNavigation />
            </div>
            <div className="flex-fill p-3">
                <Routes>
                    <Route index element={<Navigate to="Signin" replace />} />
                    <Route path="Signin" element={<Signin />} />
                    <Route path="Signup" element={<Signup />} />
                    <Route path="Profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}