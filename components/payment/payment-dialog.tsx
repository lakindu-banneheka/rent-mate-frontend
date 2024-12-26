"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentDialogProps {
  itemTotal: number;
  deliveryFees: number;
}

export function PaymentDialog({ itemTotal, deliveryFees }: PaymentDialogProps) {
  const total = itemTotal + deliveryFees;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Place order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-600">Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2 text-center">
            <div className="flex justify-between px-8">
              <span>Item Total :</span>
              <span>Rs {itemTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-8">
              <span>Delivery Fees :</span>
              <span>Rs {deliveryFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-8 font-semibold">
              <span>Total :</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <Button
              className="w-24"
              onClick={() => {
                // Handle payment here
                console.log("Processing payment...");
              }}
            >
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
