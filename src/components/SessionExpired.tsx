import { modals } from "@mantine/modals";
import { useAuthStore } from "../state/useAuthStore";
import { Button, Text } from "@mantine/core";
export default function SessionExpired() {
  const { logoutUpdate } = useAuthStore();

  return (
    <>
      <Text size="sm">Your session has expired. Please log in again.</Text>
      <Button
        fullWidth
        onClick={() => {
          logoutUpdate();
          // Redirect to login page
          window.location.href = "/login";
          modals.closeAll();
        }}
        mt="md"
      >
        Login
      </Button>
    </>
  );
}
