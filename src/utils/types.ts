export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

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
