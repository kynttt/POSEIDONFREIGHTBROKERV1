import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../state/useAuthStore";

interface AdminRouteProps {
  element: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const { isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (role !== "admin") {
      console.log("You do not have permission to access this page.");
      setHasPermission(false);
    }
  }, [isAuthenticated, role, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (!hasPermission) {
    return <div>You do not have permission to access this page.</div>;
  }

  return element;
};

export default AdminRoute;
