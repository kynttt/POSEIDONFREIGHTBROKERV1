import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const { isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (roles && roles.length > 0 && !roles.includes(role || "")) {
      console.log("You do not have permission to access this page.");
      setHasPermission(false);
    }
  }, [isAuthenticated, role, roles, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (!hasPermission) {
    return <div>You do not have permission to access this page.</div>;
  }

  return element;
};

export default PrivateRoute;
