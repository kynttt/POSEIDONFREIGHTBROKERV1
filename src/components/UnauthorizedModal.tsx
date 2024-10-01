import { modals } from "@mantine/modals";
import { useAuthStore } from "../state/useAuthStore";
import { Button, Flex, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { LogoutResponse } from "../utils/types";
import { notifications } from "@mantine/notifications";
import { logoutUser } from "../lib/apiCalls";

type UnauthorizedType =
  | "no-token-auth"
  | "no-user-auth"
  | "not-verified"
  | "user-not-complete";
export default function UnauthorizedModal({
  type,
}: {
  type: UnauthorizedType;
}) {
  const { logoutUpdate } = useAuthStore();
  const mutation = useMutation<LogoutResponse, Error, undefined>({
    mutationFn: logoutUser,
    onSuccess: () => {
      notifications.show({
        title: "Logout successful",
        message: "You have been logged out",
        color: "green",
      });
      logoutUpdate();
      modals.closeAll();
    },
    onMutate: () => {
      notifications.show({
        title: "Logging out",
        message: "Please wait...",
        color: "blue",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Logout failed",
        message: error.message,
        color: "red",
      });
    },
  });

  const message = {
    "no-token-auth": "Your session has expired. Please log in again.",
    "no-user-auth": "Account problem. Please log in again.",
    "not-verified": "Your account is not verified. Please verify your account.",
    "user-not-complete":
      "Your account is not complete. Please complete your account.",
  };

  const buttonLabel = {
    "no-token-auth": "Log in",
    "no-user-auth": "Log in",
    "not-verified": "Verify account",
    "user-not-complete": "Complete account",
  };

  const handler = {
    "no-token-auth": () => {
      logoutUpdate();
      // Redirect to login page
      window.location.href = "/login";
      modals.closeAll();
    },
    "no-user-auth": () => {
      logoutUpdate();
      // Redirect to login page
      window.location.href = "/login";
      modals.closeAll();
    },
    "not-verified": () => {
      // Redirect to account verification page
      window.location.href = "/verify";
      modals.closeAll();
    },
    "user-not-complete": () => {
      // Redirect to account verification page
      window.location.href = "/account-completion";
      modals.closeAll();
    },
  };

  return (
    <>
      <Text size="sm">{message[type]}</Text>

      <Flex gap={"sm"}>
        {(type === "not-verified" || type === "user-not-complete") && (
          <Button
            fullWidth
            onClick={() => mutation.mutate(undefined)}
            mt="md"
            variant="light"
            color="red"
            loading={mutation.isPending}
          >
            Logout
          </Button>
        )}
        <Button fullWidth onClick={() => handler[type]()} mt="md">
          {buttonLabel[type]}
        </Button>
      </Flex>
    </>
  );
}
