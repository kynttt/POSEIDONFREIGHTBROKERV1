// LegalPage.tsx
import { useEffect } from "react";

import { Button, Center, Flex, Loader, Stack, Title } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../state/useAuthStore";
import {
  createRootFolder,
  getFolder,
  listFile,
  listFolder,
} from "../../lib/apiCalls";
import { FileSchema, FolderSchema } from "../../utils/types";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import queryClient from "../../lib/queryClient";
import FolderTile from "./components/FolderTile";
import FileTile from "./components/FileTile";
import { useParams } from "react-router-dom";

export default function DocumentsPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const userId = useAuthStore((state) => state.userId);

  const { data, isLoading, error, isError } = useQuery<
    FolderSchema,
    AxiosError<{ message: string }>,
    FolderSchema,
    (string | null)[]
  >({
    queryKey: ["folder", folderId || ".$root", userId],
    queryFn: () => getFolder({ folderId }),
    retry: 1,
  });

  useEffect(() => {
    if (error?.response?.status !== 404 && isError) {
      notifications.show({
        title: "Root Folder Failed",
        message: error?.response?.data.message,
        color: "red",
      });
    }
  }, [error, data, isError]);

  // useEffect(() => {
  //   queryClient.invalidateQueries({
  //     queryKey: ["folders", folderId || ".$root", userId],
  //   });
  //   queryClient.invalidateQueries({
  //     queryKey: ["files", folderId || ".$root", userId],
  //   });
  //   queryClient.invalidateQueries({
  //     queryKey: ["folder", folderId || ".$root", userId],
  //   });
  // }, [folderId, userId]);
  return (
    <div className="h-full w-full px-20 bg-light-grey py-10 rounded-lg">
      {isLoading ? (
        <Center h="100%">
          <Loader />
        </Center>
      ) : error && error?.response?.status !== 404 ? (
        <div>{JSON.stringify(error.response?.data)}</div>
      ) : data ? (
        <Response folderId={data.id!} />
      ) : (
        <NoRootFolder />
      )}
    </div>
  );
}

function NoRootFolder() {
  const { folderId } = useParams<{ folderId: string }>();
  console.log("folderId", folderId);
  const userId = useAuthStore((state) => state.userId);

  const mutation = useMutation({
    mutationFn: createRootFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folder", folderId || ".$root", userId],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      notifications.show({
        title: "Root Folder Creation Failed",
        message: error.response?.data.message,
        color: "red",
      });
    },
  });
  return (
    <Center h={"100%"}>
      <Stack className="text-center" maw={500}>
        <Title order={1}>No Root Folder</Title>
        <p className="text-slate-400">
          Your account does not have a root folder. Click the button below to
          create one.
        </p>
        <Button
          variant="light"
          loading={mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          Create Root Folder
        </Button>
      </Stack>
    </Center>
  );
}
function Response({ folderId }: { folderId: string }) {
 
  return (
    <Stack w="100%">
      <Folders />
      <Files folderId={folderId} />
    </Stack>
  );
}

function Files({ folderId }: { folderId: string }) {
  const userId = useAuthStore((state) => state.userId);
  const { data, isLoading, error } = useQuery<
    FileSchema[],
    AxiosError,
    FileSchema[],
    (string | null)[]
  >({
    queryKey: ["files", folderId || ".$root", userId],
    queryFn: () => listFile({ folderId }),
    retry: 1,
  });

  useEffect(() => {
    if (error?.response?.status !== 404 && error) {
      notifications.show({
        title: "Get Files Failed",
        message: (
          error?.response?.data as {
            message: string;
          }
        ).message,
        color: "red",
      });
    }
  }, [error, data]);

  if (!data || data.length === 0) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );
  }

  return (
    <Stack>
      <Title order={6}>Files</Title>
      <Flex w="100%" gap={8} wrap="wrap">
        {data!.map((file) => (
          <FileTile key={file.id} file={file} />
        ))}
      </Flex>
    </Stack>
  );
}

