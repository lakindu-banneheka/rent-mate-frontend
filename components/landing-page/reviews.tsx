import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { fetchReviews } from "@/lib/features/reviewSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Reviews() {

  const dispatch: AppDispatch = useDispatch();
  // const reviews = useSelector((state: RootState) => state.review.reviews);
  // const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
  const router = useRouter();

  useEffect(() => {
      const loadReviews = async () => {
          await dispatch(fetchReviews());
      };
      
          loadReviews();
  }, [dispatch]);
  const reviews = [
    {
      name: "Sarah",
      rating: "4.5",
      comment: "Great experience renting camera equipment. Very professional service!",
      // avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike",
      rating: "5.0",
      comment: "The car was in perfect condition. Will definitely use again!",
      // avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emma",
      rating: "4.8",
      comment: "Smooth process from start to finish. Highly recommended!",
      // avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Recent Rental Reviews</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0,3).map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={'review.'} alt={review.comment} />
                    <AvatarFallback>{review.name?.[0] ?? 'A'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-yellow-500">★ {review.rating}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

