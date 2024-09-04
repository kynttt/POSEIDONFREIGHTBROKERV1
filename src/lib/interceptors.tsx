import axiosInstance from "./axiosInstance";

import { modals } from "@mantine/modals";

import UnauthorizedModal from "../components/UnauthorizedModal";

const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use((config) => {
    config.withCredentials = true; // This ensures cookies are included with each request
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        modals.open({
          title: "Unauthorized Detected",
          withCloseButton: false,
          children: <UnauthorizedModal type={error.response.data.type} />,
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
