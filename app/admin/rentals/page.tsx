'use client'
import { RentalDetailsPopup } from "@/components/rental-history/rent-dialog"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { fetchRents } from "@/lib/features/rentSlice"
import { AppDispatch, RootState } from "@/lib/store"
import { PaymentStatus, Rent, RentStatus } from "@/types/rentTypes"
import { Building2, User, Clock, Package, DollarSign, Truck, Calendar } from 'lucide-react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function RentalTracking() {

    const allRentalsSelector = useSelector((state: RootState) => state.rent.rents)

    const [rentals, setRentals] = useState<Rent[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const [selectedRental, setSelectedRental] = useState<Rent | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getAllRentals = () => {
          dispatch(fetchRents());
        }
        getAllRentals();
    },[]);

    useEffect(() => {
        setRentals(allRentalsSelector);
    },[allRentalsSelector]);

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
                        <span>Delivery: {rental.deliveryOption?.method.toString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className={getPaymentStatusColor(rental.paymentStatus)}>
                            Payment: {rental.totalCost}
                        </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Updated {new Date(rental.updatedAt).toLocaleString()}</span>
                        </div>
                        <button 
                            className="text-blue-500 hover:text-blue-600 font-medium"
                            onClick={()=>{
                                setOpen(true);
                                setSelectedRental(rental)
                            }}    
                        >
                            More Details
                        </button>
                        
                    </div>
                    </div>
                </Card>
            ))}
        </div>
            { selectedRental &&
                <RentalDetailsPopup 
                    isOpen={open}
                    onClose={()=>{setOpen(false)}}
                    rental={selectedRental}
                />
            }
        </div>
    )
}

