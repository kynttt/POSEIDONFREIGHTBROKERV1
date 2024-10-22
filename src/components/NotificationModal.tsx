import { useQuery, useMutation } from "@tanstack/react-query";
import { listNotifications, updateNotificationStatus } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/state/useAuthStore"; // Adjust the import path
import { NotificationSchema } from "../utils/types";
import queryClient from "../lib/queryClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

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
      //   id: notification.id ?? "",
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

    if (notification.metadata) {
      const bookingIdMetadata = notification.metadata[
        "reference"
      ] as unknown as {
        value: string;
      };
      if (bookingIdMetadata) {
        message = notification.message;
      }
    }

    return message;
  };

  const handleNotificationClick = async (notification: NotificationSchema) => {
    if (!notification.isRead) {
      if (notification.id) {
        await mutation.mutateAsync(notification.id);
      }
    }

    if (notification.metadata) {
      const bookingIdMetadata = notification.metadata[
        "reference"
      ] as unknown as {
        value: string;
      };

      if (bookingIdMetadata) {
        const metadataTargetRoute =
          role === "admin"
            ? `/a/editBooking/${bookingIdMetadata}`
            : `/s/shipmentDetails/${bookingIdMetadata}`;
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
              key={notification.id}
              className={`hover:scale-105 mx-4 transform flex items-center justify-between py-2  px-6 hover:bg-gray-300 hover:text-primary rounded-md transition-all duration-200 cursor-pointer  shadow-lg ${
                !notification.isRead ? "bg-blue-50 text-black" : "text-gray-700"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-center pr-6">
                {notification.mediaUrl && (
                  <img
                    src={
                      notification.mediaUrl.startsWith("http")
                        ? notification.mediaUrl
                        : `${process.env.REACT_APP_SERVER_URL}/api/${notification.mediaUrl}`
                    }
                    alt="Notification"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      console.error(
                        `Failed to load image: ${e.currentTarget.src}`
                      );
                      e.currentTarget.src =
                        "https://avatar.iran.liara.run/public/boy?username=Ash";
                    }}
                  />
                )}
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-primary">
                    {notification.title}
                  </div>
                  <div className="text-xs font-normal">
                    {formatNotificationMessage(notification)}
                  </div>
                  <div className="text-xs mt-1 font-light">
                    {formatNotificationDate(notification.createdAt!)}
                  </div>
                </div>
              </div>
              {/* Add the icon on the rightmost side */}
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="text-lg text-gray-500 hover:text-gray-700"
              />
            </div>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </>
  );
}
