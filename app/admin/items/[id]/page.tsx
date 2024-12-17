"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EditableField } from "@/components/editable-field"
import { PricingEditor } from "@/components/pricing-editor"
import { DeliveryOptionsEditor } from "@/components/delivery-options-editor"
import { Item } from "@/types/itemTypes"
import { sampleItemData } from "@/data/sample-data/items"
import { sampleCategories } from "@/data/sample-data/categories"
import EditableFormFieldInput from "@/components/editable-form-fields/editable-input"
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3, {
      message: "The inventory name must be at least 3 characters long.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;


export default function ItemDetails() {

    const item = sampleItemData[0];
    const categories = sampleCategories
  const [selectedImage, setSelectedImage] = useState(item.imageUrls[0])

  const handleUpdate = async (field: keyof Item, value: any) => {
    // Implement your update logic here
    console.log("Updating", field, "with value:", value)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{item.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete Item</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedImage}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {item.imageUrls.map((url) => (
                <button
                  key={url}
                  onClick={() => setSelectedImage(url)}
                  className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                    url === selectedImage
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image src={url} alt={item.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <EditableField
            label="Name"
            value={item.name}
            onUpdate={(value) => handleUpdate("name", value)}
          />
          {/* <EditableFormFieldInput<FormSchemaType>
            control={}
            label=""
            name=""
            placeholder=""            
          /> */}

          <EditableField
            label="Category"
            value={item.categoryId}
            type="select"
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            onUpdate={(value) => handleUpdate("categoryId", value)}
          />

          <EditableField
            label="Description"
            value={item.description}
            type="textarea"
            onUpdate={(value) => handleUpdate("description", value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label="Total Quantity"
              value={item.totalQuantity}
              type="number"
              onUpdate={(value) => handleUpdate("totalQuantity", value)}
            />
            <EditableField
              label="Available Quantity"
              value={item.availableQuantity}
              type="number"
              onUpdate={(value) => handleUpdate("availableQuantity", value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="pricing" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <PricingEditor
                pricing={item.pricing}
                onUpdate={(value) => handleUpdate("pricing", value)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="delivery" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <DeliveryOptionsEditor
                deliveryOptions={item.deliveryOptions}
                onUpdate={(value) => handleUpdate("deliveryOptions", value)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardContent className="p-6">Orders content coming soon...</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardContent className="p-6">
              History content coming soon...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

