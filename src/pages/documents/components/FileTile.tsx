import { useContextMenu } from "mantine-contextmenu";
import {
  DeleteFileData,
  DeleteResponse,
  FileSchema,
} from "../../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteFile } from "../../../lib/apiCalls";
import { notifications } from "@mantine/notifications";
import queryClient from "../../../lib/queryClient";
import { Button, Stack } from "@mantine/core";
import { faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FileTile({
  file,
  queryKey,
}: {
  queryKey?: string[];
  file: FileSchema;
}) {
  // const [opened, { open, close }] = useDisclosure(false);
  // const [fileData, setFileData] = useState<string | null>(null); // For storing the file content or preview
  // const [error, setError] = useState<string | null>(null); // Error handling
  const { showContextMenu } = useContextMenu();
  const mutation = useMutation<
    DeleteResponse,
    AxiosError<{ message: string }>,
    DeleteFileData
  >({
    mutationFn: deleteFile,
    onError: (error: AxiosError<{ message: string }>) => {
      notifications.show({
        title: "File Deletion Failed",
        message: error.response?.data.message,
        color: "red",
      });
    },
    onMutate: async () => {
      notifications.show({
        title: "Deleting File",
        message: `Deleting ${file.name}...`,
        color: "blue",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey ?? ["files"],
      });
      notifications.show({
        title: "File Deleted",
        message: "File deleted successfully",
        color: "green",
      });
    },
  });
  const handleFileClick = async () => {
    window.open(
      `http://localhost:5000/api/folders/${file.folder}/files/${file._id}/view`,
      `${file.name}`
    );
    // open(); // Open the modal
    // setError(null); // Reset error
    // try {
    //   const response = await axiosInstance.get(
    //     `http://localhost:5000/api/folders/${file.folder}/files/${file._id}/view`,
    //     {
    //       responseType: "blob", // Fetch as blob for file handling
    //     }
    //   );

    //   // Create a URL for the file blob
    //   const fileURL = URL.createObjectURL(response.data);
    //   setFileData(fileURL); // Set the file data URL
    // } catch (error) {
    //   console.error("Error fetching file:", error);
    //   setError("Failed to load file."); // Set an error message
    // }
  };

  const onDeleteFileHandler = () => {
    mutation.mutate({ fileId: file._id!, folderId: file.folder });
  };

  // Utility function to truncate the file name
  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <>
      <div
        onContextMenu={showContextMenu((close) => {
          return (
            <Stack w={200}>
              <Button
                color="red"
                variant="subtle"
                leftSection={<FontAwesomeIcon icon={faTrash} />}
                onClick={() => {
                  onDeleteFileHandler();
                  close();
                }}
              >
                Delete
              </Button>
            </Stack>
          );
        })}
        className="bg-white shadow-md rounded-lg p-3 flex items-center hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
        onClick={handleFileClick} // Trigger modal on click
      >
        <div className="mr-4">
          <FontAwesomeIcon icon={faFile} className="text-blue-500 text-1xl" />
        </div>
        <div className="flex-1">{truncateString(file.name, 20)}</div>
      </div>

      {/* Modal for file preview */}
      {/* <Modal
          opened={opened}
          onClose={close}
          title={file.name}
          radius={0}
          className="bg-red-500"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          fullScreen
        >
          {error ? (
            <Text color="red">{error}</Text>
          ) : fileData ? (
            <DocViewer
              pluginRenderers={[PDFRenderer, PNGRenderer, ...DocViewerRenderers]}
              documents={[{ uri: fileData }]}
            />
          ) : (
            <Text>Loading file...</Text>
          )}
        </Modal> */}
    </>
  );
}
