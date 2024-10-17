import React, { useState } from "react";
import profile from "./images/Profile.png";
import { Link } from "react-router-dom";

export default function Profile() {
  const [openProfile, setOpenProfile] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("JsonToken") ? true : false
  );
  const handleLogout = () => {
    localStorage.removeItem("JsonToken");
    setLoggedIn(false);
  };
  return (
    <div>
      <img
        src={profile}
        alt="Profile pic"
        className="profile-pic-design "
        onClick={() => setOpenProfile((prev) => !prev)}
      />
      {openProfile && (
        <ul className="dropdown-list-user">
          {isLoggedIn ? (
            <Link to="/" onClick={handleLogout} className="auth-link ">
              <li className="list-bg-design">Logout</li>
            </Link>
          ) : (
            <>
              <Link to="login" className="auth-link">
                <li className="dropdown-i-design list-bg-design">Sign In</li>
              </Link>
              <Link to="signup" className="auth-link">
                <li className="list-bg-design">Sign Up</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
