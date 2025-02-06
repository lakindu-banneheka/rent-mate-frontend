import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function Reviews() {
  const reviews = [
    {
      name: "Sarah",
      rating: "4.5",
      text: "Great experience renting camera equipment. Very professional service!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike",
      rating: "5.0",
      text: "The car was in perfect condition. Will definitely use again!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emma",
      rating: "4.8",
      text: "Smooth process from start to finish. Highly recommended!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Recent Rental Reviews</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-yellow-500">★ {review.rating}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

