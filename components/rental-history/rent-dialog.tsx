'use client'

import { format } from 'date-fns'
import { X } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Rent } from '@/types/rentTypes'

interface RentalDetailsPopupProps {
  rental: Rent
  isOpen: boolean
  onClose: () => void
}

export function RentalDetailsPopup({ rental, isOpen, onClose }: RentalDetailsPopupProps) {
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMMM dd, yyyy')
  }

  const getStatusColor = (status: string) => {
    const colors = {
      Active: 'bg-green-500',
      Completed: 'bg-blue-500',
      Cancelled: 'bg-red-500',
      Overdue: 'bg-yellow-500',
      Paid: 'bg-green-500',
      Pending: 'bg-yellow-500',
      Failed: 'bg-red-500',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              #{rental.rentRecordId}
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <h3 className="font-medium mb-2">Rental Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Created at</div>
              <div>{formatDate(rental.createdAt)}</div>
              <div className="text-muted-foreground">Delivery Option</div>
              <div>{rental.deliveryOption}</div>
              <div className="text-muted-foreground">Payment Status</div>
              <div>
                <Badge variant="secondary" className={getStatusColor(rental.paymentStatus)}>
                  {rental.paymentStatus}
                </Badge>
              </div>
              <div className="text-muted-foreground">Rental Status</div>
              <div>
                <Badge variant="secondary" className={getStatusColor(rental.rentStatus)}>
                  {rental.rentStatus}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Name</div>
              <div>{`${rental.firstName} ${rental.lastName}`}</div>
              <div className="text-muted-foreground">Email</div>
              <div>{rental.email}</div>
              <div className="text-muted-foreground">Phone</div>
              <div>{rental.contactNo}</div>
              <div className="text-muted-foreground">Address</div>
              <div>{rental.address}</div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Rental Period</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Start Date</div>
              <div>{formatDate(rental.startDate)}</div>
              <div className="text-muted-foreground">End Date</div>
              <div>{formatDate(rental.endDate)}</div>
              {rental.itemReturnedDate && (
                <>
                  <div className="text-muted-foreground">Returned Date</div>
                  <div>{formatDate(rental.itemReturnedDate)}</div>
                </>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-medium">Cost Breakdown</h3>
            <div className="rounded-md border p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Item Cost (x{rental.quantity})</div>
                <div>${(rental.itemCost * rental.quantity).toFixed(2)}</div>
                {rental.overDueFee && rental.overDueFee > 0 && (
                  <>
                    <div className="text-muted-foreground">Overdue Fee</div>
                    <div className="text-red-500">${rental.overDueFee.toFixed(2)}</div>
                  </>
                )}
              </div>
            </div>
            {/* Total cost = (item cost * quantity) + overdue fee (if any) */}
            <div className="flex justify-between items-center font-medium text-lg pt-2 border-t">
              <span>Total Cost</span>
              <span>${((rental.itemCost * rental.quantity) + (rental.overDueFee || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

