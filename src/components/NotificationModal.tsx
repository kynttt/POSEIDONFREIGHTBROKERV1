import { useQuery, useMutation } from "@tanstack/react-query";
import { listNotifications, updateNotificationStatus } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

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

  // Fetch notifications
  const { data, isLoading, isError, error } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const notifications = await listNotifications();
      // Transform data if necessary
      return notifications.map((notification: any) => ({
        _id: notification._id ?? '',
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt,
        isRead: notification.isRead,
        metadata: notification.metadata
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
      console.error('Error updating notification status:', error);
    }
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <Loader size="sm" />;
  }

  // Sort notifications by createdAt in descending order
  const sortedNotifications = data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

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
        (item) => item.key === 'reference'
      );
      if (bookingIdMetadata) {
        message = notification.message;
      }
    }

    return message;
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await mutation.mutateAsync(notification._id);
    }

    if (notification.metadata && notification.metadata.length > 0) {
      const bookingIdMetadata = notification.metadata.find(
        (item) => item.key === 'reference'
      );
      if (bookingIdMetadata) {
        navigate(`/s/shipmentDetails/${bookingIdMetadata.value}`);
      }
    }
  };

  return (
    <>
      <ScrollArea.Autosize mah={900} maw={700}>
        <Stack>
          {sortedNotifications.length === 0 && <div>No notifications available</div>}
          {sortedNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`py-2 px-12   hover:bg-gray-900 rounded-md transition-colors duration-200 cursor-pointer border shadow-lg ${
                !notification.isRead ? "bg-violet-200 " : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="text-sm font-medium text-gray-700">
                {notification.title}
              </div>
              <div className="text-xs font-normal text-gray-500">
                {formatNotificationMessage(notification)}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {formatNotificationDate(notification.createdAt)}
              </div>
            </div>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </>
  );
}
