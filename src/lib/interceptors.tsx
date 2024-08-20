import axiosInstance from "./axiosInstance";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

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
          children: (
            <>
              <Text size="sm">
                Your session has expired. Please log in again.
              </Text>
              <Button
                fullWidth
                onClick={() => {
                  // Redirect to login page
                  window.location.href = "/login";
                  modals.closeAll();
                }}
                mt="md"
              >
                Login
              </Button>
            </>
          ),
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