function Folders() {
  const { folderId } = useParams<{ folderId: string }>();
  const userId = useAuthStore((state) => state.userId);
  const { data, isLoading, error } = useQuery<
    FolderSchema[],
    AxiosError,
    FolderSchema[],
    (string | null)[]
  >({
    queryKey: ["folders", folderId || ".$root", userId],
    // queryKey: ["folders"],
    queryFn: () => listFolder({ parentId: folderId }),
    retry: 1,
  });

  useEffect(() => {
    // console.log("response", data?.data);
    if (error?.response?.status !== 404 && error) {
      notifications.show({
        title: "Get Folders Failed",
        message: (
          error?.response?.data as {
            message: string;
          }
        ).message,
        color: "red",
      });
    }
  }, [error, data]);

  if (!data || data.length === 0) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );
  }
  return (
    <Stack>
      <Title order={6}>Folders</Title>
      <Flex w="100%" gap={8} wrap="wrap" className="mb-12">
        {data!.map((folder) => (
          <FolderTile key={folder.id} folder={folder} folderId={folderId} />
        ))}
      </Flex>
    </Stack>
  );
}

// export default function DocumentsPage() {
//   const [isListView, setIsListView] = useState(true); // State to track view mode
//   const [showActionsIndex, setShowActionsIndex] = useState<number | null>(null); // State to track which ellipsis was clicked

//   const folders: string[] = foldersData;
//   const files = filesData;

//   const handleEllipsisClick = (index: number) => {
//     setShowActionsIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   const handleActionClick = (action: string, index: number) => {
//     console.log(`Action '${action}' clicked for index ${index}`);
//     setShowActionsIndex(null);
//     // Implement action logic here
//   };

//   const handleListViewClick = () => {
//     setShowActionsIndex(null);
//     setIsListView(true);
//   };

//   const handleGridViewClick = () => {
//     setShowActionsIndex(null);
//     setIsListView(false);
//   };

//   return (
//     <div className="flex h-full bg-white">
//       <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start mt-4 mb-4 px-4 sm:px-6 md:px-12">
//           <div className="mb-4 md:mb-8 md:ml-15">
//             <h2 className="text-sm font-light text-secondary">
//               Hello Legal Team,
//             </h2>
//             <h2 className="text-xl font-medium text-secondary">Good Morning</h2>
//           </div>

//           <div className="relative w-full md:w-auto mt-4 md:mt-0">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
//               <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search File"
//               className="w-full md:w-64 text-sm font-normal border rounded py-3 px-4 pl-8 focus:outline-none focus:shadow-outline"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end items-start mt-4 px-4 sm:px-6 md:px-12 mb-6">
//           <div className="flex items-end gap-4">
//             <button className="text-sm font-normal text-gray-400 flex items-end gap-2 border border-gray-400 rounded px-3 py-2">
//               <FontAwesomeIcon icon={faArrowUpFromBracket} />
//               Upload Files
//             </button>
//             <button className="text-sm text-gray-400 flex items-end gap-2 border border-gray-400 rounded px-2 py-2 font-normal">
//               <FontAwesomeIcon icon={faPlus} />
//               Create New
//             </button>
//           </div>
//         </div>

//         <div className="mb-12 px-4 sm:px-6 md:px-12">
//           <h3 className="text-xl font-medium text-secondary mb-8">
//             All Folders
//           </h3>
//           {/* Conditionally render scrollable div on smaller screens */}
//           <div className="flex md:flex-wrap gap-4 md:justify-center overflow-x-auto md:overflow-visible">
//             {folders.map((folder, index) => (
//               <Folder key={index} name={folder} />
//             ))}
//           </div>
//         </div>

//         <div className="mb-8 px-4 sm:px-6 md:px-12">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-medium text-secondary mb-6">
//               Recent Files
//             </h3>
//             <div className="flex items-center justify-between gap-4">
//               <FontAwesomeIcon
//                 icon={faList}
//                 className={`text-gray-500 hover:text-blue-700 cursor-pointer text-xl ${
//                   isListView ? "text-blue-700" : ""
//                 }`}
//                 onClick={handleListViewClick}
//               />
//               <FontAwesomeIcon
//                 icon={faTh}
//                 className={`text-gray-500 hover:text-blue-700 cursor-pointer text-xl ${
//                   !isListView ? "text-blue-700" : ""
//                 }`}
//                 onClick={handleGridViewClick}
//               />
//             </div>
//           </div>

