import { PaymentStatus, RentStatus } from "./rentTypes";

export interface RentLog {
    id: string; 
    itemId: string; // ID of the rented item
    rentRecordId: string; // rent record ID    
    paymentStatus: PaymentStatus; // Current payment status
    rentStatus: RentStatus; // Current rental status
    quantity: number; // Number of items rented
    createdAt: Date; // Record creation timestamp
    updatedAt: Date; // Record update timestamp
}

export interface RentLogState {
    rentLogs: RentLog[];
    selectedRentLog: RentLog | null;
    loading: boolean;
    error: string | null;
}