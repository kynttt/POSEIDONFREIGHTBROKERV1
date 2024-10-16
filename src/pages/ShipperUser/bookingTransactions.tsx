import { useQuery } from "@tanstack/react-query";
import { fetchUserBookings, getBookingInvoice } from "../../lib/apiCalls";
import { toBookStatusTitle } from "../../components/googleMap/utils";
import { Booking } from "../../utils/types";
import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function ShipperUserBookingTransactions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings-transactions"],
    queryFn: fetchUserBookings,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading bookings</div>;
  }
  return (
    <div className="p-10">
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
        {/* <LoadingOverlay visible={createInvoiceMutation.isPending} /> */}
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
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.bolNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {toBookStatusTitle(booking.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(booking.createdAt!).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* {booking.invoiceUrl ? (
                    <button
                      onClick={() => handleDownloadInvoice(booking.invoiceUrl)}
                      disabled={!booking.invoiceUrl}
                      className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      View Invoice
                    </button>
                  ) : (
                    <button
                      onClick={() => handleGenerateInvoice(booking.id!)}
                      disabled={!!booking.invoiceUrl}
                      className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Generate Invoice
                    </button> */}
                  {/* )} */}
                  <BookingAction booking={booking} />
                </td>
              </tr>
            )) ?? "No bookings found"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingAction({ booking }: { booking: Booking }) {
  const navigate = useNavigate();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`booking-actions-${booking.id}`],
    queryFn: () => getBookingInvoice(booking.id!),
    enabled: !["waitingToBeConfirmed", "failed", "void"].includes(
      booking.paymentStatus
    ),
  });
  if (isLoading) {
    return (
      <div className="text-gray-200   disabled:text-gray-400 disabled:cursor-not-allowed">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed">
        <Tooltip
          label={`${error?.message || "Something went wrong"}`}
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

  const onHandle = () => {
    console.log(data);
    if (!data?.hosted_invoice_url) {
      return;
    }
    window.open(data.hosted_invoice_url, "_blank");
  };

  return (
    <>
      {["waitingToBeConfirmed", "pending"].includes(booking.paymentStatus) && (
        <Tooltip
          label="Waiting to be confirmed"
          position="top"
          disabled={booking.paymentStatus !== "waitingToBeConfirmed"}
        >
          <button
            className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={
              booking.paymentStatus === "failed" ||
              booking.paymentStatus === "waitingToBeConfirmed"
            }
            onClick={() => navigate(`/booking-payment?bookingId=${booking.id}`)}
          >
            Pay Now
          </button>
        </Tooltip>
      )}
      {booking.paymentStatus === "paid" && (
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
