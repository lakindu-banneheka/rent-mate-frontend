"use client";

import BillingForm from "@/components/payment/billing-details";
import OrderSummary from "@/components/payment/order-summary";
import {
  getNewRentFromLocalStorage,
  updateNewRent,
} from "@/lib/features/rentSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { DeliveryMethod, DeliveryOptions } from "@/types/itemTypes";
import { BillingDetails } from "@/types/rentTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = () => {
  const { newRent } = useSelector((state: RootState) => state.rent);
  const [deliveryOption, setDeliveryOption] = useState<string>("pickup");
  const [deliveryOptionData, setDeliveryOptionData] = useState<DeliveryOptions>(
    {
      cost: 0,
      method: DeliveryMethod.PICKUP,
    }
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewRentFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-x-10 mx-20 my-10 space-y-10 md:space-y-0">
        {/* <div className="w-full"> */}
        <BillingForm />
        {/* </div> */}
        {/* <div className="w-full"> */}
        <OrderSummary
          rentData={newRent}
          setDeliveryOption={setDeliveryOption}
          deliveryOption={deliveryOption}
          setDeliveryOptionData={setDeliveryOptionData}
          deliveryOptionData={deliveryOptionData}
        />
        {/* </div> */}
      </div>
    </>
  );
};
export default CheckoutPage;
