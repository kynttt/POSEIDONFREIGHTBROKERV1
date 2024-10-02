import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../state/useAuthStore";
import { getUser } from "../lib/apiCalls";
import { useEffect } from "react";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { login, logoutUpdate } = useAuthStore((state) => ({
    login: state.login,
    logoutUpdate: state.logoutUpdate,
  }));

  const { isLoading, data, isError } = useQuery({
    queryKey: ["authCheck"],
    queryFn: getUser,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      login({ user: data });
    } else if (isError) {
      logoutUpdate();
    }
  }, [data, login, logoutUpdate, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
  
}
