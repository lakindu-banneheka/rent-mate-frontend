'use client'
import ReviewForm from "@/components/product/review-form";
import { useParams } from "next/navigation";

const ReviewPage = () => {

  const { id } = useParams()
  console.log(id)
  return (
    <>
      <ReviewForm 
        itemId={Array.isArray(id) ? id[0] : id}
      />
    </>
  );
};
export default ReviewPage;
