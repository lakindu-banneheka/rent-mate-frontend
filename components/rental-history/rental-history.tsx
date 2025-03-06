'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RentalItemCard } from "./rental-item-card"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { fetchRents } from "@/lib/features/rentSlice";
import { RentStatus } from "@/types/rentTypes";

export default function RentalHistory() {
  const dispatch: AppDispatch = useDispatch();
  const rents = useSelector((state: RootState) => state.rent.rents);
  const currentUserId = localStorage.getItem('userId') || '';

  const handleItemClick = (id: string) => {
    console.log('Clicked item:', id);
    // Add navigation or modal open logic here
  };

  useEffect(() => {
    dispatch(fetchRents());
  }, [dispatch]);

  // Map each tab group to an array of RentStatus values
  const statusMapping = {
    pending: [RentStatus.RESERVED],
    rented: [RentStatus.PAID, RentStatus.OUT_FOR_DELIVERY, RentStatus.WITH_CUSTOMER],
    completed: [RentStatus.RETURNED],
    cancelled: [RentStatus.CANCELED],
  };

  // Create an array of the group names (keys of the mapping)
  const groups = Object.keys(statusMapping) as Array<keyof typeof statusMapping>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          {groups.map((group) => (
            <TabsTrigger key={group} value={group}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map((group) => {
          const filteredRents = rents.filter(item =>
            statusMapping[group].includes(item.rentStatus.toLocaleLowerCase() as RentStatus) 
            && item.userId === currentUserId
          );

          return (
            <TabsContent key={group} value={group} className="space-y-4">
              {filteredRents.map((item) => (
                <RentalItemCard
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                  canReview={(group === 'pending')?false:true}
                />
              ))}
              {filteredRents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No {group} rentals found
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

