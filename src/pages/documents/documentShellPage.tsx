import {
  faFile,
  faFileAlt,
  faFolder,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Flex,
  Stack,
  TextInput,
  Title,
  Text,
  Modal,
  Menu,
  rem,
  Dialog,
  Progress,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../state/useAuthStore";
import { CreateFolderData, FileSchema, FolderSchema } from "../../utils/types";
import queryClient from "../../lib/queryClient";
import { createFolder, uploadFile } from "../../lib/apiCalls";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function DocumentShellPage() {
  return (
    <div className="h-[92.8vh] w-full p-3">
      <Stack w="100%" h="100%">
        <Header />
        <Outlet />
      </Stack>
    </div>
  );
}
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get("q");
  const [searchQuery, setSearchQuery] = useState<string | undefined>(
    query ?? undefined
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!searchQuery) {
        navigate(`/a/documents`);
        return;
      }
      navigate(`/a/documents/search?q=${searchQuery}`);
    }
  };

  return (
    <Flex w="100%" justify={"space-between"}>
      <Flex w={"60%"} gap={30} align={"center"}>
        <Title order={3}>Documents</Title>
        <TextInput
          variant="filled"
          value={searchQuery}
          leftSection={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Search File or Folder"
          w={"80%"}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          size="md"
        />
      </Flex>

      <CreateButton />
    </Flex>
  );
}
function CreateButton() {
  const [createFolderOpened, { open: folderOpen, close: folderClose }] =
    useDisclosure(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { folderId } = useParams<{ folderId: string }>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [dialogOpened, { open: dialogOpen, close: dialogClose }] =
    useDisclosure(false);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };
  const fileMutation = useMutation<FileSchema, AxiosError, FormData>({
    mutationFn: (formData: FormData) =>
      uploadFile(formData, folderId, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
        );
        setUploadProgress(percentCompleted * 0.5); // Update the progress state
      }),
    onSuccess: () => {
      setUploadProgress(100); // Ensure upload progress reaches 100%
      notifications.show({
        title: "Success",
        message: "File uploaded successfully",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      dialogClose(); // Close dialog on success
    },
    onError: (err) => {
      setUploadProgress(0); // Reset progress on error
      notifications.show({
        title: "Error",
        message: (
          err.response?.data as {
            message: string;
          }
        ).message,
        color: "red",
      });
      dialogClose(); // Close dialog on error
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setSelectedFile(file);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Reset progress and open dialog
      setUploadProgress(0);
      dialogOpen(); // Open the dialog when uploading starts

      // Trigger the mutation
      fileMutation.mutate(formData);
    }

    // Reset the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // This is the key part
    }
  };
  return (
    <>
      <Modal
        opened={createFolderOpened}
        onClose={folderClose}
        title="New Folder"
        centered
      >
        <CreateFolderModal close={folderClose} />
      </Modal>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Menu>
        <Menu.Target>
          <Button
            leftSection={
              <FontAwesomeIcon
                icon={faPlus}
                style={{ width: rem(14), height: rem(14) }}
              />
            }
            variant="light"
            size="md"
          >
            Create
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <FontAwesomeIcon
                icon={faFolder}
                style={{ width: rem(14), height: rem(14) }}
              />
            }
            onClick={folderOpen}
          >
            Create Folder
          </Menu.Item>
          <Menu.Item
            leftSection={
              <FontAwesomeIcon
                icon={faFile}
                style={{ width: rem(14), height: rem(14) }}
              />
            }
            onClick={handleFileUploadClick}
          >
            Upload File
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Dialog for showing upload progress */}
      <Dialog
        opened={dialogOpened}
        withCloseButton
        onClose={dialogClose}
        size="lg"
        radius="md"
      >
        <Stack gap={2}>
          <Flex align="center" mb="md" gap={5}>
            {/* Show file icon */}
            <FontAwesomeIcon
              icon={faFileAlt}
              className="text-blue-500 text-3xl"
            />
            {/* Show file name */}
            <Text className="text-blue-500 text-3xl">{selectedFile?.name}</Text>
          </Flex>
          <Progress value={uploadProgress} size="md" />
        </Stack>
      </Dialog>
    </>
  );
}

function CreateFolderModal({ close }: { close: () => void }) {
  const { folderId } = useParams<{ folderId: string }>();
  const userId = useAuthStore((state) => state.userId);
  const [folderName, setFolderName] = useState<string | undefined>(undefined);
  const mutation = useMutation<
    FolderSchema,
    AxiosError<{ message: string }>,
    CreateFolderData
  >({
    mutationFn: createFolder,
    onSuccess: () => {
      notifications.show({
        title: "Folder Created",
        message: "Folder created successfully",
        color: "green",
      });
      queryClient.invalidateQueries({
        // queryKey: ["folders"],
        queryKey: ["folders", folderId || ".$root", userId],
      });
      close();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      notifications.show({
        title: "Folder Creation Failed",
        message: error.response?.data.message,
        color: "red",
      });
    },
  });

  const onCreateHandler = () => {
    mutation.mutate({ name: folderName, parentId: folderId });
  };
  return (
    <Stack>
      <TextInput
        placeholder="Folder Name (Optional)"
        onChange={(event) => setFolderName(event.currentTarget.value)}
      />
      <Button
        variant="light"
        onClick={onCreateHandler}
        loading={mutation.isPending}
      >
        Create
      </Button>
    </Stack>
  );
}
