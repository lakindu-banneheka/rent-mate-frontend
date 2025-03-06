'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RentalItemCard } from "./rental-item-card"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { fetchRents } from "@/lib/features/rentSlice";
import { RentalItem } from "@/types/rental"

// Mock data - replace with actual data from your API
const mockRentals: RentalItem[] = [
  {
    id: '1',
    name: 'DJI Mavic 3 Cine Premium Combo',
    image: '/placeholder.svg',
    quantity: 10,
    availableQuantity: 6,
    pricePerDay: 700.00,
    status: 'pending'
  },
  {
    id: '2',
    name: 'DJI Mavic 3 Cine Premium Combo',
    image: '/placeholder.svg',
    quantity: 10,
    availableQuantity: 6,
    pricePerDay: 700.00,
    status: 'rented'
  },
  {
    id: '3',
    name: 'DJI Mavic 3 Cine Premium Combo',
    image: '/placeholder.svg',
    quantity: 10,
    availableQuantity: 6,
    pricePerDay: 700.00,
    status: 'completed'
  },
  {
    id: '4',
    name: 'DJI Mavic 3 Cine Premium Combo',
    image: '/placeholder.svg',
    quantity: 10,
    availableQuantity: 6,
    pricePerDay: 700.00,
    status: 'cancelled'
  },
]

export default function RentalHistory() {
  
  const dispatch: AppDispatch = useDispatch();
  const rents = useSelector((state: RootState) => state.rent.rents );

  const handleItemClick = (id: string) => {
    console.log('Clicked item:', id)
    // Add navigation or modal open logic here
  }

    useEffect(() => {
      dispatch(fetchRents());
    }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rented">Rented</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        {(['pending', 'rented', 'completed', 'cancelled'] as const).map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {mockRentals
              .filter(item => item.status === status)
              .map(item => (
                <RentalItemCard
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                />
              ))}
            {mockRentals.filter(item => item.status === status).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No {status} rentals found
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

