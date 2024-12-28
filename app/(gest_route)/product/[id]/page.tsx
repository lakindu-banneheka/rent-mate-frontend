"use client";

import ProductGallery from "@/components/product/product-gallery";
import ProductTabs from "@/components/product/product-tabs";
import RentalForm from "@/components/product/rental-form";
import { fetchItemById } from "@/lib/features/itemSlice";
import { calculateRentCost } from "@/lib/rent-cost-calculation";
import { AppDispatch, RootState } from "@/lib/store";
import { addDays } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [itemCost, setItemCost] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const { selectedItem, error, loading } = useSelector(
    (state: RootState) => state.item
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [qty, setQty] = useState("1");

  useEffect(() => {
    const loardItem = async () => {
      dispatch(fetchItemById(id as string));

      if (error) {
        console.log(error);
      }
    };

    loardItem();
  }, [id]);

  useEffect(() => {
    const { costPerItem, totalCost } = calculateRentCost({
      quantity: Number(qty),
      amountPerDay: selectedItem?.pricing[0].amount ?? 0,
      startDate: date?.from ?? new Date(),
      endDate: date?.to ?? addDays(new Date(), 1),
    });
    setItemCost(costPerItem);
    setTotalCost(totalCost);
  }, [qty, date, selectedItem?.pricing]);

  console.log(itemCost, totalCost);

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row space-x-10 justify-center">
          {/* Left column - Product Gallery */}
          <div className="space-y-3 w-[340px] mx-auto lg:mx-0">
            <ProductGallery images={selectedItem?.imageUrls || []} />
          </div>

          {/* Right column - Rental Form */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <RentalForm
              item={selectedItem}
              loading={loading}
              date={date}
              qty={qty}
              setDate={setDate}
              setQty={setQty}
              totalCost={totalCost}
            />
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-8 lg:mt-10">
          <ProductTabs item={selectedItem} />
        </div>
      </div>
    </>
  );
};
export default ProductPage;
