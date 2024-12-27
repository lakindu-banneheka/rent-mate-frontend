"use client";

import { useState } from "react";
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
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function RentalForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState("5");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-start gap-4 mb-6">
        <div className="">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Aerial Drone, Videography</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">DJI Mini 3 Pro 4K Drone</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">Availability:</span>
            <span className="text-green-600 text-sm">Available for Rent</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm mb-2">
            Renting Period (How many days for rent)
          </label>
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day} day{day > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-fit ">
          <label className="block text-sm mb-2">
            Starting Renting Period From
          </label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md align-middle"
          />
        </div>
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
          <span className="text-3xl font-bold">Rs.20,000</span>
          <span className="text-sm text-muted-foreground">/day</span>
        </div>
        <Button size="lg">Rent this</Button>
      </div>
    </div>
  );
}
