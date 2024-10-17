import React from "react";
import Logo from "../../../components/Logo";
import "../style.css";
import Profile from "../../../components/Profile";

export default function Navbar() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-auto col-md-3 col-xl-2  pages-bg-design">
            <div className="pt-2 check">
              <Logo />
            </div>
          </div>
          <div className="col-6"></div>
          <div className=" col-auto col-sm-3 col-xl-4 pt-4 text-end profile-set">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
