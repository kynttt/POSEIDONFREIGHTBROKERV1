export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "In Transit"
  | "Delivered"
  | "Cancelled";
export interface LoginResponse {
  token: string;
  message: string;
  data: User;
}

export interface LogoutResponse {
  message: string;
}
export interface Schema {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | User;
}
export interface User extends Schema {
  email: string;
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  companyName: string;
  role: "admin" | "user";
  password?: string;
}

export interface RegisterFormData extends User {
  password: string;
}
// Bookings
// Book a quote
export interface BookingData {
  quote: string;
  origin: string;
  destination: string;
  pickupDate: string;
  trailerType: string;
  companyName: string;
  commodity: string;
  // bolLink: string; ! This is temporarily comment because it is not include in Booking Schema
  // packaging: string; ! Not include in Booking Schema rather in Quote schema
  price: number;
}
export interface Quote extends Schema {
  origin: string;
  destination: string;
  pickupDate: Date | string;
  deliveryDate?: Date | null;
  trailerType: string;
  trailerSize: number;
  commodity: string;
  maxWeight: number;
  packaging: number | string;
  companyName: string;
  distance: string;
  price: number;
  notes?: string | null;
}

export interface Invoice extends Schema {
  quote: string | Quote;
  invoiceNumber: string;
  dateIssued?: Date | string;
  dueDate: Date | string;
  amountDue: number;
  status?: "Unpaid" | "Paid" | "Overdue";
  booking?: string[] | Booking[];
}

export interface PaymentIntentParams {
  amount: number; // Amount in the smallest currency unit (e.g., cents for USD)
  currency: string; // Currency code (e.g., 'usd')
}
export interface StripeClientSecret {
  clientSecret: string;
}

export interface Booking extends Schema {
  quote: string | Quote;
  status: BookingStatus;
  carrier?: string | null;
  driver?: string | null;
  pickupTime?: string | null;
  deliveryTime?: string | null;
}

export interface BookingCallback extends Quote {
  id: string;
  pickUp: string;
  status: BookingStatus;
  drop: string;
  onBookLoadClick: () => void;
}
export interface Pricing {
  minDistance: number;
  maxDistance?: number;
  pricePerMile: number;
}

export interface Size {
  size: number;
  pricing: Pricing[];
}

export interface TruckCatalog {
  truckType: string;
  sizes: Size[];
}
