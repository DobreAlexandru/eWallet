import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: any }) => {
  let { user } = useAuth() as any;
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
