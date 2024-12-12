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
    PER_WEEK = "week"
}
  

export interface ItemState {
    items: Item[];
    selectedItem: Item | null;
    loading: boolean;
    error: string | null;
  }


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
  