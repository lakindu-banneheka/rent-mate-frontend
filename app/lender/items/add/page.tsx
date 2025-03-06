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
import { AppDispatch, RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCategories } from "@/lib/features/categorySlice"
import { createItem } from "@/lib/features/itemSlice"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CreateItem() {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories );
  const router = useRouter();
  const toast = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  // const [s3ImgUrls, setS3ImgUrls] = useState<string[]>([]);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  },[])

  useEffect(() => {
      dispatch(fetchCategories());
  }, []);

  const form = useForm<ItemFormData>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      totalQuantity: 0,
      availableQuantity: 0,
      pricing:[],
      deliveryOptions: [],
      imageUrls: [],
    },
  })

  const onSubmit = async (data: ItemFormData) => {

      try {
        if(userId){
          const itemData: Omit<Item, "id" | "createdAt" | "updatedAt"> = {
            lenderId: userId,
            name: data.name,
            categoryId: data.categoryId,
            description: data.description,
            totalQuantity: data.totalQuantity,
            availableQuantity: data.totalQuantity,
            reservedQuantity: 0,
            rentedQuantity: 0,
            pricing: data.pricing,
            deliveryOptions: data.deliveryOptions,
            imageUrls: data.imageUrls,
          };

          // Dispatch the create item action
          await dispatch(createItem(itemData));

          toast.toast({
            variant: "default",
            title: "Success",
            description: "Item created successfully"
          });

          // Redirect or refresh the page
          router.push("/lender/items");
          router.refresh();
        } else {
          throw new Error("Login before submitting")
        }
          
      } catch (err) {
          console.error(err);
          toast.toast({
          variant: "destructive",
          title: "Unexpected error",
          description: "Failed to create item"
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

  return (
    <div className="min-h-screen bg-background text-foreground px-14">
      <div className="container max-w-6xl mx-auto py-8 space-y-8">
        

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
                    {/* <FormField
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
                    /> */}

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
                            defaultValue={field.value}
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

                    <div className="grid grid-cols-1 gap-4">
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
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
            </Tabs>
            <div className="flex flex-col md:flex-row items-center justify-end">
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              form="item-form"
              variant="default"
            >
              Create New Item
            </Button>
          </div>
        </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

