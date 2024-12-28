"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { BillingDetails, Rent } from "@/types/rentTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { updateNewRent } from "@/lib/features/rentSlice";

const billingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  streetAddress: z.string().min(1, "Street address is required"),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

type BillingFormValues = z.infer<typeof billingSchema>;

export default function BillingForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
  });
  const { newRent } = useSelector((state: RootState) => state.rent);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: BillingFormValues) => {
    if (newRent) {
      dispatch(
        updateNewRent({
          ...newRent,
          billingDetails: data as BillingDetails,
        })
      );
    }
  };

  console.log(newRent ? (newRent as Rent).billingDetails : null);
  React.useEffect(() => {
    if (newRent && (newRent as Rent).billingDetails) {
      const billingDetails = (newRent as Rent).billingDetails;
      Object.keys(billingDetails).forEach((key) => {
        setValue(
          key as keyof BillingFormValues,
          (billingDetails as BillingFormValues)[key as keyof BillingFormValues]
        );
      });
    }
  }, [newRent, setValue]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Billing details</CardTitle>
        <CardDescription>
          Please enter your billing information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="company">Company name (optional)</Label>
              <Input
                id="company"
                placeholder="Enter your company name"
                {...register("company")}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="country">Country / Region</Label>
              <Input id="country" value="Sri Lanka" disabled />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="streetAddress">Street address *</Label>
              <Input
                id="streetAddress"
                placeholder="House number and street name"
                {...register("streetAddress")}
              />
              {errors.streetAddress && (
                <p className="text-sm text-red-500">
                  {errors.streetAddress.message}
                </p>
              )}
              <Input
                id="streetAddress2"
                placeholder="Apartment, suite, unit, etc."
                className="mt-2"
                {...register("streetAddress2")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">Town / City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="postcode">Postcode / ZIP *</Label>
                <Input
                  id="postcode"
                  placeholder="Enter your postcode"
                  {...register("postcode")}
                />
                {errors.postcode && (
                  <p className="text-sm text-red-500">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          {!(newRent && (newRent as Rent).billingDetails) ? "Submit" : "Update"}
          {" Billing Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}
