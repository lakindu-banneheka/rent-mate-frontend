import ProductGallery from "@/components/product/product-gallery";
import ProductTabs from "@/components/product/product-tabs";
import RentalForm from "@/components/product/rental-form";

const ProductPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row space-x-10 justify-center">
          {/* Left column - Product Gallery */}
          <div className="space-y-3 w-[340px] mx-auto lg:mx-0">
            <ProductGallery />
          </div>

          {/* Right column - Rental Form */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <RentalForm />
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-8 lg:mt-10">
          <ProductTabs />
        </div>
      </div>
    </>
  );
};
export default ProductPage;
