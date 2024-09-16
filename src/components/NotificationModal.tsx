import { useQuery, useMutation } from "@tanstack/react-query";
import { listNotifications, updateNotificationStatus } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack, Image } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/state/useAuthStore";
import { NotificationSchema, User } from "../utils/types";
import queryClient from "../lib/queryClient";

function isUser(user: string | User): user is User {
  return (user as User).profilePicUrl !== undefined;
}

export default function NotificationModal() {
  const navigate = useNavigate();
  const { userId, isAuthenticated, role } = useAuthStore((state) => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
    role: state.role,
  }));

  const { data, isLoading, isError, error } = useQuery<NotificationSchema[]>({
    queryKey: ["notifications", userId],
    enabled: !!isAuthenticated && !!userId,
    queryFn: async () => {
      if (!userId) return [];
      const notifications = await listNotifications(userId);
      return notifications;
    },
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => updateNotificationStatus(id, true),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
      });
    },
  });

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

    const targetRoute =
      role === "admin"
        ? `/a/editBooking/${notification.bookingId}`
        : `/s/shipmentDetails/${notification.bookingId}`;

    if (notification.bookingId) {
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
              className={`py-2 px-12 hover:bg-gray-400 hover:text-white rounded-md transition-colors duration-200 cursor-pointer shadow-lg ${
                !notification.isRead
                  ? "bg-blue-50 text-black"
                  : "text-gray-700"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-center">
                {isUser(notification.user) && notification.user.profilePicUrl && (
                  <Image
                    src={notification.user.profilePicUrl}
                    alt="Profile Picture"
                    radius="xl"
                    width={40}
                    height={40}
                    className="mr-3"
                  />
                )}
                <div className="text-sm font-medium">{notification.title}</div>
              </div>
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
