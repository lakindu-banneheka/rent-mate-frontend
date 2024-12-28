"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Item } from "@/types/itemTypes";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryById } from "@/lib/features/categorySlice";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DatePickerWithRange } from "../date-picker/DatePickerWithRange";
import { DateRange } from "react-day-picker";

interface RentalFormProps {
  item: Item | null;
  loading: boolean;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  qty: string;
  setQty: React.Dispatch<React.SetStateAction<string>>;
  totalCost: number;
}

export default function RentalForm({
  item,
  loading,
  date,
  setDate,
  qty,
  setQty,
  totalCost,
}: RentalFormProps) {
  const dispatch: AppDispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category);

  useEffect(() => {
    const loardItem = async () => {
      if (item?.categoryId) {
        dispatch(fetchCategoryById(item.categoryId as string));
      }

      if (category.error) {
        console.log(category.error);
      }
    };

    loardItem();
  }, [item?.categoryId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1 w-full">
            {category.loading || loading || !item ? (
              <Skeleton className="w-full h-8" />
            ) : (
              <span>{category.selectedCategory?.name}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {loading || !item ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <span>{item.name}</span>
            )}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">Availability:</span>
            {loading || !item ? (
              <Skeleton className="w-full h-5" />
            ) : (
              <>
                {item.availableQuantity > 0 ? (
                  <span className="text-green-600 text-sm">
                    Available for Rent
                  </span>
                ) : (
                  <span className="text-red-600 text-sm">
                    Not Available for Rent
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm mb-2">Quantity</label>
          <Select value={qty} onValueChange={setQty}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((qty) => (
                <SelectItem key={qty} value={qty.toString()}>
                  {qty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DatePickerWithRange
          date={date}
          setDate={setDate}
          label="Renting Period"
        />
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">OUR DELIVERY FEE INFORMATION</h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>Island Wide - Fee will Depending with Order & Location</li>
          </ul>
          <p className="text-xs font-medium">
            DELIVERY FEE ADD MANUALLY TO ORDER
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold">{`Rs.${totalCost ?? 0}`}</span>
          {/* <span className="text-sm text-muted-foreground">/total</span> */}
        </div>
        <Button size="lg">Rent this</Button>
      </div>
    </div>
  );
}
