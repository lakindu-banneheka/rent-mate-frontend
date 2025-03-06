"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchReviews } from "@/lib/features/reviewSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Item } from "@/types/itemTypes";
import { Review } from "@/types/reviewTypes";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "./review-card";
import { fetchUsers } from "@/lib/features/userSlice";

interface ProductTabsProps {
  item: Item | null;
}

export default function ProductTabs({ item }: ProductTabsProps) {
  const dispatch: AppDispatch = useDispatch();
  const reviewsList = useSelector((state: RootState) => state.review);

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loardReviews = async () => {
      dispatch(fetchReviews());

      if (reviewsList.error) {
        console.log(reviewsList.error);
      }
    };

    loardReviews();
  }, []);

  useEffect(() => {
    const loardReviewerData = async () => {
      dispatch(fetchUsers());
    };

    loardReviewerData();
  }, []);

  const { users } = useSelector((state: RootState) => state.user);
  // const ReviwerData_error = useSelector((state: RootState) => state.user.error);
  // const ReviwerData_loading = useSelector(
  //   (state: RootState) => state.user.loading
  // );

  const getFilteredReviews = useMemo(() => {
    if (!item) return reviewsList.reviews;
    return reviewsList.reviews.filter((review) => review.itemId === item.id);
  }, [reviewsList.reviews, item]);

  useEffect(() => {
    setReviews(getFilteredReviews);
  }, [getFilteredReviews]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <Tabs defaultValue="description" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>{item?.description ?? ""}</p>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Based on {reviews.length}{" "}
              {reviews.length === 1 ? "Review" : "Reviews"}
            </h3>
            <div className="flex items-baseline gap-4">
              <div className="text-3xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <div>
                <div className="text-sm font-medium">Overall</div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating
                          ? "fill-primary stroke-primary"
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {reviews.length} rating{reviews.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review, index) => {
              const user = users.find((user) => user.id === review.reviewerId);
              const name = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
              return <ReviewCard key={index} review={review} name={name} />;
            })}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
