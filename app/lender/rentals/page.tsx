'use client'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { fetchRents } from "@/lib/features/rentSlice"
import { AppDispatch, RootState } from "@/lib/store"
import { PaymentStatus, Rent, RentStatus } from "@/types/rentTypes"
import { Building2, User, Clock, Package, DollarSign, Truck, Calendar } from 'lucide-react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// enum DeliveryOptions {
//   Pickup = "Pickup",
//   Delivery = "Delivery"
// }

// enum PaymentStatus {
//   Pending = "Pending",
//   Paid = "Paid",
//   Refunded = "Refunded"
// }

// enum RentStatus {
//   Reserved = "Reserved",
//   Active = "Active",
//   Completed = "Completed",
//   Canceled = "Canceled",
//   Overdue = "Overdue"
// }

// interface BillingDetails {
//   name: string;
//   address: string;
//   // Add other billing details as needed
// }

// interface RentalEntry {
//   id: string;
//   userId: string;
//   lenderId: string;
//   itemId: string;
//   startDate: Date;
//   endDate: Date;
//   deliveryOption: DeliveryOptions;
//   itemCost: number;
//   totalCost: number;
//   paymentStatus: PaymentStatus;
//   rentStatus: RentStatus;
//   itemReturnedDate?: Date;
//   overDueFee?: number;
//   quantity: number;
//   billingDetails: BillingDetails;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const rentals: RentalEntry[] = [
//   {
//     id: "001285634",
//     userId: "004865233",
//     lenderId: "L001",
//     itemId: "ITEM001",
//     startDate: new Date("2024-12-23"),
//     endDate: new Date("2024-12-30"),
//     deliveryOption: DeliveryOptions.Delivery,
//     itemCost: 50,
//     totalCost: 299.99,
//     paymentStatus: PaymentStatus.Paid,
//     rentStatus: RentStatus.Reserved,
//     quantity: 1,
//     billingDetails: { name: "John Doe", address: "123 Main St" },
//     createdAt: new Date("2024-12-20"),
//     updatedAt: new Date("2024-12-20")
//   },
//   {
//     id: "001285635",
//     userId: "004865234",
//     lenderId: "L002",
//     itemId: "ITEM002",
//     startDate: new Date("2024-12-15"),
//     endDate: new Date("2024-12-22"),
//     deliveryOption: DeliveryOptions.Pickup,
//     itemCost: 75,
//     totalCost: 399.99,
//     paymentStatus: PaymentStatus.Pending,
//     rentStatus: RentStatus.Active,
//     quantity: 2,
//     billingDetails: { name: "Jane Smith", address: "456 Elm St" },
//     createdAt: new Date("2024-12-10"),
//     updatedAt: new Date("2024-12-14")
//   },
//   {
//     id: "001285636",
//     userId: "004865235",
//     lenderId: "L003",
//     itemId: "ITEM003",
//     startDate: new Date("2024-11-23"),
//     endDate: new Date("2024-11-30"),
//     deliveryOption: DeliveryOptions.Delivery,
//     itemCost: 100,
//     totalCost: 499.99,
//     paymentStatus: PaymentStatus.Refunded,
//     rentStatus: RentStatus.Canceled,
//     quantity: 1,
//     billingDetails: { name: "Bob Johnson", address: "789 Oak St" },
//     createdAt: new Date("2024-11-20"),
//     updatedAt: new Date("2024-11-22")
//   }
// ]

export default function RentalTracking() {

    const allRentalsSelector = useSelector((state: RootState) => state.rent.rents)
    const [rentals, setRentals] = useState<Rent[]>([]);
      const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const getAllRentals = () => {
          dispatch(fetchRents());
        }

        getAllRentals();
    },[]);


    const getStatusColor = (status: RentStatus) => {
        switch (status) {
        case RentStatus.RESERVED:
            return "bg-blue-50 text-blue-500";
        case RentStatus.WITH_CUSTOMER:
        case RentStatus.OUT_FOR_DELIVERY:
            return "bg-green-50 text-green-500";
        case RentStatus.PAID:
            return "bg-purple-50 text-purple-500";
        case RentStatus.CANCELED:
            return "bg-red-50 text-red-500";
        //   case RentStatus.Overdue:
        //     return "bg-yellow-50 text-yellow-500";
        default:
            return "bg-gray-50 text-gray-500";
        }
    }

    const getPaymentStatusColor = (status: PaymentStatus) => {
        switch (status) {
        case PaymentStatus.SUCCESS:
            return "text-green-600";
        case PaymentStatus.PENDING:
            return "text-yellow-600";
        case PaymentStatus.REFUNDED:
            return "text-blue-600";
        default:
            return "text-gray-600";
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
        <div className="space-y-4">
            {rentals.map((rental) => (
            <Card key={rental.id} className="p-6">
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <span className="text-gray-600">#{rental.id}</span>
                    <span className="font-medium">- Item ID: {rental.itemId}</span>
                    </div>
                    <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                        <DollarSign className="h-4 w-4" />
                        {rental.totalCost.toFixed(2)} LKR
                    </div>
                    <Badge 
                        variant="secondary" 
                        className={getStatusColor(rental.rentStatus)}
                    >
                        {rental.rentStatus}
                    </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>User ID: {rental.userId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span>Lender ID: {rental.lenderId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>Quantity: {rental.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Delivery: {rental.deliveryOption.method}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{rental.startDate.toLocaleDateString()} - {rental.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className={getPaymentStatusColor(rental.paymentStatus)}>
                        Payment: {rental.paymentStatus}
                    </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Updated {rental.updatedAt.toLocaleString()}</span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 font-medium">
                    More Details
                    </button>
                </div>
                </div>
            </Card>
            ))}
        </div>
        </div>
    )
}

