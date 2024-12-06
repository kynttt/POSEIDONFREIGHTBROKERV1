// import { useQuery } from "@tanstack/react-query";
// import { fetchUserBookings, getBookingInvoice } from "../../lib/apiCalls";
// import { toBookStatusTitle } from "../../components/googleMap/utils";
// import { Booking } from "../../utils/types";
// import { Tooltip } from "@mantine/core";
// import { useNavigate } from "react-router-dom";

// export default function ShipperUserBookingTransactions() {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["bookings-transactions"],
//     queryFn: async () => {
//       const bookings = await fetchUserBookings();
//       return bookings.sort((a: Booking, b: Booking) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (isError) {
//     return <div>Error loading bookings</div>;
//   }
//   return (
//     <div className="p-10 " style={{
//       background: `
//         radial-gradient(circle at 15% 25%, rgba(255, 99, 132, 0.2), transparent 60%),
//         radial-gradient(circle at 85% 20%, rgba(54, 162, 235, 0.7), transparent 60%),
//         radial-gradient(circle at 40% 80%, rgba(75, 192, 192, 0.3), transparent 60%),
//         radial-gradient(circle at 70% 70%, rgba(255, 206, 86, 0.3), transparent 60%),
//         radial-gradient(circle at 30% 40%, rgba(153, 102, 255, 0.3), transparent 60%)
//       `,
//     }}>
//       <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
//         {/* <LoadingOverlay visible={createInvoiceMutation.isPending} /> */}
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Reference
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Status
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Created At
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data?.map((booking) => (
//               <tr key={booking.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {booking.bookingRef}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${getStatusColor(
//                       booking.status
//                     )}`}
//                   >
//                     {toBookStatusTitle(booking.status)}{" "}
//                     {booking.paymentStatus === "refunded" && "(Refund)"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
//                   {new Date(booking.createdAt!).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   {/* {booking.invoiceUrl ? (
//                     <button
//                       onClick={() => handleDownloadInvoice(booking.invoiceUrl)}
//                       disabled={!booking.invoiceUrl}
//                       className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
//                     >
//                       View Invoice
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleGenerateInvoice(booking.id!)}
//                       disabled={!!booking.invoiceUrl}
//                       className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
//                     >
//                       Generate Invoice
//                     </button> */}
//                   {/* )} */}
//                   <BookingAction booking={booking} />
//                 </td>
//               </tr>
//             )) ?? "No bookings found"}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function BookingAction({ booking }: { booking: Booking }) {
//   const navigate = useNavigate();
//   const { data, isLoading, error, isError } = useQuery({
//     queryKey: [`booking-actions-${booking.id}`],
//     queryFn: () => getBookingInvoice(booking.id!),
//     enabled: !["waitingToBeConfirmed", "failed", "void"].includes(
//       booking.paymentStatus
//     ),
//     retry: 2,
//   });
//   if (isLoading) {
//     return (
//       <div className="text-gray-200   disabled:text-gray-400 disabled:cursor-not-allowed">
//         Loading...
//       </div>
//     );
//   }

//   const onHandle = () => {
//     console.log(data);
//     if (!data?.hosted_invoice_url) {
//       return;
//     }
//     window.open(data.hosted_invoice_url, "_blank");
//   };

//   if (isError && !["pending", "processing"].includes(booking.paymentStatus)) {
//     return (
//       <div className=" text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed">
//         <Tooltip
//           label={`${error?.message || "Something went wrong"}`}
//           position="top"
//           withArrow
//         >
//           <span className="cursor-pointer">
//             Error <i className="fas fa-info-circle"></i>
//           </span>
//         </Tooltip>
//       </div>
//     );
//   }

//   return (
//     <>
//       {booking.paymentStatus === "processing" && (
//         <div className="text-orange-600">Processing</div>
//       )}
//       {["waitingToBeConfirmed", "pending"].includes(booking.paymentStatus) && (
//         <Tooltip
//           label="Waiting to be confirmed"
//           position="top"
//           disabled={booking.paymentStatus !== "waitingToBeConfirmed"}
//         >
//           <button
//             className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
//             disabled={
//               booking.paymentStatus === "failed" ||
//               booking.paymentStatus === "waitingToBeConfirmed"
//             }
//             onClick={() =>
//               navigate(`/s/booking-payment?bookingId=${booking.id}`)
//             }
//           >
//             Pay Now
//           </button>
//         </Tooltip>
//       )}
//       {(booking.paymentStatus === "paid" ||
//         booking.paymentStatus === "refunded") && (
//         <button
//           className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
//           onClick={onHandle}
//         >
//           View Invoice
//         </button>
//       )}
//       {booking.paymentStatus === "failed" && (
//         <div className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed">
//           Canceled
//         </div>
//       )}
//     </>
//   );
// }

// function getStatusColor(status: string): string {
//   switch (status) {
//     case "delivered":
//       return "bg-green-100 text-green-800";
//     case "inTransit":
//       return "bg-blue-100 text-blue-800";
//     case "pending":
//       return "bg-yellow-100 text-yellow-800";
//     case "confirmed":
//       return "bg-purple-100 text-purple-800";
//     case "cancelled":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// }


import { useQuery } from "@tanstack/react-query";
import { fetchUserBookings, getBookingInvoice } from "../../lib/apiCalls";
import { toBookStatusTitle } from "../../components/googleMap/utils";
import { Booking } from "../../utils/types";
import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo } from "react";

