import { useQuery } from "@tanstack/react-query";
import { listNotifications } from "../lib/apiCalls";
import { Loader, ScrollArea, Stack } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";

export default function NotificationModal() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: listNotifications,
    refetchOnWindowFocus: true,
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <Loader size="sm" />;
  }
  const formatNotificationDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, "PPP"); // Formats the date as "Sep 2, 2024"
    }
  };

  return (
    <>
      <ScrollArea.Autosize mah={300} maw={500}>
        <Stack>
          {[...(data || [])].map((notification) => (
            <div
              key={notification._id}
              className="p-2   hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <div className="text-sm font-medium text-gray-900">
                {notification.title}
              </div>
              <div className="text-xs text-gray-700 ">
                {notification.message}
              </div>{" "}
              <div className="text-xs text-gray-500 mt-1">
                {formatNotificationDate(notification.createdAt as string)}
              </div>
            </div>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </>
  );
}
