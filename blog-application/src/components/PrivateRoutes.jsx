import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: localStorage.getItem("JsonToken") };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
