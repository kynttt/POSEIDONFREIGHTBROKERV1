import { useQuery, useMutation } from "@tanstack/react-query";
import { listNotifications, updateNotificationStatus } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/state/useAuthStore"; // Adjust the import path
import { NotificationSchema } from "../utils/types";
import queryClient from "../lib/queryClient";

export default function NotificationModal() {
  const navigate = useNavigate();
  const { userId, isAuthenticated, role } = useAuthStore((state) => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
    role: state.role, // Assuming role is stored in state
  }));

  // Fetch notifications
  const { data, isLoading, isError, error } = useQuery<NotificationSchema[]>({
    queryKey: ["notifications", userId],
    enabled: !!isAuthenticated && !!userId,
    queryFn: async () => {
      // const options = { type: role === "admin" ? "admin" : "user" }; // Set type based on role
      if (!userId) return [];
      const notifications = await listNotifications(userId!); // Pass both userId and options
      // return notifications.map((notification: any) => ({
      //   _id: notification._id ?? "",
      //   title: notification.title,
      //   message: notification.message,
      //   createdAt: notification.createdAt,
      //   isRead: notification.isRead,
      //   metadata: notification.metadata,
      // }));

      return notifications;
    },
    refetchOnWindowFocus: true,
  });

  // Define mutation for updating notification status
  const mutation = useMutation({
    mutationFn: (id: string) => updateNotificationStatus(id, true),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
      });
    },
  });

  // * The sorted function is already handle in backend
  // // Sort notifications by createdAt in descending order
  // const sortedNotifications =
  //   data?.sort(
  //     (a, b) =>
  //       new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
  //   ) || [];

  const formatNotificationDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, "PPP");
    }
  };

  const formatNotificationMessage = (notification: NotificationSchema) => {
    let message = notification.message;

    if (notification.metadata && notification.metadata.length > 0) {
      const bookingIdMetadata = notification.metadata.find(
        (item) => item.key === "reference"
      );
      if (bookingIdMetadata) {
        message = notification.message;
      }
    }

    return message;
  };

  const handleNotificationClick = async (notification: NotificationSchema) => {
    if (!notification.isRead) {
      if (notification._id) {
        await mutation.mutateAsync(notification._id);
      }
    }

    // Determine redirection based on role
    const targetRoute =
      role === "admin"
        ? `/a/editBooking/${notification.bookingId}`
        : `/s/shipmentDetails/${notification.bookingId}`;

    if (notification.bookingId) {
      console.log(`Navigating to ${targetRoute}`);
      navigate(targetRoute);
    } else if (notification.metadata && notification.metadata.length > 0) {
      const bookingIdMetadata = notification.metadata.find(
        (item) => item.key === "reference"
      );

      if (bookingIdMetadata) {
        const metadataTargetRoute =
          role === "admin"
            ? `/a/editBooking/${bookingIdMetadata.value}`
            : `/s/shipmentDetails/${bookingIdMetadata.value}`;
        console.log(`Navigating to ${metadataTargetRoute}`);
        navigate(metadataTargetRoute);
      } else {
        console.error("Booking ID metadata not found");
      }
    } else {
      console.error("No booking ID or relevant metadata found");
    }
  };

  if (!isAuthenticated || !userId) {
    return <div>Please log in to view notifications</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <Loader size="sm" />;
  }

  return (
    <>
      <ScrollArea.Autosize mah={800} maw={700}>
        <Stack>
          {data!.length === 0 && <div>No notifications available</div>}
          {data!.map((notification) => (
            <div
              key={notification._id}
              className={`py-2 bg-gray-50 px-12 hover:bg-gray-400 hover:text-white rounded-md transition-colors duration-200 cursor-pointer  shadow-lg ${
                !notification.isRead
                  ? "bg-blue-50 text-black"
                  : "text-gray-700"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="text-sm font-medium">{notification.title}</div>
              <div className="text-xs font-normal">
                {formatNotificationMessage(notification)}
              </div>
              <div className="text-xs mt-1">
                {formatNotificationDate(notification.createdAt!)}
              </div>
            </div>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </>
  );
}
