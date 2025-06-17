import type {ReactNode} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { currentUser } = useSelector((s: RootState) => s.accountReducer);
    const location = useLocation();

    if (!currentUser) {
        // redirect to signin, preserving where they were going
        return <Navigate to="/Kambaz/Account/Signin" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}