'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from 'lucide-react'

interface Review {
  customerName: string
  message: string
  rating: number
}

export default function ProductTabs() {
  const reviews: Review[] = [
    {
      customerName: "Customer name",
      message: "this is the example message for customer feedback",
      rating: 0
    },
    {
      customerName: "Customer name",
      message: "this is the example message for customer feedback",
      rating: 0
    }
  ]

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0

  return (
    <Tabs defaultValue="description" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            Rent Stuffs offers Tiffany chairs for rent in Sri Lanka. We are one of the leading furniture rental services in the country. Tiffany Chair is an timeless chair that provides elegance for any event. Gold Tiffany chairs are often used for weddings and formal events.
          </p>
          <p>
            Also the planning for your wedding event has been a long awaited one, it's the one and only day that can carry your VIP status as the bride and groom. We are able to help with your event, do let us know what you want. We make sure to continue serving you beautiful and elegant chairs for your next memorable event.
          </p>
          <p>
            White discussion tables for rent
          </p>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Based on {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </h3>
            <div className="flex items-baseline gap-4">
              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
              <div>
                <div className="text-sm font-medium">Overall</div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating
                          ? 'fill-primary stroke-primary'
                          : 'fill-muted stroke-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {reviews.length} rating{reviews.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="font-medium">{review.customerName}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-primary stroke-primary'
                          : 'fill-muted stroke-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review.message}</p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

