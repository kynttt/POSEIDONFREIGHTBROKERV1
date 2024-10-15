import axios, { AxiosProgressEvent } from "axios";
import axiosInstance from "./axiosInstance";
import {
  Booking,
  BookingData,
  GetPriceMileData,
  GetPriceMileResponse,
  Invoice,
  LoginResponse,
  LogoutResponse,
  NotificationSchema,
  PhoneOtpRequestResponse,
  BookingPaymentIntentParams,
  Quote,
  RegisterFormData,
  StripeClientSecret,
  TruckCatalog,
  User,
  PhoneOtpVerifyData,
  PhoneOtpRequestData,
  PhoneOtpVerifyResponse,
  FolderSchema,
  FileSchema,
  CreateFolderData,
  DeleteFileData,
  DeleteResponse,
  DeleteFolderData,
  SearchFileFolderResponse,
  BillOfLadingSchema,
  AccountCompletionData,
  AccountCompletionResponse,
  BookingConfirmData,
  BookingInvoiceCreateResponse,
  BookingUpdateStatusData,
  BookingUpdateData,
} from "../utils/types";

//Users

// Get Specific User
export const getUser = async () => {
  const response = await axiosInstance.get(`/account/`);
  const data = response.data;
  const user = data.data as User;

  return user;
};

// Get All Users
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(`/users/`);
    return response.data; // Adjust based on your actual data structure
  } catch (error) {
    console.error("Error fetching shippers:", error);
    throw error;
  }
};

