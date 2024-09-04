import { useQuery, useMutation } from "@tanstack/react-query";
import { listNotifications, updateNotificationStatus } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/state/useAuthStore"; // Adjust the import path
import { NotificationSchema } from "../utils/types";

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  metadata?: { key: string; value: string }[];
}

export default function NotificationModal() {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuthStore((state) => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
  }));

  if (!isAuthenticated || !userId) {
    return <div>Please log in to view notifications</div>;
  }

  // Fetch notifications
  const { data, isLoading, isError, error } = useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const notifications = await listNotifications(userId);
      return notifications.map((notification: any) => ({
        _id: notification._id ?? "",
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt,
        isRead: notification.isRead,
        metadata: notification.metadata,
      }));
    },
    refetchOnWindowFocus: true,
  });

  // Define mutation for updating notification status
  const mutation = useMutation({
    mutationFn: (id: string) => updateNotificationStatus(id, true),
    onSuccess: () => {
      // Optionally refetch notifications or handle successful update
    },
    onError: (error: any) => {
      // Handle error
      console.error("Error updating notification status:", error);
    },
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <Loader size="sm" />;
  }

  // Sort notifications by createdAt in descending order
  const sortedNotifications =
    data?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) || [];

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

  const formatNotificationMessage = (notification: Notification) => {
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

    if (notification.bookingId) {
      console.log("Navigating directly to booking ID:", notification.bookingId);
      navigate(`/s/shipmentDetails/${notification.bookingId}`);
    } else if (notification.metadata && notification.metadata.length > 0) {
      const bookingIdMetadata = notification.metadata.find(
        (item) => item.key === "reference"
      );

      if (bookingIdMetadata) {
        console.log(
          "Navigating to booking ID from metadata:",
          bookingIdMetadata.value
        );
        navigate(`/s/shipmentDetails/${bookingIdMetadata.value}`);
      } else {
        console.error("Booking ID metadata not found");
      }
    } else {
      console.error("No booking ID or relevant metadata found");
    }
  };

  return (
    <>
      <ScrollArea.Autosize mah={800} maw={700}>
        <Stack>
          {sortedNotifications.length === 0 && (
            <div>No notifications available</div>
          )}
          {sortedNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`py-2 px-12 hover:bg-gray-500 hover:text-white rounded-md transition-colors duration-200 cursor-pointer border shadow-lg ${
                !notification.isRead
                  ? "bg-violet-200 text-black"
                  : "text-gray-700"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="text-sm font-medium">{notification.title}</div>
              <div className="text-xs font-normal">
                {formatNotificationMessage(notification)}
              </div>
              <div className="text-xs mt-1">
                {formatNotificationDate(notification.createdAt)}
              </div>
            </div>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </>
  );
}
