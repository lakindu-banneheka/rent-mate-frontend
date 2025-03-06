import { z } from "zod";

export interface Item {
    id: string; 
    lenderId: string; 
    name: string; 
    categoryId: string; 
    description: string; 
    totalQuantity: number; 
    availableQuantity: number;
    reservedQuantity: number;
    rentedQuantity: number;
    pricing: PricingDetails[];
    imageUrls: string[];
    deliveryOptions: DeliveryOptions[];
    createdAt: Date;
    updatedAt: Date;
}
  
// Delivery Methods Interface
export interface DeliveryOptions {
    method: DeliveryMethod; 
    cost: number; 
}

// Enum for Delivery Methods
export enum DeliveryMethod {
    PICKUP = "pickup",
    DELIVERY = "delivery"
}

// Pricing Details Interface
export interface PricingDetails {
    amount: number; 
    duration: PricingDuration; 
}

// Enum for Pricing Duration
export enum PricingDuration {
    PER_DAY = "day",
    // PER_WEEK = "week"
}
  

export interface ItemState {
    items: Item[];
    selectedItem: Item | null;
    loading: boolean;
    error: string | null;
}

const mongoIdRegex = /^[a-f\d]{24}$/i;

export const ItemSchema = z.object({
    lenderId: z.string().optional(),
    // .regex(mongoIdRegex, {
    //   message: "Invalid ID. Please check the User Management window, locate the correct user, and copy and paste their ID here",
    // }),
    name: z.string().min(3, {
      message: "Name must be at least 3 characters long",
    }),
    categoryId: z.string().min(1, {
      message: "Please select a category",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters long",
    }),
    totalQuantity: z.number().min(0, {
      message: "Total quantity must be 0 or greater",
    }),
    availableQuantity: z.number().min(0, {
      message: "Available quantity must be 0 or greater",
    }).max(10, {
      message: "Available quantity cannot exceed total quantity",
    }),
    pricing: z.array(z.object({
      amount: z.number().min(0),
      duration: z.nativeEnum(PricingDuration)
    })).min(1, {
      message: "At least one pricing option is required"
    }),
    deliveryOptions: z.array(z.object({
      method: z.nativeEnum(DeliveryMethod),
      cost: z.number().min(0)
    })).min(1, {
      message: "At least one delivery option is required"
    }),
    imageUrls: z.array(z.string().url()).min(1, {
      message: "At least one image is required"
    })
  })
  
  export type ItemFormData = z.infer<typeof ItemSchema>

// use this for omoting mongo db generated attributes
//   const newItem: Omit<Item, "id" | "createdAt" | "updatedAt"> = { ... };

// Before saving:
// const newItem: Omit<Item, "id" | "createdAt" | "updatedAt"> = {
//     lenderId: "123",
//     name: "Laptop",
//     categoryId: "456",
//     description: "A high-end gaming laptop",
//     totalQuantity: 10,
//     availableQuantity: 8,
//     reservedQuantity: 1,
//     rentedQuantity: 1,
//     pricing: [
//       { amount: 100, duration: PricingDuration.PER_DAY },
//       { amount: 600, duration: PricingDuration.PER_WEEK }
//     ],
//     imageUrls: ["image1.jpg", "image2.jpg"],
//     deliveryOptions: { method: DeliveryMethod.DELIVERY, cost: 50 }
//   };
  
//   // After saving (MongoDB will add these fields):
//   const savedItem: Item = {
//     ...newItem,
//     id: "mongoId123",
//     createdAt: new Date(),
//     updatedAt: new Date()
//   };
  