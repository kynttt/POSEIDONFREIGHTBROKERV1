import axios from 'axios';


// Login
interface LoginResponse {
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  return response.data;
};

// Register
export const registerUser = async (formData: any) => {
    const response = await axios.post('http://localhost:5000/api/users/register', {
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
const API_BASE_URL = 'http://localhost:5000/api';

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
  
    const response = await fetch(`http://localhost:5000/api/quotes/${id}`, {
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