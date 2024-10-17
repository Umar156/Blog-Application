import React, { useState, useEffect } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { jwtDecode } from "jwt-decode";
import apiHandler from "../utils/apiHandler";
import endpoint from "../enums/endpoint";

export default function Blog() {
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JsonToken"); // get token from local storage
    if (token) {
      const decodedToken = jwtDecode(token); //decode token with jwt
      setBlogData((prevData) => ({
        ...prevData, //shallow copy of previous data
        userId: decodedToken.sub, //added userId with the decoded token
      }));
    }
  }, []);

  const handleData = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value }); //update data using key value pair when onchange trigger
  };

  const submitBlog = (e) => {
    e.preventDefault();

    apiHandler(endpoint.CREATE_ARTICLES, "POST", {
      article: blogData,
    })
      .then((res) => {
        console.log("Blog created successfully:", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="nav">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Logo />
            </div>
          </div>
        </div>
      </div>
      <div className="container blog-page-design ">
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <h2 className="text-center blog-head-design">Create Blog</h2>
            <div className="small-line mb-4 "></div>
            <input
              type="text"
              className="form-control mb-3 p-2 blog-input"
              placeholder="Title"
              name="title"
              value={blogData.title}
              onChange={handleData}
            />
            <textarea
              type="text"
              className="form-control mb-3 p-2 blog-input"
              placeholder="Body"
              rows="8"
              name="body"
              value={blogData.body}
              onChange={handleData}
            ></textarea>
            <div className="col-12">
              <button
                className="form-control  btn-blog-create"
                onClick={submitBlog}
              >
                Create
              </button>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}
