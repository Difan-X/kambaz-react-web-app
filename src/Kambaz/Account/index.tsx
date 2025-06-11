import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import SignUp from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import type { RootState } from "../store";

export default function Account() {
    // 1. Read currentUser from Redux
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // 2. Decide default target: if signed in → Profile, else → Signin
    const defaultRoute = currentUser ? "Profile" : "Signin";

    return (
        <div id="wd-account-screen" className="d-flex">
            {/* Sidebar navigation */}
            <div className="d-none d-md-block">
                <AccountNavigation />
            </div>

            {/* Main content */}
            <div className="flex-fill p-3">
                <Routes>
                    {/* Default path for /Kambaz/Account */}
                    <Route
                        path="/"
                        element={<Navigate to={defaultRoute} replace />}
                    />

                    {/* Signin and Signup always allowed */}
                    <Route path="Signin" element={<Signin />} />
                    <Route path="Signup" element={<SignUp />} />

                    {/* Profile only allowed if signed in (you can also wrap this in a ProtectedRoute if desired) */}
                    <Route path="Profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}