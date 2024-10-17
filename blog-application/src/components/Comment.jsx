import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import endpoint from "../enums/endpoint";

export default function Comment({ articleId, onSuccess, selectedBlog }) {
  const [commentData, setCommentData] = useState({
    body: "",
    article_id: articleId,
  });

  const commentRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("JsonToken"); // get token from local storage
    if (token) {
      const decodedToken = jwtDecode(token); //decode token with jwt
      setCommentData((prevData) => ({
        ...prevData, //shallow copy of previous data
        userId: decodedToken.sub, //added userId with the decoded token
      }));
    }
  }, []);

  useEffect(() => {
    if (selectedBlog && selectedBlog === articleId) {
      commentRef.current.focus(); //focus on current comment bar
    }
  }, [selectedBlog, articleId]);

  const handleData = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value }); //update data using key value pair when onchange trigger
  };
  const navigate = useNavigate();

  const SubmitComment = (e) => {
    if (localStorage.getItem("JsonToken")) {
    } else {
      navigate("/login");
    }
    e.preventDefault();
    apiHandler(endpoint.CREATE_COMMENT, "POST", {
      comment: commentData,
    })
      .then((res) => {
        console.log("Comment create successfully:", res);
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
    setCommentData((prevCommentData) => ({ ...prevCommentData, body: "" }));
  };
  return (
    <div>
      <div className="col-12">
        <div className="input-group comment-design">
          <input
            type="text"
            className="form-control comment-input "
            placeholder="Write a comment..."
            name="body"
            value={commentData.body}
            onChange={handleData}
            ref={commentRef}
          />
          <div className="input-group-append">
            <span
              className="input-group-text send-arrow arrow-design"
              onClick={SubmitComment}
            >
              &#9658;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
