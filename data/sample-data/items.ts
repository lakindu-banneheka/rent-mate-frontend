import { DeliveryMethod, Item, PricingDuration } from "@/types/itemTypes";

export const sampleItemData: Item[] = [
    // Example item data
    {
      id: '1',
      lenderId: 'lender1',
      name: 'DJI Mavic 3 Cine Premium Combo',
      categoryId: 'electronics',
      description: 'High-end drone for professional use',
      totalQuantity: 10,
      availableQuantity: 6,
      reservedQuantity: 2,
      rentedQuantity: 2,
      pricing: [
        {
          amount: 700,
          duration: PricingDuration.PER_DAY,
        },
        {
            amount: 5000,
            duration: PricingDuration.PER_WEEK,
          },
      ],
      imageUrls: ['https://s3-ap-southeast-1.amazonaws.com/media.cameralk.com/8516/1636064531_1665140.jpg'],
      deliveryOptions: [
        {
            method: DeliveryMethod.PICKUP,
            cost: 0,
        },
        {
            method: DeliveryMethod.DELIVERY,
            cost: 300,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
];