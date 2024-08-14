import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";
import { notifications } from "@mantine/notifications";

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const { isAuthenticated, role, isLoading, isError, fetchUser } =
    useAuthStore();
  const navigate = useNavigate();
  const [noPermission, setNoPermission] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated === null) {
      fetchUser(); // Fetch user info if authentication state is unknown
    }
  }, [isAuthenticated, fetchUser]);

  React.useEffect(() => {
    if (isLoading || isAuthenticated === null) {
      return;
    }

    if (!isAuthenticated) {
      notifications.show({
        color: "red",
        title: "Access Denied",
        message: "You must be logged in to access this page.",
      });
      navigate("/login");
    } else if (roles && roles.length > 0 && !roles.includes(role || "")) {
      setNoPermission(true);
    }
  }, [isAuthenticated, isLoading, role, roles, navigate]);

  if (isLoading || isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (noPermission) {
    return <div>You do not have permission to access this page.</div>;
  }

  return element;
};

export default React.memo(PrivateRoute);
