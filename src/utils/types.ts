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

export interface Point {
  lng: number;
  lat: number;
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
  profilePicUrl?: string;
  profilePicVersion?: number;
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
  // bolNumber: string;
  unit: string;
  origin: string;
  destination: string;
  pickupDate: Date | string;
  deliveryDate?: Date | null;
  trailerType: string;
  trailerSize: number;
  commodity: string;
  maxWeight: number;
  packaging: string;
  companyName: string;
  distance: number;
  price: number;
  notes?: string | null;
  routeCoordinates: {
    type: "LineString";
    coordinates: [number, number][];
  };
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
  loadNumber: string;
  trailerNumber: string;
  bolNumber: string;
  billOfLading: unknown;
  quote: Quote;
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

export interface TruckCatalog extends Schema {
  truckType: string;
  sizes: Size[];
}
export interface PriceError {
  errors: string[];
  invalidIndices: Record<number, number[]>;
}

export interface GetPriceMileData {
  truckId: string;
  distance: number;
  trailerSize: number;
}
export interface GetPriceMileResponse {
  pricePerMile: number;
}

interface IMetadata {
  key: string;
  value: string | number | boolean;
}
export interface NotificationSchema extends Schema {
  bookingId?: string;
  title: string;
  type?: "booking" | "quote" | "invoice" | "payment";
  message: string;
  mediaUrl?: string;
  metadata?: IMetadata[];
  user?: string | User;
  isRead: boolean;
  isDeleted?: boolean; // Make this optional if not always present
}

export interface PhoneOtpRequestData {
  userId: string;
  phoneNumber: string;
}

export interface PhoneOtpRequestResponse {
  message: string;
  data: {
    _id: string;
    secret: string;
  };
}

export interface PhoneOtpVerifyData {
  userId: string;
  otp: string;
  // secret: string;
}

export interface PhoneOtpVerifyResponse {
  message: string;
}
interface IAccessControl {
  user: string | User;
  role: "viewer" | "editor";
}

export interface FileHandlerSchema extends Schema {
  name: string;
  createdBy: string | User;
  metadata: Map<string, unknown>;
  accessControl: IAccessControl[];
}
export interface FolderSchema extends FileHandlerSchema {
  parent: string | null;
  files?: string[];
  type: "folder";
}

export interface FileSchema extends FileHandlerSchema {
  folder: string;
  size: number;
  mimeType: string;
  type: "file";
}

export type SearchFileFolderResponse = FolderSchema | FileSchema;

export interface DeleteResponse {
  message: string;
}
export interface CreateFolderData {
  name?: string;
  parentId?: string;
}

export interface DeleteFileData {
  fileId: string;
  folderId?: string;
}
export interface DeleteFolderData {
  folderId: string;
}

export interface BillOfLadingSchema extends Schema {
  file: FileSchema;
  createdBy: string | User;
}
