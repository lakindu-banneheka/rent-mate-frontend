"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItems } from "@/lib/features/itemSlice";
import { redirect, useRouter } from "next/navigation";

export function FeaturedItems() {

  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.item.items);
  // const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
  const router = useRouter();

  useEffect(() => {
      const loadCategories = async () => {
          await dispatch(fetchItems());
      };
      
          loadCategories();
  }, [dispatch]);

  // const items = [
  //   {
  //     title: "Mazda 3 Sedan",
  //     price: "$99/day",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     title: "Nikon D3500",
  //     price: "$35/day",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     title: "House for Rent",
  //     price: "$150/day",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  // ]

  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-white">Featured Items</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card
                  onClick={()=>{redirect(`/product/${item.id}`)}}
                  className="cursor-pointer"
                >
                  <CardContent className="p-0">
                    <Image
                      src={item.imageUrls[0] || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="aspect-[3/2] rounded-t-lg object-cover w-full"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-[#00BFA5]">LKR {item.pricing[0].amount.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white" />
          <CarouselNext className="bg-white" />
        </Carousel>
      </div>
    </section>
  )
}

