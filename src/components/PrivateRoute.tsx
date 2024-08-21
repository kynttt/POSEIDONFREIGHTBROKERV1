import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../state/useAuthStore";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/apiCalls";

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const { role, isAuthenticated, login, userId } = useAuthStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["authUser", userId],
    queryFn: getUser,
    enabled: false, // Prevent automatic fetching
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  const navigate = useNavigate();
  const [noPermission, setNoPermission] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  React.useEffect(() => {
    if (data) {
      login({ user: data });
    }
  }, [data, login]);

  React.useEffect(() => {
    if (isLoading) {
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
  }, [isAuthenticated, isLoading, navigate, role, roles]);

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
const memoized = React.memo(PrivateRoute);

export default memoized;
