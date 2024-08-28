import axios from "axios";
import axiosInstance from "./axiosInstance";
import {
  Booking,
  BookingData,
  GetPriceMileData,
  GetPriceMileResponse,
  Invoice,
  LoginResponse,
  LogoutResponse,
  PaymentIntentParams,
  Quote,
  RegisterFormData,
  StripeClientSecret,
  TruckCatalog,
  User,
} from "../utils/types";

//Users

// Get Specific User
export const getUser = async () => {
  const response = await axiosInstance.get(`/account/`);
  const data = response.data;
  const user = data.data as User;

  return {
    ...user,
  };
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
    role: "user",
  });
  return response.data;
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

export const fetchQuotes = async () => {
  const response = await axiosInstance.get(`/quotes/`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return response.data.map((quote: Quote) => ({
    id: quote._id,
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
  return response.data;
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
          id: booking._id,
          origin: quote.origin,
          destination: quote.destination,
          price: quote.price,
          pickupDate: quote.pickupDate,
          deliveryDate: quote.deliveryDate,
          pickupTime: booking.pickupTime,
          deliveryTime: booking.deliveryTime,
          carrier: booking.carrier,
          status: booking.status,
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

export const createPaymentIntent = async ({
  amount,
  currency,
}: PaymentIntentParams) => {
  try {
    const response = await axiosInstance.post(
      `/payments/create-payment-intent`,

      {
        amount,
        currency,
      }
    );
    return response.data as StripeClientSecret;
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

export const updateBookingDetails = async (id: string, data: Booking) => {
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
    //   id: booking._id,
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

export const uploadPdf = async (pdfBlob: Blob) => {
  try {
    const formData = new FormData();
    formData.append("pdfDocument", pdfBlob, "document-with-signature.pdf");

    const response = await axiosInstance.post(`/billOfLading`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response; // Ensure the response object is returned correctly
  } catch (error) {
    console.error("Error saving document:", error);
    throw error; // Ensure errors are thrown for the catch block in saveSignature to handle
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
  const response = await axiosInstance.post(`/trucks`, truck);

  return response.data as TruckCatalog;
};

export const deleteTruck = async (truckId: string) => {
  await axiosInstance.delete(`/trucks/${truckId}`);
};

export const updateTruck = async (truck: TruckCatalog) => {
  const response = await axiosInstance.put(`/trucks/${truck._id!}`, truck);

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
