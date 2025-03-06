"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { Rent } from "@/types/rentTypes";
import { createRent, removeNewRent } from "@/lib/features/rentSlice";

interface PaymentDialogProps {
  itemTotal: number;
  deliveryFees: number;
  acceptedTerms: boolean;
}

export function PaymentDialog({
  itemTotal,
  deliveryFees,
  acceptedTerms,
}: PaymentDialogProps) {
  const total = itemTotal + deliveryFees;
  const dispatch: AppDispatch = useDispatch();
  const { newRent, loading, error } = useSelector(
    (state: RootState) => state.rent
  );
  const [open, setOpen] = React.useState(false);

  // const handlePlaceOrder = async () => {
  //   if (!acceptedTerms) {
  //     alert("Please accept the terms and conditions");
  //     setOpen(false);
  //     return;
  //   } else if (isNewRentType(newRent)) {
  //     await dispatch(createRent(newRent as Rent));
  //     // setOpen(true);
  //     if (loading === false && error === null) {
  //       dispatch(removeNewRent());
  //     } else {
  //       console.log("Error placing order", error);
  //       setOpen(false);
  //       return;
  //     }
  //   } else {
  //     alert("No rent data found");
  //     setOpen(false);
  //     return;
  //   }
  // };

  const handlePlaceOrder = async () => {
    try {
      if (!acceptedTerms) {
        alert("Please accept the terms and conditions");
        setOpen(false);
        return;
      } else if (newRent) {
        console.log("newRent", newRent, localStorage.getItem('userId'));
        await dispatch(createRent(newRent as Rent));
        // setOpen(true);
        if (loading === false && error === null) {
          dispatch(removeNewRent());
        } else {
          alert("Error placing order: " + error);
          setOpen(false);
          return;
        }
      } else {
        alert("No rent data found");
        setOpen(false);
        return;
      }
    } catch (err) {
      console.error("Error in handlePlaceOrder", err);
      setOpen(false);
    }
  };
  
  

  return (
    <>
      <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
        Place order
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
        
      </DialogTrigger> */}
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
    </>
  );
}
