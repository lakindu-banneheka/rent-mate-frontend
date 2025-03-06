'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/items/image-upload"
import { PricingEditor } from "@/components/items/pricing-editor"
import { DeliveryOptionsEditor } from "@/components/items/delivery-options-editor"
import { Item, ItemSchema, type ItemFormData } from "@/types/itemTypes"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useParams } from "next/navigation"
import { AppDispatch, RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { fetchCategories } from "@/lib/features/categorySlice"
import { deleteItem, fetchItemById, updateItem } from "@/lib/features/itemSlice"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import RentCard from "@/components/rental-history/rent-card"
import { Rent, RentStatus } from "@/types/rentTypes"
import { sampleRents } from "@/data/sample-data/rents"
import { Review } from "@/types/reviewTypes"
import { Star } from "lucide-react"
import { fetchReviews } from "@/lib/features/reviewSlice"
import { fetchUsers } from "@/lib/features/userSlice"
import ReviewCard from "@/components/product/review-card"
import { fetchRents } from "@/lib/features/rentSlice"

export default function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const item = useSelector((state: RootState) => state.item.selectedItem);
  const categories = useSelector((state: RootState) => state.category.categories );
  const rents = useSelector((state: RootState) => state.rent.rents );
  
  const router = useRouter();
  const toast = useToast();
  
  const reviewsList = useSelector((state: RootState) => state.review);
  const { users } = useSelector((state: RootState) => state.user);
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

    useEffect(() => {
      const loardRentData = async () => {
        dispatch(fetchRents());
      };
  
      loardRentData();
    }, []);


  useEffect(() => {
      dispatch(fetchItemById(id));
  }, []);

  useEffect(() => {
      dispatch(fetchCategories());
  }, []);

  const form = useForm<ItemFormData>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      lenderId: item?.lenderId || "",
      name: "",
      categoryId:  "",
      description: "",
      totalQuantity: 0,
      availableQuantity: 0,
      pricing: [],
      deliveryOptions: [],
      imageUrls: [],
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        lenderId: item.lenderId,
        name: item.name || "",
        categoryId: item.categoryId || "",
        description: item.description || "",
        totalQuantity: item.totalQuantity || 0,
        availableQuantity: item.availableQuantity || 0,
        pricing: item.pricing || [],
        deliveryOptions: item.deliveryOptions || [],
        imageUrls: item.imageUrls || [],
      });
    }
  }, [item, form.reset]);

  useEffect(() => { 
    if (categories.length > 0 && item) {
      form.setValue("categoryId", item?.categoryId);
    }
  }, [categories, item]);
  
  const onSubmit = async (data: ItemFormData) => {
    try {
      setIsLoading(true);
      if(item){
        const updatedItemData: Item = {
          id: item?.id,
          lenderId: item?.lenderId,
          name: data.name,
          categoryId: data.categoryId,
          description: data.description,
          totalQuantity: data.totalQuantity,
          availableQuantity: data.availableQuantity,
          reservedQuantity: item?.reservedQuantity || 0,
          rentedQuantity: item?.rentedQuantity || 0,
          pricing: data.pricing,
          deliveryOptions: data.deliveryOptions,
          imageUrls: data.imageUrls,
          createdAt: item?.createdAt,
          updatedAt: new Date(),
        };

        await dispatch(updateItem(updatedItemData));
        
        toast.toast({
          variant: "default",
          title: "Success",
          description: "Item updated successfully"
        });
  
        // Redirect or refresh the page
        // router.push("/admin/items");
        router.refresh();
      }

    } catch (err) {
      console.error(err);
      toast.toast({
        variant: "destructive",
        title: "Unexpected error",
        description: "Failed to update item"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      if (item) {
      await dispatch(deleteItem(item.id));
      toast.toast({
        variant: "default",
        title: "Success",
        description: "Item deleted successfully"
      });
      router.push("/admin/items");
      router.refresh();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.toast({
      variant: "destructive",
      title: "Unexpected error",
      description: "Failed to delete item"
      });
    } 
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form.formState.isDirty]);

  const getCurrentRentals = (rentals: Rent[]): Rent[] => {
    if(item){
      return rents.filter((rent) => 
        rent.itemId === item.id && 
        (rent.rentStatus?.toLocaleLowerCase() === RentStatus.OUT_FOR_DELIVERY || 
        rent.rentStatus?.toLocaleLowerCase() === RentStatus.PAID || 
        rent.rentStatus?.toLocaleLowerCase() === RentStatus.RESERVED || 
        rent.rentStatus?.toLocaleLowerCase() === RentStatus.WITH_CUSTOMER)
      );
    } else {
      return []
    }
  }

  const getRentalHistories = (rentals: Rent[]): Rent[] => {
    if(item){
      return rents.filter((rent) => 
        rent.itemId === item.id && 
        ( rent.rentStatus?.toLocaleLowerCase() == RentStatus.CANCELED || 
        rent.rentStatus?.toLocaleLowerCase() == RentStatus.RETURNED )
      );
    } else {
      return []
    }
  }

  // reviews
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
    <div className="min-h-screen bg-background text-foreground px-14">
      <div className="container max-w-6xl mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{item?.name || ""}</h1>
        </div>

        <Form {...form}>
          <form id="item-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                {/* <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader> */}
                <CardContent className="pt-8" >
                  <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUpload
                            images={field.value}
                            onImagesChange={field.onChange}
                            // setS3ImgUrls={(urls) => form.setValue('imageUrls',urls)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="lenderId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lender Id</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="totalQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="availableQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="pricing" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="pricing"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <PricingEditor
                              pricing={field.value}
                              onUpdate={async (pricing) => {
                                field.onChange(pricing);
                                return Promise.resolve();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="delivery" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="deliveryOptions"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <DeliveryOptionsEditor
                              deliveryOptions={field.value}
                              onUpdate={async (pricing) => {
                                field.onChange(pricing);
                                return Promise.resolve();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="orders" className="mt-6">
                <div className="space-y-4">
                  {getCurrentRentals(sampleRents).map((rental: Rent) => (
                      <RentCard key={rental.id} rental={rental} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <div className="space-y-4">
                  {getRentalHistories(sampleRents).map((rental: Rent) => (
                      <RentCard key={rental.id} rental={rental} />
                  ))}
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

            <div className="flex flex-col md:flex-row items-center justify-end">
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  form="item-form"
                  variant="default"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' :'Save Changes'}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Item</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        item and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

