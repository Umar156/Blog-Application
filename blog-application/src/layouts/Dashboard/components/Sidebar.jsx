import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start pt-2  min-vh-100 ">
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start bg-design"
        id="menu"
      >
        <li className="nav-item ">
          <NavLink
            to="users"
            className="nav-link  px-0 "
            activeClassName="selected"
          >
            <span className=" sidebar-icon-user admin-page-users sidebar-page-design ">
              Users
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="admins"
            className="nav-link px-0"
            activeClassName="active-link"
          >
            <span className=" sidebar-icon-bg admin-page-users sidebar-page-design">
              Admins
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="articles"
            className="nav-link px-0 "
            activeClassName="active-link"
          >
            <span className=" sidebar-icon-bg admin-page-users sidebar-page-design">
              Articles
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}


