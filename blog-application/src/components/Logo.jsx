import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/Blog.jpeg";

export default function Navbar() {
  return (
    <div>
      <h3 className="home-logo">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="logo-pic-design" />
        </Link>
        <Link to="/" className="logo-link">
          Blog App
        </Link>
      </h3>
    </div>
  );
}
