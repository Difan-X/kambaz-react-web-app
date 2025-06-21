import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import {Users} from "./Users";
import AccountNavigation from "./Navigation";

import type {JSX} from "react";

export default function Account(): JSX.Element {
    const { currentUser } = useAppSelector((s) => s.account);
    const defaultRoute: "Profile" | "Signin" = currentUser ? "Profile" : "Signin";

    return (
        <div id="wd-account-screen" className="d-flex">
            <div className="d-none d-md-block me-3">
                <AccountNavigation />
            </div>
            <div className="flex-fill p-3">
                <Routes>
                    <Route path="/" element={<Navigate to={defaultRoute} replace />} />
                    <Route path="Signin" element={<Signin />} />
                    <Route path="Signup" element={<Signup />} />
                    {/* Profile is accessible to all logged-in users */}
                    {currentUser && (
                        <Route path="Profile" element={<Profile />} />
                    )}
                    {/* Users management is only for ADMIN */}
                    {currentUser?.role === "ADMIN" && (
                        <>
                            <Route path="Users" element={<Users />} />
                            <Route path="Users/:uid" element={<Users />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
}