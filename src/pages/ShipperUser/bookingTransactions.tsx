import { useMutation, useQuery } from "@tanstack/react-query";
import { createBookingInvoice, fetchUserBookings } from "../../lib/apiCalls";
import { BookingInvoiceCreateResponse } from "../../utils/types";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import queryClient from "../../lib/queryClient";
import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";

export default function ShipperUserBookingTransactions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings-transactions"],
    queryFn: fetchUserBookings,
  });

  const createInvoiceMutation = useMutation<
    BookingInvoiceCreateResponse,
    AxiosError,
    string
  >({
    mutationFn: createBookingInvoice,
    onSuccess: () => {
      if (data) {
        notifications.show({
          title: "Invoice generated successfully",
          message: "You can download the invoice now.",
          color: "green",
        });

        queryClient.invalidateQueries({ queryKey: ["bookings-transactions"] });
      }
    },
  });

  const handleDownloadInvoice = (invoiceUrl: string | null | undefined) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
    } else {
      alert("Invoice not available for this booking.");
    }
  };

  const handleGenerateInvoice = (bookingId: string) => {
    createInvoiceMutation.mutate(bookingId);
  };

  useEffect(() => {
    if (data) {
      data.forEach((booking) => {
        if (!booking.invoiceUrl) {
          if (booking._id) {
            handleGenerateInvoice(booking._id);
          }
        }
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading bookings</div>;
  }
  return (
    <div className="p-10">
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
        <LoadingOverlay visible={createInvoiceMutation.isPending} />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                BOL Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.bolNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(booking.createdAt!).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {booking.invoiceUrl ? (
                    <button
                      onClick={() => handleDownloadInvoice(booking.invoiceUrl)}
                      disabled={!booking.invoiceUrl}
                      className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      View Invoice
                    </button>
                  ) : (
                    <button
                      onClick={() => handleGenerateInvoice(booking._id!)}
                      disabled={!!booking.invoiceUrl}
                      className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Generate Invoice
                    </button>
                  )}
                </td>
              </tr>
            )) ?? "No bookings found"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "In Transit":
      return "bg-blue-100 text-blue-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Confirmed":
      return "bg-purple-100 text-purple-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
