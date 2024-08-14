import axios from "axios";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use((config) => {
    config.withCredentials = true; // This ensures cookies are included with each request
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle session expiration or invalid token
        modals.openConfirmModal({
          title: "Session Expired",
          children: (
            <Text size="sm">
              Your session has expired. Please log in again.
            </Text>
          ),
          labels: { confirm: "Log In", cancel: "Cancel" },
          onConfirm: () => {
            // Redirect to login page
            window.location.href = "/login";
          },
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
