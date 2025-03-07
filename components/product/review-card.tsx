'use client'
import { fetchUserById } from "@/lib/features/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Review } from "@/types/reviewTypes";
import { Star } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ReviewCardProps {
  review: Review;
  name: string;
}

function ReviewCard({ review, name }: ReviewCardProps) {

  const dispatch: AppDispatch = useDispatch();
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser );
  
  useEffect(() => {
    dispatch(fetchUserById(review.reviewerId));
  }, [dispatch, review]);

  return (
    <>
      <div className="border rounded-lg p-4 space-y-2 my-3">
        <div className="font-medium">{selectedUser?.firstName}</div>
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
