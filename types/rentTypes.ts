import { DeliveryOptions } from "./itemTypes";

export interface Rent {
    id: string; 
    userId: string; // Customer ID
    lenderId: string; // Lender ID (owner of the item)
    itemId: string; // ID of the rented item
    startDate: Date; // Rental start date
    endDate: Date; // Rental end date
    deliveryOption: DeliveryOptions; 
    itemCost: number; // Cost per item
    totalCost: number; // Total cost of the rental (including fees, etc.)
    paymentStatus: PaymentStatus; // Current payment status
    rentStatus: RentStatus; // Current rental status
    itemReturnedDate?: Date; // Date the item was returned (optional)
    overDueFee?: number; // Fee for overdue returns (optional)
    quantity: number; // Number of items rented
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
    loading: boolean;
    error: string | null;
}