import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";


type Role = "STUDENT" | "FACULTY" | "ADMIN" | "USER";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: Role[];
    role?: Role;
}
export default function ProtectedRoute({
                                           children,
                                           role,
                                           roles,
                                       }: ProtectedRouteProps) {
    const currentUser = useSelector((s: RootState) => s.account.currentUser);
    const location = useLocation();

    if (!currentUser) {
        return (
            <Navigate
                to="/Kambaz/Account/Signin"
                state={{ from: location }}
                replace
            />
        );
    }

    if (roles && !roles.includes(currentUser.role)) {
        return <Navigate to="/Kambaz/Dashboard" replace />;
    }
    if (role && currentUser.role !== role) {
        return <Navigate to="/Kambaz/Dashboard" replace />;
    }

    return <>{children}</>;
}