// Login
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/account/login`, {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post(`/account/logout`);
  return response.data;
};

// Register
export const registerUser = async (formData: RegisterFormData) => {
  const response = await axiosInstance.post(`/account/register`, {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    address: formData.address,
    postalCode: formData.postalCode,
    phone: formData.phone,
    companyName: formData.companyName,
    companyPosition: formData.companyPosition,
    role: "user",
  });
  return response.data as LoginResponse;
};

export const accountCompletion = async (data: AccountCompletionData) => {
  const response = await axiosInstance.post(`/account/complete-details`, data);
  return response.data as AccountCompletionResponse;
};

// Quotes
// Fetch all quotes
// ! This is temporary disable because there is no endpoint for this
// export const fetchDeliveryLocations = async (
//   pickUpLocation: string,
//   token: string
// ) => {
//   const response = await axios.get(
//     `/delivery-locations?pickUpLocation=${pickUpLocation}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// Update Password
export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await axiosInstance.patch(`/account/update-password`, {
      userId,
      currentPassword, // Ensure this is included if your API requires it
      newPassword,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

// Update User Details
export const updateUserDetails = async (
  userId: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  postalCode: string,
  companyName: string,
  companyPosition: string
) => {
  try {
    const response = await axiosInstance.patch(`/account/update-details`, {
      userId,
      name,
      email,
      phone,
      address,
      postalCode,
      companyName,
      companyPosition,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

// Get Current User Data
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`/account/`, {
      withCredentials: true, // Include cookies in the request
    });
    return (
      response.data as {
        data: User;
      }
    ).data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

export const fetchQuotes = async () => {
  const response = await axiosInstance.get(`/quotes/`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return response.data.map((quote: Quote) => ({
    id: quote.id,
    pickUp: quote.origin,
    drop: quote.destination,
    maxWeight: quote.maxWeight,
    companyName: quote.companyName,
    trailerType: quote.trailerType,
    distance: quote.distance,
    trailerSize: quote.trailerSize,
    loadPrice: quote.price,
    commodity: quote.commodity,
    pickupDate: quote.pickupDate,
    onBookLoadClick: () => {
      /* Handle book load click */
    },
  }));
};

// Create quote
export const createQuote = async (quoteDetails: Quote) => {
  try {
    const response = await axiosInstance.post(`/quotes/`, quoteDetails, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Quote;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle the error as an instance of Error
      console.error("Error creating quote:", error.message);
    } else {
      // Handle the case where error is not an instance of Error
      console.error("Unknown error occurred while creating quote");
    }
    throw error;
  }
};

// Fetch quote details by ID
export const fetchQuoteDetails = async (quoteId: string | null) => {
  if (!quoteId) {
    throw new Error("No quote ID provided");
  }

  const response = await axiosInstance.get(`/quotes/${quoteId}`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data as Quote;
};

// Get Quotes based on user
export const listUserQuotes = async ({
  queries,
}: {
  queries: string | undefined;
}) => {
  // Base URL
  let url = `/quotes/user?orderDesc=createdAt`;

  // Append queries if defined
  if (queries) {
    url += `&${queries}`;
  }

  // Make the API call
  const response = await axiosInstance.get(url);

  return response.data as Quote[];
};

// Invoice
// Create invoice
export const createInvoice = async (invoiceData: Invoice) => {
  try {
    const response = await axiosInstance.post(`/invoices/`, invoiceData, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

// Fetch User Invoices
export const fetchUserInvoices = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/invoices/user/${userId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

export const createBookQuote = async (bookingData: BookingData) => {
  try {
    const response = await axiosInstance.post(
      `/bookings/`,
      bookingData
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );

    // console.log('Response:', response.data);
    return response.data as Booking;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error booking:", error.message);
    } else {
      console.error("Unknown error occurred while booking");
    }
    throw error;
  }
};

// Fetch User's Booking
export const fetchUserBookings = async () => {
  const response = await axiosInstance.get(
    `/bookings/user`
    //    {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return response.data as Booking[];
};

export const fetchUserBookingById = async (id: string) => {
  if (!id) {
    throw new Error("No user ID provided");
  }

  try {
    const response = await axiosInstance.get(`/bookings/user/${id}`);

    // Check if response is successful
    if (response.status === 200) {
      // Map the response data to match the expected structure
      return response.data.map((booking: Booking) => {
        const quote = booking.quote as Quote;
        return {
          id: booking.id,
          origin: quote.origin,
          destination: quote.destination,
          price: quote.price,
          pickupDate: quote.pickupDate,
          deliveryDate: quote.deliveryDate,
          pickupTime: booking.pickupTime,
          deliveryTime: booking.deliveryTime,
          carrier: booking.carrier,
          status: booking.status,
          bolNumber: booking.bolNumber,
        };
      });
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    // Handle errors from the API call or other unexpected issues
    console.error("Error fetching user bookings:", error);
    throw new Error("Failed to fetch user bookings");
  }
};

export const createBookingPaymentIntent = async ({
  amount,
  currency,
  booking,
}: BookingPaymentIntentParams) => {
  try {
    console.log("Booking:", booking);
    const response = await axiosInstance.post(
      `/payments/booking-payment-intent`,
      {
        amount,
        currency,
        booking,
      }
    );
    return response.data as StripeClientSecret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const createBookingInvoice = async (bookingId: string) => {
  try {
    const response = await axiosInstance.post(
      `/payments/create-booking-invoice/${bookingId}`
    );
    return response.data as BookingInvoiceCreateResponse;
  } catch (error) {
    console.error("Error creating booking invoice:", error);
    throw error;
  }
};
export const bookingConfirm = async ({ bookingId }: BookingConfirmData) => {
  try {
    const response = await axiosInstance.patch(
      `/bookings/${bookingId}/confirm`
    );
    return response.data as Booking;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

// Fetch all bookings
export const fetchBookings = async () => {
  const response = await axiosInstance.get(`/bookings/`);

  return response.data as Booking[];
};

export const updateBookingDetails = async (
  id: string,
  data: BookingUpdateData
) => {
  try {
    const response = await axiosInstance.put(`/bookings/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update booking details"
      );
    } else {
      throw new Error("Failed to update booking details");
    }
  }
};

export const updateBookingStatus = async (
  id: string,
  status: BookingUpdateStatusData
) => {
  try {
    const response = await axiosInstance.patch(
      `/bookings/${id}/status`,
      status,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    return (
      response.data as {
        data: Booking;
      }
    ).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update booking status"
      );
    } else {
      throw new Error("Failed to update booking status");
    }
  }
};

// Fetch a specific booking by ID
export const fetchBookingById = async (id: string) => {
  // const token = localStorage.getItem("authToken");
  // if (!token) {
  //   throw new Error("No token found in localStorage");
  // }

  try {
    const response = await axiosInstance.get(`/bookings/${id}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // const booking = response.data as Booking;
    // const quote = booking.quote as Quote;

    // return {
    //   id: booking.id,
    //   origin: quote.origin,
    //   price: quote.price,
    //   status: booking.status,
    //   destination: quote.destination,
    //   maxWeight: quote.maxWeight,
    //   companyName: quote.companyName,
    //   trailerType: quote.trailerType,
    //   distance: quote.distance,
    //   trailerSize: quote.trailerSize,
    //   commodity: quote.commodity,
    //   pickupDate: quote.pickupDate,
    //   deliveryDate: quote.deliveryDate, // Assuming you need deliveryDate too
    //   notes: quote.notes, // Assuming notes are part of booking
    //   packaging: quote.packaging, // Assuming packaging is part of booking
    //   carrier: booking.carrier, // Assuming carrier is part of booking
    //   driver: booking.driver,
    //   // bol: booking.bol, // Assuming bol is part of booking
    //   pickupTime: booking.pickupTime,
    //   deliveryTime: booking.deliveryTime,
    // };

    return response.data as Booking;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

// Create Bill Of Lading Entry
// Example implementation of uploadPdf function
export const uploadPdf = async (
  pdfBlob: Blob,
  userId: string,
  bookingId: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", pdfBlob, `bol-${bookingId}.pdf`); // Append the file to FormData

    // formData.append("userId", userId);
    // formData.append("bookingId", bookingId);

    // const response = await axiosInstance.post("/billOfLading/", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    const file = await uploadFile(formData, ".$billofLading");
    const response = await axiosInstance.post("/billOfLading/", {
      userId,
      bookingId,
      fileId: file.id,
    });

    return response; // Ensure this is returned
  } catch (error) {
    console.error("Upload PDF error:", error);
    throw error;
  }
};

// Fetch Bill of Lading by Booking ID
export const fetchBillOfLadingByBookingId = async (bookingId: string) => {
  try {
    const response = await axiosInstance.get(
      `/billOfLading/by-booking/${bookingId}`
    );
    return response.data as BillOfLadingSchema;
  } catch (error) {
    console.error("Error fetching Bill of Lading by booking ID:", error);
    throw error; // Ensure the error is thrown to be handled by the caller
  }
};

// Fetch Bill Of Lading Entries by User ID
export const fetchBillOfLadingsByUserId = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/billOfLading/${userId}`);
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching Bill of Lading documents:", error);
    throw error; // Ensure errors are thrown for the caller to handle
  }
};

export const listTrucks = async () => {
  const response = await axiosInstance.get(`/trucks`);

  return response.data as TruckCatalog[];
};

export const getTruck = async (truckId: string) => {
  const response = await axiosInstance.get(`/trucks/${truckId}`);

  return response.data as TruckCatalog;
};

export const createTruck = async (truck: TruckCatalog) => {
  const response = await axiosInstance.post(`/trucks/`, truck);

  return response.data as TruckCatalog;
};

export const deleteTruck = async (truckId: string) => {
  await axiosInstance.delete(`/trucks/${truckId}`);
};

export const updateTruck = async (truck: TruckCatalog) => {
  const response = await axiosInstance.put(`/trucks/${truck.id!}`, truck);

  return response.data as TruckCatalog;
};

export const getPricePerMile = async ({
  truckId,
  distance,
  trailerSize,
}: GetPriceMileData) => {
  const response = await axiosInstance.post(
    `/trucks/${truckId}/price-per-mile`,
    {
      distance,
      trailerSize,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data as GetPriceMileResponse;
};

export const listNotifications = async (userId: string) => {
  const response = await axiosInstance.get(`/notifications`, {
    params: { userId },
  });
  return response.data as NotificationSchema[];
};

export const updateNotificationStatus = async (id: string, isRead: boolean) => {
  try {
    const response = await axiosInstance.patch(`/notifications/${id}`, {
      isRead,
    });
    return response.data;
  } catch (error) {
    // Handle error (log it, rethrow it, etc.)
    console.error("Error updating notification status:", error);
    throw error;
  }
};

export const phoneOtpRequest = async ({
  userId,
  phoneNumber,
}: PhoneOtpRequestData) => {
  const response = await axiosInstance.post(`/account/create-phone-otp`, {
    userId,
    phoneNumber,
  });

  return response.data as PhoneOtpRequestResponse;
};
export const phoneOtpVerify = async ({
  secret,
  otp,
  userId,
}: PhoneOtpVerifyData) => {
  const response = await axiosInstance.post(`/account/verify-phone-otp`, {
    secret,
    otp,
    userId,
  });

  return response.data as PhoneOtpVerifyResponse;
};

export const getFolder = async ({
  folderId = ".$root",
}: {
  folderId?: string;
}) => {
  const response = await axiosInstance.get(`/folders/${folderId}`);
  return response.data.data as FolderSchema;
};

export const listFolder = async ({ parentId }: { parentId?: string }) => {
  const path = parentId ? `/folders?parentId=${parentId}` : "/folders";
  const response = await axiosInstance.get(`${path}`);

  return response.data.data as FolderSchema[];
};

export const listFile = async ({ folderId }: { folderId: string }) => {
  const response = await axiosInstance.get(`/folders/${folderId}/files`);
  return response.data.data as FileSchema[];
};
export const uploadFile = async (
  formData: FormData,
  folderId: string | undefined,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  folderId = folderId || ".$root";
  const response = await axiosInstance.post(
    `/folders/${folderId}/files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }
  );

  return response.data.data as FileSchema;
};

export const deleteFile = async ({
  fileId,
  folderId = ".$root",
}: DeleteFileData) => {
  const response = await axiosInstance.delete(
    `/folders/${folderId}/files/${fileId}`
  );

  return response.data as DeleteResponse;
};

export const deleteFolder = async ({ folderId }: DeleteFolderData) => {
  const response = await axiosInstance.delete(`/folders/${folderId}`);
  return response.data as DeleteResponse;
};

export const createRootFolder = async () => {
  const response = await axiosInstance.post(`/folders?type=root`);
  return response.data as FolderSchema;
};

export const createFolder = async (data: CreateFolderData) => {
  const response = await axiosInstance.post(`/folders`, {
    name: data.name,
    parentId: data.parentId || ".$root",
  });
  return response.data as FolderSchema;
};

export const searchFileFolder = async (q: string) => {
  const response = await axiosInstance.get(`/folders/search?q=${q}`);
  return response.data.data as SearchFileFolderResponse[];
};

// Fetch profile picture from the server with cache-busting using the original URL
export const fetchProfilePicture = async (
  userId: string,
  profilePicVersion: number
) => {
  try {
    const response = await axiosInstance.get(
      `/account/${userId}/profile-picture/${profilePicVersion}`, // Append cache-busting version
      {
        responseType: "blob", // Ensure you get the image as binary data
      }
    );

    // Convert the response to an object URL that can be used in an img src
    const imageUrl = URL.createObjectURL(response.data);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return null; // Return null or handle the error as needed
  }
};

// Function to upload a profile picture
export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("profilePic", file); // Append the file to FormData

  try {
    const response = await axiosInstance.post(
      "/account/profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure it's sending a file
        },
      }
    );

    return response.data.data as User; // Return the response data, which may contain the updated profile picture URL
  } catch (error) {
    throw new Error("Failed to upload profile picture");
  }
};
