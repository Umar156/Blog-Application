import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./style.css";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="container-fluid ">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 pages-bg-design">
              <div className="row side-users">
                {/* <div className="col-2"></div> */}
                <div className="col-12 main-sidebar-design ">
                  <Sidebar />
                </div>
              </div>
            </div>
            <div className="col-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
