import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input
                type="text"
                id="wd-signup-username"
                defaultValue="newuser"
                className="wd-username"
            /><br/>
            <input
                type="password"
                id="wd-signup-password"
                defaultValue="xyz123!"
                className="wd-password"
            /><br/>
            <input
                type="password"
                id="wd-signup-password-verify"
                defaultValue="xyz123!"
                className="wd-password-verify"
            /><br/>
            <Link to="/Kambaz/Account/Profile">Sign up</Link><br/>
            <Link to="/Kambaz/Account/Signin">Sign in</Link>
        </div>
    );
}