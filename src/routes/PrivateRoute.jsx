// File: src/routes/PrivateRoute.jsx

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Turn this ON to allow client demo without login
const demoMode = true;

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-xl">
        যাচাই করা হচ্ছে...
      </div>
    );
  }

  // Skip login check if demoMode is ON
  if (!user && !demoMode) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
