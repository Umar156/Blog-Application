import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  let auth = { token: localStorage.getItem("JsonToken") };
  return auth.token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
