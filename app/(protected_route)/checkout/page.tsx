import BillingForm from "@/components/payment/billing-details";
import OrderSummary from "@/components/payment/order-summary";

const CheckoutPage = () => {
  return (
    <>
      <div className="flex flex-row justify-center space-x-10 mx-20 my-10">
        {/* <div className="w-full"> */}
        <BillingForm />
        {/* </div> */}
        {/* <div className="w-full"> */}
        <OrderSummary />
        {/* </div> */}
      </div>
    </>
  );
};
export default CheckoutPage;