//           {isListView ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-3 px-4 text-left text-base text-primary font-semibold">
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-2"
//                         />
//                         <span>Type</span>
//                       </div>
//                     </th>
//                     <th className="py-3 px-4 text-left text-base text-primary font-semibold">
//                       File Name
//                     </th>
//                     <th className="py-3 px-4 text-left text-base text-primary font-semibold">
//                       File Size
//                     </th>
//                     <th className="py-3 px-4 text-left text-base text-primary font-semibold">
//                       Date
//                     </th>
//                     <th className="py-3 px-4 text-left text-base text-primary font-semibold">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {files.map((file, index) => (
//                     <tr
//                       key={index}
//                       className=" hover:text-secondary transition-colors duration-300 text-center"
//                     >
//                       <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="checkbox"
//                             className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-2"
//                           />
//                           <span>{file.type}</span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
//                         {file.name}
//                       </td>
//                       <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
//                         {file.size}
//                       </td>
//                       <td className="py-3 px-4 text-left text-sm font-normal text-secondary">
//                         {file.date}
//                       </td>
//                       <td className="py-2 px-10 text-left text-sm font-normal text-secondary relative">
//                         <FontAwesomeIcon
//                           icon={faEllipsisV}
//                           className="mt-1 text-xl mb-2 text-gray-500 hover:text-secondary cursor-pointer"
//                           onClick={() => handleEllipsisClick(index)}
//                         />
//                         {showActionsIndex === index && (
//                           <div className="absolute -top-14 right-20 mt-2 -top-12 bg-white border border-gray-300 shadow-lg py-1 px-2 rounded z-20 text-base font-normal">
//                             <p
//                               className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                               onClick={() => handleActionClick("view", index)}
//                             >
//                               View
//                             </p>
//                             <p
//                               className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                               onClick={() =>
//                                 handleActionClick("download", index)
//                               }
//                             >
//                               Download
//                             </p>
//                             <p
//                               className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                               onClick={() => handleActionClick("print", index)}
//                             >
//                               Print
//                             </p>
//                             <p
//                               className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                               onClick={() => handleActionClick("delete", index)}
//                             >
//                               Delete
//                             </p>
//                             <p
//                               className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                               onClick={() => handleActionClick("rename", index)}
//                             >
//                               Rename
//                             </p>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="flex flex-wrap gap-4">
//               {files.map((file, index) => (
//                 <div
//                   key={index}
//                   className="relative flex-shrink-0 bg-white border rounded-lg p-4 w-40 hover:text-secondary transition-colors duration-300"
//                 >
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       className="h-5 w-5 text-blue-600 border border-gray-400 focus:ring-blue-500 mr-2"
//                     />
//                     <span>{file.type}</span>
//                   </div>
//                   <div className="text-sm font-normal text-secondary mt-2">
//                     <p className="font-semibold">{file.name}</p>
//                     <p>{file.size}</p>
//                     <p>{file.date}</p>
//                   </div>
//                   <FontAwesomeIcon
//                     icon={faEllipsisV}
//                     className="absolute top-2 right-2 text-xl text-gray-500 hover:text-secondary cursor-pointer z-10"
//                     onClick={() => handleEllipsisClick(index)}
//                   />
//                   {showActionsIndex === index && (
//                     <div className="absolute top-5 right-0 mt-2 bg-white border border-gray-300 shadow-lg py-1 px-2 rounded z-20 text-base font-normal">
//                       <p
//                         className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                         onClick={() => handleActionClick("view", index)}
//                       >
//                         View
//                       </p>
//                       <p
//                         className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                         onClick={() => handleActionClick("download", index)}
//                       >
//                         Download
//                       </p>
//                       <p
//                         className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                         onClick={() => handleActionClick("print", index)}
//                       >
//                         Print
//                       </p>
//                       <p
//                         className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                         onClick={() => handleActionClick("delete", index)}
//                       >
//                         Delete
//                       </p>
//                       <p
//                         className="text-gray-500 hover:text-blue-500 cursor-pointer"
//                         onClick={() => handleActionClick("rename", index)}
//                       >
//                         Rename
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
