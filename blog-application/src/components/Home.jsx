import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import format from "date-fns/format";
import Comment from "./Comment";
import profile from "./images/Profile.png";
import apiHandler from "../utils/apiHandler";
import endpoint from "../enums/endpoint";
import { jwtDecode } from "jwt-decode";
import Profile from "./Profile";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [commentOnBlog, setCommentOnBlog] = useState();

  const [likeData, setLikeData] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [buttonColor, setButtonColor] = useState("black");

  const fetchArticles = () => {
    apiHandler(endpoint.CREATE_ARTICLES, "GET")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("JsonToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLikeData((prevData) => ({
        ...prevData,
        userId: decodedToken.sub,
      }));
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  const navigate = useNavigate();

  const likeButton = (articleId) => {
    if (localStorage.getItem("JsonToken")) {
    } else {
      navigate("/login");
    }

    setLikeData((prevData) => ({
      ...prevData,
      article_id: articleId,
    }));

    const newColor = buttonColor[articleId] === "blue" ? "black" : "blue";
    setButtonColor((prevColor) => ({
      ...prevColor,
      [articleId]: newColor,
    }));

    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      apiHandler(endpoint.CREATE_LIKES, "POST", {
        like: likeData,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [likeData, buttonClicked]);

  const handleEditClick = (commentId, commentBody) => {
    setEditId(commentId);
    setEditedComment(commentBody);
  };

  const handleSaveClick = (commentId) => {
    apiHandler(endpoint.UPDATE_COMMENT(commentId), "PUT", {
      comment: {
        body: editedComment,
      },
    })
      .then((res) => {
        console.log("Comment update successfully:", res);
        fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });

    setEditId(null);
  };

  return (
    <>
      <div className="nav">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Logo />
            </div>
            <div className="col-6"></div>
            <div className="col-3 text-end profile-set">
              <Profile />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-2"></div>

            <div className="col-8 mt-5">
              <Link to="blog" className="new-blog-link  ">
                New Blog
              </Link>
              {blogs.map((blog) => (
                <div key={blog.id} className=" mt-1 mb-3 ">
                  <div className="card home-card-design">
                    <div className="article-container">
                      <img
                        src={profile}
                        alt="Profile pic"
                        className="article-user-design"
                      />
                      <div className="article-details">
                        <p className="blog-user-name">{blog.user.name}</p>
                        <p className="blog-date-create">
                          {format(new Date(blog.created_at), "dd MMMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="card-body ">
                      <h4 className="card-title ">{blog.title}</h4>
                      <p className="card-title ">{blog.body}</p>
                    </div>

                    <div className="row">
                      <div className="col-12 line-comment "></div>
                      <div className="col-2"></div>
                      <div className="col-4 text-center set-response">
                        <i className="fa fa-thumbs-up "></i>

                        <button
                          className="like-button"
                          style={{ color: buttonColor[blog.id] }}
                          onClick={() => {
                            likeButton(blog.id);
                          }}
                        >
                          Like
                        </button>
                      </div>
                      <div className="col-4 text-center set-response">
                        <i className="fa fa-comments-o"></i>
                        <button
                          className="like-button"
                          onClick={() => {
                            setCommentOnBlog(blog.id);
                          }}
                        >
                          Comment
                        </button>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-12 line-comment "></div>
                      {blog.comments.map((comment, commentIndex) => (
                        <div
                          key={"blog-" + blog.id + "comment-" + commentIndex}
                          className="col-12 comment-sec-design"
                        >
                          <div className="complete-comment-body">
                            <h6 className="user-name-comment">
                              {comment.user.name}
                            </h6>

                            {editId === comment.id ? (
                              <input
                                type="text"
                                className="form-control editable-input"
                                value={editedComment}
                                name="body"
                                onChange={(e) =>
                                  setEditedComment(e.target.value)
                                }
                              />
                            ) : (
                              <p className="comment-body-design">
                                {comment.body}
                              </p>
                            )}
                          </div>
                          <div>
                            <i
                              className="fa fa-ellipsis-h editable-icon mt-4"
                              onClick={() =>
                                handleEditClick(comment.id, comment.body)
                              }
                            ></i>
                            {editId === comment.id && (
                              <button
                                className="editable-button pt-2"
                                onClick={() =>
                                  handleSaveClick(comment.id, blog.id)
                                }
                              >
                                &#9658;
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Comment
                        articleId={blog.id}
                        onSuccess={() => fetchArticles()}
                        selectedBlog={commentOnBlog}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
