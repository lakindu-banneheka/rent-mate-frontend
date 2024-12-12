import React from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeliveryMethod, Item } from '@/types/itemTypes';
import { ArrowRightIcon } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Card className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div
        className="w-full md:w-1/3 bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.imageUrls[0] || '/placeholder-image.jpg'})`,
        }}
      />

      {/* Content Section */}
      <div className="flex-1 p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {item.name}
          </CardTitle>
        </CardHeader>
        <div className="mt-2 text-gray-600">{item.description}</div>

        {/* Pricing */}
        <div className="mt-4">
          <p className="font-medium text-gray-800 mb-2">Pricing:</p>
          <ul className="space-y-2">
            {item.pricing.slice(0, 3).map((price, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded-lg p-2 bg-gray-50"
              >
                <span>
                  ${price.amount} / {price.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery Options */}
        <div className="mt-4">
          <p className="font-medium text-gray-800 mb-2">Delivery Options:</p>
          <ul className="space-y-2">
            {item.deliveryOptions.slice(0, 2).map((option, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded-lg p-2 bg-gray-50"
              >
                <Badge
                  variant={
                    option.method === DeliveryMethod.PICKUP
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {option.method}
                </Badge>
                <span className="text-gray-600">${option.cost}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quantity */}
        <div className="mt-4">
          <p className="text-gray-600">
            Available: {item.availableQuantity} / {item.totalQuantity}
          </p>
        </div>

        {/* More Details Button */}
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.location.href = `/items/${item.id}`}
          >
            More Details
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;