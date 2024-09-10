import { useNavigate } from "react-router-dom";
import {
  DeleteFolderData,
  DeleteResponse,
  FolderSchema,
} from "../../../utils/types";
import { useAuthStore } from "../../../state/useAuthStore";
import { AxiosError } from "axios";
import { useContextMenu } from "mantine-contextmenu";
import { useMutation } from "@tanstack/react-query";
import { deleteFolder } from "../../../lib/apiCalls";
import { notifications } from "@mantine/notifications";
import queryClient from "../../../lib/queryClient";
import { Button, Stack } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function FolderTile({
  folder,
  folderId,
  queryKey,
}: {
  queryKey?: string[];
  folderId?: string;
  folder: FolderSchema;
}) {
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.userId);
  const onClick = () => {
    navigate(`/a/documents/folder/${folder._id}`);
  };

  const { showContextMenu } = useContextMenu();
  const mutation = useMutation<
    DeleteResponse,
    AxiosError<{ message: string }>,
    DeleteFolderData
  >({
    mutationFn: deleteFolder,
    onError: (error: AxiosError<{ message: string }>) => {
      notifications.show({
        title: "Folder Deletion Failed",
        message: error.response?.data.message,
        color: "red",
      });
    },
    onMutate: async () => {
      notifications.show({
        title: "Deleting folder",
        message: `Deleting ${folder.name}...`,
        color: "blue",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey ?? ["folders", folderId || ".$root", userId],
      });
      notifications.show({
        title: "Folder Deleted",
        message: "Folder deleted successfully",
        color: "green",
      });
    },
  });
  const onDeleteFolderHandler = () => {
    mutation.mutate({ folderId: folder._id! });
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-3 flex items-center hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
      onContextMenu={showContextMenu((close) => {
        return (
          <Stack w={200}>
            <Button
              color="red"
              variant="subtle"
              leftSection={<FontAwesomeIcon icon={faTrash} />}
              onClick={() => {
                onDeleteFolderHandler();
                close();
              }}
            >
              Delete
            </Button>
          </Stack>
        );
      })}
    >
      <div className="mr-4">
        <FontAwesomeIcon icon={faFolder} className="text-yellow-500 text-1xl" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-800  text-md">
          {folder.name}
        </div>
      </div>
    </div>
  );
}
