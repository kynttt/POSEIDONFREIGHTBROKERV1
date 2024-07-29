import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Login
interface LoginResponse {
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
  return response.data;
};

// Register
export const registerUser = async (formData: any) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    address: formData.address,
    postalCode: formData.postalCode,
    phone: formData.phone,
    companyName: formData.companyName,
    role: 'user', // Assuming a default role
  });
  return response.data;
};

// LoadBoard
export const fetchDeliveryLocations = async (pickUpLocation: string, token: string) => {
  const response = await axios.get(`${API_BASE_URL}/delivery-locations?pickUpLocation=${pickUpLocation}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchQuotes = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/quotes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.map((quote: any) => ({
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
    onBookLoadClick: () => { /* Handle book load click */ },
  }));
};

// ShipperDashboard
export const fetchUserBookings = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/bookings/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ShipperDetails
export const fetchBookingDetails = async (id: string) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token found in localStorage');
  }

  const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch booking details');
  }

  const data = await response.json();
  return data;
};

// Create quote
export const createQuote = async (quoteDetails: any, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quotes/`, quoteDetails, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle the error as an instance of Error
      console.error('Error creating quote:', error.message);
    } else {
      // Handle the case where error is not an instance of Error
      console.error('Unknown error occurred while creating quote');
    }
    throw error;
  }
};


// Book a quote
export const bookQuote = async (quoteId: string, token: string) => {
  const bookingData = {
      quote: quoteId,
  };

  try {
      const response = await axios.post(`${API_BASE_URL}/bookings/`, bookingData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error: unknown) {
      if (error instanceof Error) {
          console.error('Error booking:', error.message);
      } else {
          console.error('Unknown error occurred while booking');
      }
      throw error;
  }
};

