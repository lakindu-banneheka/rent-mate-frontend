import { Review } from "@/types/reviewTypes";
import { Star } from "lucide-react";
import React from "react";

interface ReviewCardProps {
  review: Review;
  name: string;
}

function ReviewCard({ review, name }: ReviewCardProps) {
  return (
    <>
      <div className="border rounded-lg p-4 space-y-2">
        <div className="font-medium">{name}</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? "fill-primary stroke-primary"
                  : "fill-muted stroke-muted-foreground"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{review.comment}</p>
      </div>
    </>
  );
}

export default ReviewCard;
