"use client";
import * as React from "react";
import { PhoneIcon as WhatsappIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentDialog } from "./payment-dialog";

export default function OrderSummary() {
  const [deliveryOption, setDeliveryOption] = React.useState("pickup");
  const deliveryCharge = 500; // ₨.500 for delivery

  const subtotal = 5000;
  const total =
    deliveryOption === "delivery" ? subtotal + deliveryCharge : subtotal;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">Product</h3>
              <p className="text-sm text-muted-foreground">
                Sony A6000 Camera with 50mm Lense Setup × 1
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">From:</span> December
                  31, 2024
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">To:</span> January 1,
                  2025
                </p>
              </div>
              <p className="text-sm mt-2">
                <span className="text-muted-foreground">
                  Renting Period (How many days for rent):
                </span>{" "}
                1 day
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">₨.5,000</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Delivery Options</h3>
            <RadioGroup
              defaultValue="pickup"
              className="space-y-2"
              onValueChange={(value) => setDeliveryOption(value)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Pickup</Label>
                </div>
                <span className="text-sm">₨.0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery</Label>
                </div>
                <span className="text-sm">₨.{deliveryCharge}</span>
              </div>
            </RadioGroup>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>₨.{subtotal}</span>
            </div>
            {deliveryOption === "delivery" && (
              <div className="flex justify-between mt-2">
                <span className="font-medium">Delivery Charge</span>
                <span>₨.{deliveryCharge}</span>
              </div>
            )}
            <div className="flex justify-between mt-2">
              <span className="font-medium">Total</span>
              <span className="font-medium">₨.{total}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <WhatsappIcon className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">WhatsApp Order</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Send your Order via WhatsApp
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            {"I've read and accept the terms & conditions"}
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <PaymentDialog
          itemTotal={subtotal}
          deliveryFees={deliveryOption === "delivery" ? deliveryCharge : 0}
        />
      </CardFooter>
    </Card>
  );
}
