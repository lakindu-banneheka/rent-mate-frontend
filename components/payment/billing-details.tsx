import * as React from "react";

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

export default function BillingForm() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Billing details</CardTitle>
        <CardDescription>
          Please enter your billing information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="company">Company name (optional)</Label>
              <Input id="company" placeholder="Enter your company name" />
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
                required
              />
              <Input
                id="streetAddress2"
                placeholder="Apartment, suite, unit, etc."
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">Town / City *</Label>
                <Input id="city" placeholder="Enter your city" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="postcode">Postcode / ZIP *</Label>
                <Input
                  id="postcode"
                  placeholder="Enter your postcode"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  );
}
