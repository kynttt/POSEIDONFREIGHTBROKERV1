import axios from "axios";
import { Booking, Invoice, Quote, RegisterFormData } from "../utils/types";

// Set the base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface PaymentIntentParams {
  amount: number; // Amount in the smallest currency unit (e.g., cents for USD)
  currency: string; // Currency code (e.g., 'usd')
}

//Users
// Login
interface LoginResponse {
  token: string;
}

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/account/`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/account/login`, {
    email,
    password,
  });
  return response.data;
};

// Register
export const registerUser = async (formData: RegisterFormData) => {
  const response = await axios.post(`${API_BASE_URL}/account/register`, {
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
//     `${API_BASE_URL}/delivery-locations?pickUpLocation=${pickUpLocation}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

export const fetchQuotes = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/quotes/`, {
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

  const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
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
export const createQuote = async (quoteDetails: Quote, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quotes/`, quoteDetails, {
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
export const fetchQuoteDetails = async (quoteId: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quotes/${quoteId}`, {
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
export const createInvoice = async (invoiceData: Invoice, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/invoices/`,
      invoiceData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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
export const fetchUserInvoices = async (userId: string, token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/invoices/user/${userId}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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

export const bookQuote = async (bookingData: BookingData, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings/`,
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
  const response = await axios.get(
    `${API_BASE_URL}/bookings/user`
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
    const response = await axios.post(
      
      `${API_BASE_URL}/payments/create-payment-intent`,
     
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
export const fetchBookings = async (token: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/bookings/`
    //    {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return response.data.map((booking: any) => {
    const quote = booking.quote;
    return {
      id: booking._id,
      pickUp: quote.origin,
      price: quote.price,
      status: booking.status,
      drop: quote.destination,
      maxWeight: quote.maxWeight,
      companyName: quote.companyName,
      trailerType: quote.trailerType,
      distance: quote.distance,
      trailerSize: quote.trailerSize,
      commodity: quote.commodity,
      pickupDate: quote.pickupDate,
      onBookLoadClick: () => {
        /* Handle book load click */
      },
    };
  });
};

// Update booking details by quoteID
interface BookingUpdate {
  origin?: string;
  price?: number;
  destination?: string;
  maxWeight?: number;
  companyName?: string;
  trailerType?: string;
  distance?: number;
  trailerSize?: string;
  commodity?: string;
  pickupDate?: string;
  deliveryDate?: string;
  notes?: string;
  packaging?: string;
  carrier?: string;
  driver?: string;
  bol?: string;
  status?: string; // Add status field
  pickupTime?: string;
  deliveryTime?: string;
}

export const updateBookingDetails = async (
  
  id: string,
 
  updatedData: BookingUpdate

) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(updatedData),
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
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`, {
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
