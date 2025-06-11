import { Link } from "react-router-dom";

export default function Signin() {
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            {/* username with a default */}
            <input
                type="text"
                id="wd-text-fields-username"
                defaultValue="alice"
                className="wd-username"
            /><br/>
            {/* password with a default */}
            <input
                type="password"
                id="wd-text-fields-password"
                defaultValue="password123"
                className="wd-password"
            /><br/>
            <Link id="wd-signin-btn" to="/Kambaz/Dashboard">
                Sign in
            </Link><br/>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
                Sign up
            </Link>
        </div>
    );
}