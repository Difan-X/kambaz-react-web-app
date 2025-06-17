import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import {Users} from "./Users";

import AccountNavigation from "./Navigation";
import type { RootState } from "../store";
import type {JSX} from "react";

export default function Account(): JSX.Element {
    const { currentUser } = useSelector((s: RootState) => s.accountReducer);
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
                    {currentUser?.role === "ADMIN" && (
                        <>
                            <Route path="Profile" element={<Profile />} />
                            <Route path="Users" element={<Users />} />
                            <Route path="Users/:uid" element={<Users />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
}