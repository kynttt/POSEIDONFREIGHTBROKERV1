import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "../../../lib/axiosInstance";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../../state/useAuthStore";
import { LoginResponse } from "../../../utils/types";

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const token = searchParams.get("token");
  const path = searchParams.get("path");

  // Mutation to verify the token
  const { mutate, isPending, isError, isSuccess, error } = useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: async (token) => {
      const response = await axiosInstance.post("/account/oauth/verify-token", {
        token,
      });
      return response.data as LoginResponse;
    },
    onSuccess: (response) => {
      login({ user: response.data });
      if (path) {
        navigate(path);
      }
    },
    onError: (error) => {
      notifications.show({
        color: "red",
        title: "Token verification failed",
        message: error.response?.data.message || "An error occurred",
      });
      navigate("/login");
    },
  });

  useEffect(() => {
    if (token && path) {
      mutate(token); // Trigger the token verification
    }
  }, [token, path, mutate, navigate]);

  if (isPending) return <div>Verifying token, please wait...</div>;
  if (isError) return <div> {error?.response?.data.message}</div>;
  if (isSuccess) return null;

  return null;
};

export default OAuthRedirect;
