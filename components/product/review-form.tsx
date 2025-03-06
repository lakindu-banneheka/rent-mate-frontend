"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback, useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById } from "@/lib/features/itemSlice";
import { createReview } from "@/lib/features/reviewSlice";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const reviewSchema = z.object({
  reviewerId: z.string(),
  itemId: z.string(),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.number().min(1, "Please select a rating").max(5), // 0 - 10 
});

type ReviewForm = z.infer<typeof reviewSchema>;

export default function ReviewForm({
  itemId
}:{
  itemId: string
}) {
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const user = localStorage.getItem('userId');
  const selectedItem = useSelector((state: RootState) => state.item.selectedItem);
  const { error, loading  } = useSelector((state: RootState) => state.review)
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewerId: user??undefined,
      itemId: itemId,
      comment: "",
    },
  });

    useEffect(() => {
      dispatch(fetchItemById(itemId));
    }, [dispatch]);

  const onSubmit = useCallback(
    async (data: ReviewForm) => {
      try {
        // Here you would typically send the data to your API
        await dispatch(createReview(data));

        if(!error){
          toast.toast({
            variant: "default",
            title: "Success",
            description: "Review added successfully"
          });
  
          // Redirect or refresh the page
          router.push("/rent-history");
          router.refresh();
        } else {
          throw new Error("Error Submitting Review")
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        toast.toast({
          variant: "destructive",
          title: "Unexpected error",
          description: "Failed to add review"
        });
      }
    },
    [form]
  );




  const handleStarClick = useCallback(
    (value: number) => {
      form.setValue("rating", value, { shouldValidate: true });
    },
    [form]
  );

  const handleStarHover = useCallback((value: number) => {
    setHoveredStar(value);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {selectedItem?.name || ""}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Rating</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={() => handleStarHover(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoveredStar || field.value)
                              ? "fill-primary stroke-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your review here..."
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
            Add Review
          </Button>
        </form>
      </Form>
    </div>
  );
}
