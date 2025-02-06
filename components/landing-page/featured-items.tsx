"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function FeaturedItems() {
  const items = [
    {
      title: "Mazda 3 Sedan",
      price: "$99/day",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Nikon D3500",
      price: "$35/day",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "House for Rent",
      price: "$150/day",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-white">Featured Items</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="p-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="aspect-[3/2] rounded-t-lg object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-[#00BFA5]">{item.price}</p>
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

