import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Signin  from "./Signin";
import Profile from "./Profile";
import Signup  from "./Signup";

export default function Account() {
    return (
        <div id="wd-account-screen">
            <table>
                <tr>
                    <td valign="top">
                        <AccountNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route index      element={<Navigate to="Signin" replace />} />
                            <Route path="Signin"  element={<Signin />} />
                            <Route path="Profile" element={<Profile />} />
                            <Route path="Signup"  element={<Signup />} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}