export default function ShipperUserBookingTransactions() {
  const { data: originalData, isLoading, isError } = useQuery({
    queryKey: ["bookings-transactions"],
    queryFn: async () => {
      const bookings = await fetchUserBookings();
      return bookings.sort(
        (a: Booking, b: Booking) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    },
  });

  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: "ascending" | "descending" | null }>({
    key: null,
    direction: null,
  });

  // State for column-specific search
  // status is now a single string (or "All" to show all)
  const [columnSearch, setColumnSearch] = useState({
    bookingRef: "",
    status: "All",
    createdAt: "",
  });

  // Unique statuses derived from data
  const uniqueStatuses = useMemo(() => {
    if (!originalData) return [];
    const statuses = originalData.map((b) => toBookStatusTitle(b.status));
    return Array.from(new Set(statuses));
  }, [originalData]);

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Clear search filters
  const handleClearSearch = () => {
    setColumnSearch({
      bookingRef: "",
      status: "All",
      createdAt: "",
    });
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!originalData) return [];

    const filtered = originalData.filter((booking) => {
      // Filter by bookingRef
      const refMatch = columnSearch.bookingRef
        ? booking.bookingRef?.toLowerCase().includes(columnSearch.bookingRef.toLowerCase())
        : true;

      // Filter by status if not "All"
      const statusMatch =
        columnSearch.status === "All"
          ? true
          : toBookStatusTitle(booking.status) === columnSearch.status;

      // Filter by createdAt
      const dateMatch = columnSearch.createdAt
        ? new Date(booking.createdAt!)
            .toLocaleDateString()
            .toLowerCase()
            .includes(columnSearch.createdAt.toLowerCase())
        : true;

      return refMatch && statusMatch && dateMatch;
    });

    // Sort
    if (sortConfig.key) {
      return filtered.sort((a: Booking, b: Booking) => {
        const aValue = getSortableValue(a, sortConfig.key!);
        const bValue = getSortableValue(b, sortConfig.key!);

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [originalData, sortConfig, columnSearch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div
      className="p-10 "
      style={{
        background: `
        radial-gradient(circle at 15% 25%, rgba(255, 99, 132, 0.2), transparent 60%),
        radial-gradient(circle at 85% 20%, rgba(54, 162, 235, 0.7), transparent 60%),
        radial-gradient(circle at 40% 80%, rgba(75, 192, 192, 0.3), transparent 60%),
        radial-gradient(circle at 70% 70%, rgba(255, 206, 86, 0.3), transparent 60%),
        radial-gradient(circle at 30% 40%, rgba(153, 102, 255, 0.3), transparent 60%)
      `,
      }}
    >
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between">
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <SortableHeader
                label="Reference"
                columnKey="bookingRef"
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
              <SortableHeader
                label="Status"
                columnKey="status"
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
              <SortableHeader
                label="Created At"
                columnKey="createdAt"
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
              <th
                scope="col"
                className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
            <SearchRow 
              columnSearch={columnSearch} 
              setColumnSearch={setColumnSearch} 
              uniqueStatuses={uniqueStatuses} 
            />
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.bookingRef}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {toBookStatusTitle(booking.status)}{" "}
                      {booking.paymentStatus === "refunded" && "(Refund)"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {new Date(booking.createdAt!).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <BookingAction booking={booking} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortableHeader({
  label,
  columnKey,
  sortConfig,
  handleSort,
}: {
  label: string;
  columnKey: string;
  sortConfig: { key: string | null; direction: "ascending" | "descending" | null };
  handleSort: (key: string) => void;
}) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => handleSort(columnKey)}
    >
      {label}{" "}
      {sortConfig.key === columnKey
        ? sortConfig.direction === "ascending"
          ? "▲"
          : "▼"
        : ""}
    </th>
  );
}

function SearchRow({
  columnSearch,
  setColumnSearch,
  uniqueStatuses,
}: {
  columnSearch: { bookingRef: string; status: string; createdAt: string };
  setColumnSearch: React.Dispatch<
    React.SetStateAction<{ bookingRef: string; status: string; createdAt: string }>
  >;
  uniqueStatuses: string[];
}) {
  return (
    <tr>
      <td className="px-6 py-3 text-left">
        <input
          type="text"
          value={columnSearch.bookingRef}
          onChange={(e) =>
            setColumnSearch((prev) => ({ ...prev, bookingRef: e.target.value }))
          }
          placeholder="Search Reference"
          className="border p-1 w-full"
        />
      </td>
      <td className="px-6 py-3 text-left">
        <select
          value={columnSearch.status}
          onChange={(e) => setColumnSearch((prev) => ({ ...prev, status: e.target.value }))}
          className="border p-1 w-full"
        >
          <option value="All">All</option>
          {uniqueStatuses.map((statusVal) => (
            <option key={statusVal} value={statusVal}>
              {statusVal}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-3 text-left">
        <input
          type="text"
          value={columnSearch.createdAt}
          onChange={(e) =>
            setColumnSearch((prev) => ({ ...prev, createdAt: e.target.value }))
          }
          placeholder="Search Date"
          className="border p-1 w-full"
        />
      </td>
      <td className="px-6 py-3 text-left"></td>
    </tr>
  );
}

function BookingAction({ booking }: { booking: Booking }) {
  const navigate = useNavigate();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`booking-actions-${booking.id}`],
    queryFn: () => getBookingInvoice(booking.id!),
    enabled: !["waitingToBeConfirmed", "failed", "void"].includes(booking.paymentStatus),
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="text-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
        Loading...
      </div>
    );
  }

  const onHandle = () => {
    if (!data?.hosted_invoice_url) {
      return;
    }
    window.open(data.hosted_invoice_url, "_blank");
  };

  if (isError && !["pending", "processing"].includes(booking.paymentStatus)) {
    return (
      <div className="text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed">
        <Tooltip
          label={(error as Error)?.message || "Something went wrong"}
          position="top"
          withArrow
        >
          <span className="cursor-pointer">
            Error <i className="fas fa-info-circle"></i>
          </span>
        </Tooltip>
      </div>
    );
  }

  return (
    <>
      {booking.paymentStatus === "processing" && (
        <div className="text-orange-600">Processing</div>
      )}
      {["waitingToBeConfirmed", "pending"].includes(booking.paymentStatus) && (
        <Tooltip label="Waiting to be confirmed" position="top">
          <button
            className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={
              booking.paymentStatus === "failed" ||
              booking.paymentStatus === "waitingToBeConfirmed"
            }
            onClick={() => navigate(`/s/booking-payment?bookingId=${booking.id}`)}
          >
            Pay Now
          </button>
        </Tooltip>
      )}
      {(booking.paymentStatus === "paid" ||
        booking.paymentStatus === "refunded") && (
        <button
          className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={onHandle}
        >
          View Invoice
        </button>
      )}
      {booking.paymentStatus === "failed" && (
        <div className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed">
          Canceled
        </div>
      )}
    </>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "inTransit":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-purple-100 text-purple-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Helper function to get sortable values
function getSortableValue(booking: Booking, key: string): string | number {
  switch (key) {
    case "bookingRef":
      return booking.bookingRef?.toLowerCase() ?? "";
    case "status":
      return toBookStatusTitle(booking.status).toLowerCase();
    case "createdAt":
      return new Date(booking.createdAt!).getTime();
    default:
      return "";
  }
}
