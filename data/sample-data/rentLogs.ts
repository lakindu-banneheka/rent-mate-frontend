import { RentLog } from "@/types/rentLog";
import { PaymentStatus, RentStatus } from "@/types/rentTypes";

export const sampleRentLogs: RentLog[] = [
    {
      id: "log1",
      itemId: "item123",
      rentRecordId: "rent001",
      paymentStatus: PaymentStatus.SUCCESS, // Payment completed
      rentStatus: RentStatus.RESERVED, // Item is reserved for the customer
      quantity: 2,
      createdAt: new Date("2024-01-01T10:00:00Z"),
      updatedAt: new Date("2024-01-01T12:00:00Z"),
    },
    {
      id: "log2",
      itemId: "item456",
      rentRecordId: "rent002",
      paymentStatus: PaymentStatus.PENDING, // Payment not yet completed
      rentStatus: RentStatus.OUT_FOR_DELIVERY, // Item is on the way to the customer
      quantity: 1,
      createdAt: new Date("2024-01-02T08:00:00Z"),
      updatedAt: new Date("2024-01-02T09:00:00Z"),
    },
    {
      id: "log3",
      itemId: "item789",
      rentRecordId: "rent003",
      paymentStatus: PaymentStatus.REFUNDED, // Payment refunded
      rentStatus: RentStatus.CANCELED, // Reservation canceled
      quantity: 3,
      createdAt: new Date("2024-01-03T14:00:00Z"),
      updatedAt: new Date("2024-01-03T15:30:00Z"),
    },
    {
      id: "log4",
      itemId: "item321",
      rentRecordId: "rent004",
      paymentStatus: PaymentStatus.SUCCESS, // Payment successfully completed
      rentStatus: RentStatus.WITH_CUSTOMER, // Customer has the item
      quantity: 1,
      createdAt: new Date("2024-01-04T09:00:00Z"),
      updatedAt: new Date("2024-01-04T18:00:00Z"),
    },
    {
      id: "log5",
      itemId: "item654",
      rentRecordId: "rent005",
      paymentStatus: PaymentStatus.FAILED, // Payment failed
      rentStatus: RentStatus.RESERVED, // Item reservation still active despite payment failure
      quantity: 2,
      createdAt: new Date("2024-01-05T10:00:00Z"),
      updatedAt: new Date("2024-01-05T11:00:00Z"),
    },
  ];
  