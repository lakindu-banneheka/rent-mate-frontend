import { DeliveryMethod } from "@/types/itemTypes";
import { PaymentStatus, Rent, RentStatus } from "@/types/rentTypes";

export const sampleRents: Rent[] = [
    {
      id: "RNT12345",
      userId: "USR001",
      lenderId: "LND123",
      itemId: "ITM789",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-07"),
      deliveryOption: {
        cost: 0,
        method: DeliveryMethod.DELIVERY
      },
      itemCost: 50.0,
      totalCost: 350.0,
      paymentStatus: PaymentStatus.SUCCESS,
      rentStatus: RentStatus.WITH_CUSTOMER,
      itemReturnedDate: new Date(),
      overDueFee: 0,
      quantity: 7,
      billingDetails: {
        firstName: "John",
        lastName: "Doe",
        streetAddress: "123 Main Street",
        city: "Colombo",
        postcode: "00100",
        phone: "0771234567",
        email: "john.doe@example.com",
      },
      createdAt: new Date("2024-12-31"),
      updatedAt: new Date("2025-01-05"),
    },
    {
      id: "RNT67890",
      userId: "USR002",
      lenderId: "LND456",
      itemId: "ITM123",
      startDate: new Date("2024-12-15"),
      endDate: new Date("2024-12-20"),
      deliveryOption: {
        cost: 10,
        method: DeliveryMethod.PICKUP},
      itemCost: 30.0,
      totalCost: 180.0,
      paymentStatus: PaymentStatus.REFUNDED,
      rentStatus: RentStatus.CANCELED,
      itemReturnedDate: new Date(),
      overDueFee: 10,
      quantity: 6,
      billingDetails: {
        firstName: "Jane",
        lastName: "Smith",
        streetAddress: "456 High Street",
        city: "Kandy",
        postcode: "20000",
        phone: "0789876543",
        email: "jane.smith@example.com",
      },
      createdAt: new Date("2024-12-10"),
      updatedAt: new Date("2024-12-18"),
    },
    // {
    //   id: "RNT54321",
    //   userId: "USR003",
    //   lenderId: "LND789",
    //   itemId: "ITM456",
    //   startDate: new Date("2024-12-01"),
    //   endDate: new Date("2024-12-10"),
    //   deliveryOption: DeliveryOptions.DELIVERY,
    //   itemCost: 20.0,
    //   totalCost: 200.0,
    //   paymentStatus: PaymentStatus.SUCCESS,
    //   rentStatus: RentStatus.RETURNED,
    //   itemReturnedDate: new Date("2024-12-11"),
    //   overDueFee: 10.0,
    //   quantity: 10,
    //   billingDetails: {
    //     firstName: "Alice",
    //     lastName: "Brown",
    //     streetAddress: "789 Park Avenue",
    //     city: "Galle",
    //     postcode: "80000",
    //     phone: "0766543210",
    //     email: "alice.brown@example.com",
    //   },
    //   createdAt: new Date("2024-11-30"),
    //   updatedAt: new Date("2024-12-12"),
    // },
  ];
  