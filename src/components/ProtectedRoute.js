import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authLoading, loggedIn, children }) => {

  if (authLoading) {
    return (loggedIn ? children : <Navigate to="/sign-in" />)
  }
};

export default ProtectedRoute;