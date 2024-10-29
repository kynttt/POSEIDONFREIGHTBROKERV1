import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { searchFileFolder } from "../../lib/apiCalls";
import { Center, Flex, Loader } from "@mantine/core";
import FolderTile from "./components/FolderTile";
import FileTile from "./components/FileTile";

export default function DocumentsSearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchQuery = queryParams.get("q");

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["searchDocuments", searchQuery],
    enabled: !!searchQuery,
    queryFn: () => searchFileFolder(searchQuery!),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Center h="100%">
          <Loader />
        </Center>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full">
        <Center h="100%">
          <p>{error?.message}</p>
        </Center>
      </div>
    );
  }

  if (data) {
    return (
      <Flex gap={8} wrap={"wrap"}>
        {data.map((item) => {
          if (item.type === "folder") {
            return (
              <FolderTile
                key={item.id}
                folder={item}
                queryKey={["searchDocuments", searchQuery ?? ""]}
              />
            );
          } else {
            return (
              <FileTile
                key={item.id}
                file={item}
                queryKey={["searchDocuments", searchQuery ?? ""]}
              />
            );
          }
        })}
      </Flex>
    );
  }
}
