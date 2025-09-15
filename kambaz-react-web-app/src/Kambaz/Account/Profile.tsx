import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Button, Card } from "react-bootstrap";
import type { RootState } from "../store";
import { setCurrentUser, type User } from "./reducer";

export default function Profile() {
    // 1. Local state for the profile form (partial User, because we fill it in on useEffect)
    const [profile, setProfile] = useState<Partial<User>>({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Select currentUser from Redux, now strongly typed via RootState
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

    // 3. On mount (or when currentUser changes), redirect if not signed in; otherwise load profile
    useEffect(() => {
        if (!currentUser) {
            // not signed in → send to Signin
            navigate("/Kambaz/Account/Signin", { replace: true });
        } else {
            // signed in → copy user object into local profile state
            setProfile({ ...currentUser });
        }
    }, [currentUser, navigate]);

    // 4. Sign out handler: set Redux to null and navigate to Signin
    const signout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin", { replace: true });
    };

    // 5. If currentUser is null, we return null here because the useEffect will already have redirected.
    if (!currentUser) {
        return null;
    }

    return (
        <Card id="wd-profile-screen" className="p-4 shadow-sm">
            <Card.Body>
                <Card.Title>Your Profile</Card.Title>

                {/* Only render form once we have “profile” data (which is either {} or a real User copy) */}
                {profile && (
                    <>
                        {/* Username */}
                        <FormControl
                            type="text"
                            placeholder="Username"
                            value={profile.username || ""}
                            className="mb-2"
                            id="wd-username"
                            onChange={(e) =>
                                setProfile({ ...profile, username: e.target.value })
                            }
                        />

                        {/* Password */}
                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={profile.password || ""}
                            className="mb-2"
                            id="wd-password"
                            onChange={(e) =>
                                setProfile({ ...profile, password: e.target.value })
                            }
                        />

                        {/* First Name */}
                        <FormControl
                            type="text"
                            placeholder="First Name"
                            value={profile.firstName || ""}
                            className="mb-2"
                            id="wd-firstname"
                            onChange={(e) =>
                                setProfile({ ...profile, firstName: e.target.value })
                            }
                        />

                        {/* Last Name */}
                        <FormControl
                            type="text"
                            placeholder="Last Name"
                            value={profile.lastName || ""}
                            className="mb-2"
                            id="wd-lastname"
                            onChange={(e) =>
                                setProfile({ ...profile, lastName: e.target.value })
                            }
                        />

                        {/* Date of Birth */}
                        <FormControl
                            type="date"
                            placeholder="Date of Birth"
                            value={profile.dob || ""}
                            className="mb-2"
                            id="wd-dob"
                            onChange={(e) =>
                                setProfile({ ...profile, dob: e.target.value })
                            }
                        />

                        {/* Email */}
                        <FormControl
                            type="email"
                            placeholder="Email"
                            value={profile.email || ""}
                            className="mb-2"
                            id="wd-email"
                            onChange={(e) =>
                                setProfile({ ...profile, email: e.target.value })
                            }
                        />

                        {/* Role */}
                        <FormControl
                            as="select"
                            value={profile.role || "STUDENT"}
                            className="mb-2"
                            id="wd-role"
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    role: e.target.value as User["role"],
                                })
                            }
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </FormControl>

                        {/* Sign Out */}
                        <Button
                            onClick={signout}
                            variant="outline-secondary"
                            className="w-100 mb-2"
                            id="wd-signout-btn"
                        >
                            Sign out
                        </Button>

                        {/* Save Changes (for demonstration; you could dispatch an update action here) */}
                        <Button variant="primary" className="w-100" id="wd-save-profile-btn">
                            Save Changes
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}