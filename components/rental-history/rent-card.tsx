import { Building2, Calendar, CircleDot, Clock, DollarSign, Package, Truck, User } from "lucide-react";
import { Card } from "../ui/card";
import { PaymentStatus, Rent, RentStatus } from "@/types/rentTypes";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { RentalDetailsPopup } from "./rent-dialog";


const RentCard = ({rental}: {rental: Rent}) => {

    const getStatusColor = (status: RentStatus) => {
        switch (status) {
          case RentStatus.RESERVED:
            return "bg-blue-50 text-blue-500";
          case RentStatus.OUT_FOR_DELIVERY:
            return "bg-green-50 text-green-500";
          case RentStatus.RETURNED:
            return "bg-purple-50 text-purple-500";
          case RentStatus.CANCELED:
            return "bg-red-50 text-red-500";
          case RentStatus.WITH_CUSTOMER:
            return "bg-yellow-50 text-yellow-500";
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

      // const [selectedRental, setSelectedRental] = useState<Rent | null>(null);
      const [open, setOpen] = useState(false);



    return (
      <>
      
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
                    {rental.totalCost?.toFixed(2)} USD
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
                  <span>
                    {rental.startDate && new Date(rental.startDate).toLocaleDateString()} - 
                    {rental.endDate && new Date(rental.endDate).toLocaleDateString()}
                  </span>

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
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }} 

                    className="text-blue-500 hover:text-blue-600 font-medium"

                >
                  More Details
                </button>
              </div>
            </div>
          </Card>
          { rental &&
            <RentalDetailsPopup
                isOpen={open}
                onClose={()=>{setOpen(false)}}
                rental={rental}
            />
        }
      </>
    )
}

export default RentCard;