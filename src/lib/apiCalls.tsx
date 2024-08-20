import axios from "axios";
import axiosInstance from "./axiosInstance";
import {
  Booking,
  Invoice,
  LoginResponse,
  LogoutResponse,
  Quote,
  RegisterFormData,
} from "../utils/types";

interface PaymentIntentParams {
  amount: number; // Amount in the smallest currency unit (e.g., cents for USD)
  currency: string; // Currency code (e.g., 'usd')
}

//Users
// Login

export const getUser = async () => {
  const response = await axiosInstance.get(`/account/`);
  const data = response.data;
  return {
    ...data.data,
  };
};

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

// fetch quote using quoteID
export const fetchBookingDetails = async (id: string) => {
  // const token = localStorage.getItem("authToken");
  // if (!token) {
  //   throw new Error("No token found in localStorage");
  // }

  const response = await fetch(`/quotes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch booking details");
  }

  const data = await response.json();
  return data;
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
export const fetchQuoteDetails = async (quoteId: string) => {
  try {
    const response = await axiosInstance.get(`/quotes/${quoteId}`, {
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

// Bookings
// Book a quote
interface BookingData {
  quote: string;
  origin: string;
  destination: string;
  pickupDate: string;
  trailerType: string;
  trailerSize: string;
  companyName: string;
  commodity: string;
  bolLink: string;
  packaging: string;
  price: number;
}

export const bookQuote = async (bookingData: BookingData) => {
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
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

// Fetch all bookings
export const fetchBookings = async () => {
  const response = await axiosInstance.get(
    `/bookings/`
    //    {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  // return response.data.map((booking: any) => {
  //   const quote = booking.quote;
  //   return {
  //     id: booking._id,
  //     pickUp: quote.origin,
  //     price: quote.price,
  //     status: booking.status,
  //     drop: quote.destination,
  //     maxWeight: quote.maxWeight,
  //     companyName: quote.companyName,
  //     trailerType: quote.trailerType,
  //     distance: quote.distance,
  //     trailerSize: quote.trailerSize,
  //     commodity: quote.commodity,
  //     pickupDate: quote.pickupDate,
  //     onBookLoadClick: () => {
  //       /* Handle book load click */
  //     },
  //   };
  // });

  return response.data as Booking[];
};


export const updateBookingDetails = async (
  id: string,
  data: Booking
) => {
  const response = await fetch(`/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update booking details");
  }

  return response.json();
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

    const response = await axios.post(
      `/billOfLading`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response; // Ensure the response object is returned correctly
  } catch (error) {
    console.error("Error saving document:", error);
    throw error; // Ensure errors are thrown for the catch block in saveSignature to handle
  }
};
