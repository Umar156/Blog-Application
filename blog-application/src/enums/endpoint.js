const routes = {
  SIGN_UP: "/signup",
  LOGIN: "/login",
  CREATE_COMMENT: "/comments",
  CREATE_ARTICLES: "/articles",
  CREATE_LIKES: "/likes",
  UPDATE_COMMENT: (id) => `/comments/${id}`,
  CREATE_USERS: "/users/users",
  CREATE_ADMINS: "/users/admins",
  CREATE_BLOGS: "/articles/blogs",
};

export default routes;
