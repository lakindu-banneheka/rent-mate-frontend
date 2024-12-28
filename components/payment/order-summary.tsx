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
import { Rent } from "@/types/rentTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchItemById } from "@/lib/features/itemSlice";
import { format } from "date-fns";
import { DeliveryMethod, DeliveryOptions } from "@/types/itemTypes";
import { updateNewRent } from "@/lib/features/rentSlice";

interface OrderSummaryProps {
  rentData:
    | Omit<
        Rent,
        "id" | "createdAt" | "updatedAt" | "billingDetails" | "deliveryOption"
      >
    | Omit<Rent, "id" | "createdAt" | "updatedAt">
    | null;
  setDeliveryOption: React.Dispatch<React.SetStateAction<string>>;
  deliveryOption: string;
  setDeliveryOptionData: React.Dispatch<React.SetStateAction<DeliveryOptions>>;
  deliveryOptionData: DeliveryOptions;
}

export default function OrderSummary({
  rentData,
  setDeliveryOption,
  deliveryOption,
  setDeliveryOptionData,
  deliveryOptionData,
}: OrderSummaryProps) {
  const dispatch: AppDispatch = useDispatch();
  const { selectedItem } = useSelector((state: RootState) => state.item);
  const [acceptedTerms, setAcceptedTerms] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadItem = async () => {
      if (rentData) {
        dispatch(fetchItemById(rentData.itemId));
      }
    };

    loadItem();
  }, [rentData]);

  React.useEffect(() => {
    setDeliveryOptionData({
      cost: selectedItem?.deliveryOptions.find(
        (option) => option.method === deliveryOption
      )?.cost as number,
      method: deliveryOption as DeliveryMethod,
    });
  }, [deliveryOption]);

  React.useEffect(() => {
    if (deliveryOption && rentData) {
      dispatch(
        updateNewRent({
          ...rentData,
          deliveryOption: {
            cost: selectedItem?.deliveryOptions.find(
              (option) => option.method === deliveryOption
            )?.cost as number,
            method: deliveryOption as DeliveryMethod,
          },
        })
      );
    }
  }, [deliveryOption]);

  const subtotal = rentData?.itemCost || 0;
  const total =
    deliveryOption === "delivery"
      ? subtotal + (deliveryOptionData?.cost || 0)
      : subtotal;

  return (
    <Card className="w-full max-w-md mx-auto h-fit">
      <CardHeader>
        <CardTitle>Your order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">Product</h3>
              <p className="text-sm text-muted-foreground">
                {`${selectedItem?.name} × ${rentData?.quantity}`}
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">From:</span>{" "}
                  {format(
                    new Date(rentData?.startDate ?? new Date()),
                    "MMMM d, yyyy"
                  )}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">To:</span>
                  {format(
                    new Date(rentData?.endDate ?? new Date()),
                    "MMMM d, yyyy"
                  )}
                </p>
              </div>
              <p className="text-sm mt-2">
                <span className="text-muted-foreground">
                  Renting Period (How many days for rent):
                </span>{" "}
                {rentData &&
                  rentData.endDate &&
                  rentData.startDate &&
                  Math.round(
                    Math.abs(
                      (new Date(rentData.endDate).getTime() -
                        new Date(rentData.startDate).getTime()) /
                        (24 * 60 * 60 * 1000)
                    )
                  )}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{`₨.${rentData?.itemCost ?? 0}`}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Delivery Options</h3>
            <RadioGroup
              defaultValue="pickup"
              className="space-y-2"
              onValueChange={(value) => setDeliveryOption(value)}
            >
              {selectedItem &&
                selectedItem.deliveryOptions.map((option) => (
                  <div
                    className="flex items-center justify-between"
                    key={option.method}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.method}
                        id={option.method}
                      />
                      <Label htmlFor={option.method}>
                        {option.method.toLocaleUpperCase()}
                      </Label>
                    </div>
                    <span className="text-sm">₨.{option.cost}</span>
                  </div>
                ))}
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
                <span>₨.{deliveryOptionData?.cost ?? 0}</span>
              </div>
            )}
            <div className="flex justify-between mt-2">
              <span className="font-medium">Total</span>
              <span className="font-medium">₨.{total}</span>
            </div>
          </div>
        </div>

        {/* <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <WhatsappIcon className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">WhatsApp Order</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Send your Order via WhatsApp
          </p>
        </div> */}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
          />
          <Label htmlFor="terms" className="text-sm">
            {"I've read and accept the terms & conditions"}
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <PaymentDialog
          itemTotal={subtotal}
          deliveryFees={
            deliveryOption === "delivery" ? deliveryOptionData?.cost || 0 : 0
          }
          acceptedTerms={acceptedTerms}
        />
      </CardFooter>
    </Card>
  );
}
