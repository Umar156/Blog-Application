import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Blog from "./components/Blog";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Index from "./layouts/Dashboard/Index";
import Admin from "./pages/Dashboard/Admin";
import User from "./pages/Dashboard/User";
import Article from "./pages/Dashboard/Article";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/blog" element={<Blog />} />
            <Route element={<Index />}>
              <Route path="/admins" element={<Admin />} />
              <Route path="/users" element={<User />} />
              <Route path="/articles" element={<Article />} />
            </Route>
          </Route>

          <Route element={<PublicRoutes />}>
            <Route element={<Login />} path="/login" />
            <Route path="/signup" element={<Signup signup="Sign Up" />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
