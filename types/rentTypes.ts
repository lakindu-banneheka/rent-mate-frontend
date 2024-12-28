import { DeliveryOptions } from "./itemTypes";

export interface Rent {
  id: string;
  userId: string; // Customer ID
  lenderId: string; // Lender ID (owner of the item)
  itemId: string; // ID of the rented item
  startDate: Date; // Rental start date
  endDate: Date; // Rental end date
  deliveryOption: DeliveryOptions; // Delivery option selected by the customer
  itemCost: number; // Cost per item
  totalCost: number; // Total cost of the rental (including fees, etc.)
  paymentStatus: PaymentStatus; // Current payment status
  rentStatus: RentStatus; // Current rental status
  itemReturnedDate?: Date; // Date the item was returned (optional)
  overDueFee?: number; // Fee for overdue returns (optional)
  quantity: number; // Number of items rented
  billingDetails: BillingDetails; // Billing details of the customer
  createdAt: Date; // Record creation timestamp
  updatedAt: Date; // Record update timestamp
}

export enum RentStatus {
  RESERVED = "reserved", // Item is reserved for the customer
  PAID = "paid", // Item is reserved and payment is completed
  OUT_FOR_DELIVERY = "out_for_delivery", // Item is on the way to the customer
  WITH_CUSTOMER = "with_customer", // Customer has received the item and is using it
  RETURNED = "returned", // Item has been returned by the customer
  CANCELED = "canceled", // Reservation or order has been canceled
}

export enum PaymentStatus {
  PENDING = "pending", // Payment is yet to be made or processed
  SUCCESS = "success", // Payment has been successfully completed
  FAILED = "failed", // Payment attempt was unsuccessful
  CANCELED = "canceled", // Payment process was canceled by the user or system
  REFUNDED = "refunded", // Payment was refunded to the customer
}

export interface RentState {
  rents: Rent[];
  selectedRent: Rent | null;
  newRent:
    | Omit<
        Rent,
        "id" | "createdAt" | "updatedAt" | "billingDetails" | "deliveryOption"
      >
    | Omit<Rent, "id" | "createdAt" | "updatedAt">
    | null;
  loading: boolean;
  error: string | null;
}

export interface BillingDetails {
  firstName: string;
  lastName: string;
  company?: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
}

type NewRent = Omit<Rent, "id" | "createdAt" | "updatedAt">;

export function isNewRentType(obj: any): obj is NewRent {
  return (
    (typeof obj === "object" && obj !== null && "startDate" in obj) ||
    (typeof obj.startDate === "string" && "endDate" in obj) ||
    (typeof obj.endDate === "string" &&
      // typeof obj.startDate === "string" &&
      // typeof obj.endDate === "string" &&
      typeof obj.itemCost === "number" &&
      typeof obj.lenderId === "string" &&
      typeof obj.paymentStatus === "string" &&
      typeof obj.quantity === "number" &&
      typeof obj.rentStatus === "string" &&
      typeof obj.totalCost === "number" &&
      typeof obj.userId === "string")
  );
}
