import { DeliveryMethod, Item, PricingDuration } from "@/types/itemTypes";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Calendar, Package, Truck } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
interface ItemCardProps {
  item: Item;
  // onClick?: () => void
  categoryFilters: {
    id: string;
    label: string;
  }[];
}
const ItemCard = ({ item, categoryFilters }: ItemCardProps) => {

  const dailyPrice = item.pricing.find(
    (p) => p.duration === PricingDuration.PER_DAY
  )?.amount;
  const weeklyPrice = item.pricing.find(
    (p) => p.duration === PricingDuration.PER_WEEK
  )?.amount;
  const deliveryOptions = item.deliveryOptions.slice(0, 3);

  const categoryName =
    categoryFilters.filter((category) => category.id === item.categoryId)[0]
      ?.label ?? "";

  return (
    <Card
      onClick={() => {
        // router.push(`/admin/items/${item.id}`);
      }}
      className="group transition-all hover:shadow-md dark:hover:shadow-primary/5 cursor-pointer w-full md:w-[300px]"
    >
      <CardContent className="p-4">
        <div className="flex flex-col  gap-4">
          <div className="relative w-full  h-48  overflow-hidden rounded-md">
            {item.imageUrls[0] ? (
              <Image
                src={item.imageUrls[0]}
                alt={item.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex flex-col ">
            <div>
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {categoryName || ""}
                </Badge>
                {deliveryOptions.map((option, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs gap-1"
                  >
                    <Truck className="h-3 w-3" />
                    {option.method === DeliveryMethod.PICKUP
                      ? "Pickup"
                      : `Delivery Rs.${option.cost}`}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-medium">{item.totalQuantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Available:</span>
                <span className="font-medium">{item.availableQuantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  ${dailyPrice?.toFixed(2) ?? "N/A"}
                </span>
                <span className="text-muted-foreground">/day</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  ${weeklyPrice?.toFixed(2) ?? "N/A"}
                </span>
                <span className="text-muted-foreground">/week</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
