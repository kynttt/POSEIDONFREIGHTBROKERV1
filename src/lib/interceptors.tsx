import axiosInstance from "./axiosInstance";

import { modals } from "@mantine/modals";

import SessionExpired from "../components/SessionExpired";

const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use((config) => {
    config.withCredentials = true; // This ensures cookies are included with each request
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle session expiration or invalid token
        modals.open({
          title: "Session Expired",
          withCloseButton: false,
          children: <SessionExpired />,
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
