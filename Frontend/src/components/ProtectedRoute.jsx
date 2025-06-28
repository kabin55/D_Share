// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const walletAddress = localStorage.getItem("walletAddress");

  if (!walletAddress) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
