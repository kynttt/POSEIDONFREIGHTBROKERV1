import { useQuery, useMutation } from "@tanstack/react-query";
import { listNotifications, updateNotificationStatus } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/state/useAuthStore"; // Adjust the import path
import { NotificationSchema } from "../utils/types";
import queryClient from "../lib/queryClient";

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
  const { userId, isAuthenticated, role } = useAuthStore((state) => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
    role: state.role, // Assuming role is stored in state
  }));

  if (!isAuthenticated || !userId) {
    return <div>Please log in to view notifications</div>;
  }

  // Fetch notifications
  const { data, isLoading, isError, error } = useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const options = { type: role === "admin" ? "admin" : "user" }; // Set type based on role
      const notifications = await listNotifications(userId, options); // Pass both userId and options
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
      queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
      });
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
