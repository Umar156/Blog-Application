import React, { useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import apiHandler from "../utils/apiHandler";
import endpoint from "../enums/endpoint";

export default function Login() {
  const [blogFormData, setBlogFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [removeMargin, setRemoveMargin] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setBlogFormData({ ...blogFormData, [e.target.name]: e.target.value });
  };

  const SubmitBtn = (e) => {
    e.preventDefault();

    const validationError = {};
    if (!blogFormData.email.trim()) {
      validationError.email = "Email is required !";
    } else if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(blogFormData.email)
    ) {
      validationError.email = "Email is invalid !";
    }
    if (!blogFormData.password.trim()) {
      validationError.password = "Password is required !";
    } else if (blogFormData.password.length < 6) {
      validationError.password = "Password should be at least 6 character !";
    }
    setErrors(validationError);

    setRemoveMargin(!removeMargin);

    apiHandler(endpoint.LOGIN, "POST", {
      user: blogFormData,
    })
      .then((res) => {
        const authToken = res.headers.authorization;
        localStorage.setItem("JsonToken", authToken);
        const userRole = res.data.status.data.user.role;
        if (userRole == "admin") {
          navigate("/admins");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="nav">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Logo />
            </div>
          </div>
        </div>
      </div>

      <div className="container  sign-up-page-design  ">
        <div className="row ">
          <div className="col-lg"></div>
          <div className="col-lg ">
            <h2 className="text-center sign-up-design">Login</h2>
            <div className="small-line mb-4"></div>
            <input
              type="email"
              placeholder="Email"
              className={`form-control p-2 bg-input ${
                removeMargin ? "" : " mb-3"
              }`}
              name="email"
              autoComplete="true"
              value={blogFormData.email}
              onChange={handleInput}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
            <input
              type="password"
              placeholder="Password"
              className={`form-control p-2 bg-input ${
                removeMargin ? "" : " mb-3"
              }`}
              name="password"
              value={blogFormData.password}
              onChange={handleInput}
            />
            {errors.password && (
              <span className="error-msg">{errors.password}</span>
            )}
            <div className="col-12">
              <button className="form-control  btn-signup" onClick={SubmitBtn}>
                Login
              </button>
            </div>
            <div className="link-div-design">
              <Link to="/signup" className="link-design">
                Don't have an account!
              </Link>
            </div>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
    </>
  );
}
