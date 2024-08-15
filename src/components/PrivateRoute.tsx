import React, { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const authToken = useMemo(() => Cookies.get("authToken"), []);
  const { role, fetchUser, isAuthenticated } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser", authToken],
    queryFn: fetchUser,
    enabled: !!Cookies.get("authToken"), // Only fetch if authToken exists
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  const navigate = useNavigate();
  const [noPermission, setNoPermission] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      fetchUser(); // Fetch user info if authentication state is unknown
    }
  }, [isAuthenticated, fetchUser]);

  React.useEffect(() => {
    if (isLoading && !data) {
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
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
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
