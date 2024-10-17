import React, { useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import apiHandler from "../utils/apiHandler";
import endpoint from "../enums/endpoint";

export default function Signup(props) {
  const navigate = useNavigate();
  const [blogFormData, setBlogFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [removeMargin, setRemoveMargin] = useState(false);

  const handleInput = (e) => {
    setBlogFormData({ ...blogFormData, [e.target.name]: e.target.value });
  };

  const SubmitBtn = (e) => {
    e.preventDefault();

    const validationError = {};
    if (!blogFormData.name.trim()) {
      validationError.name = "Name is required !";
    } else if (!/^[A-Za-z]+$/.test(blogFormData.name)) {
      validationError.name = "Name should contain only letters !";
    }
    if (!blogFormData.username.trim()) {
      validationError.username = "Username is required !";
    }
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
    if (!blogFormData.password_confirmation.trim()) {
      validationError.password_confirmation = "Confirm Password is required !";
    } else if (blogFormData.password_confirmation !== blogFormData.password) {
      validationError.password_confirmation = "Password not matched !";
    }

    setErrors(validationError);
    if (Object.keys(validationError).length === 0) {
      alert("Form Submit Successfully");
    }

    setRemoveMargin(!removeMargin);

    apiHandler(endpoint.SIGN_UP, "POST", {
      user: blogFormData,
    })
      .then((res) => {
        console.log("User registered successfully:", res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form>
      <div>
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
              <h2 className="text-center sign-up-design">Sign Up</h2>
              <div className="small-line mb-4"></div>
              <input
                type="text"
                placeholder="Name"
                className={`form-control p-2 bg-input ${
                  removeMargin ? "" : " mb-3"
                }`}
                name="name"
                value={blogFormData.name}
                onChange={handleInput}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
              <input
                type="text"
                placeholder="Username"
                className={`form-control p-2 bg-input ${
                  removeMargin ? "" : " mb-3"
                }`}
                name="username"
                value={blogFormData.username}
                onChange={handleInput}
              />
              {errors.username && (
                <span className="error-msg">{errors.username}</span>
              )}
              <input
                type="email"
                placeholder="Email"
                className={`form-control p-2 bg-input ${
                  removeMargin ? "" : " mb-3"
                }`}
                name="email"
                value={blogFormData.email}
                onChange={handleInput}
              />
              {errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}

              <input
                type="password"
                placeholder="Password"
                className={`form-control p-2 bg-input ${
                  removeMargin ? "" : " mb-3"
                }`}
                name="password"
                autoComplete="true"
                value={blogFormData.password}
                onChange={handleInput}
              />
              {errors.password && (
                <span className="error-msg">{errors.password}</span>
              )}
              <input
                type="password"
                placeholder="Confirm Password"
                className={`form-control p-2 bg-input ${
                  removeMargin ? "" : " mb-3"
                }`}
                name="password_confirmation"
                autoComplete="true"
                value={blogFormData.password_confirmation}
                onChange={handleInput}
              />
              {errors.password_confirmation && (
                <span className="error-msg">
                  {errors.password_confirmation}
                </span>
              )}
              <div className="col-12">
                <button
                  className="form-control  btn-signup"
                  onClick={SubmitBtn}
                >
                  {props.signup}
                </button>
              </div>
              <div className="link-div-design">
                <Link to="/Login" className="link-design">
                  Already have an account!
                </Link>
              </div>
            </div>
            <div className="col-lg"></div>
          </div>
        </div>
      </div>
    </form>
  );
}
