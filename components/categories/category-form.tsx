'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Category } from "@/types/categoryTypes"
import { ImageUpload } from "../image/image-upload"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
})

type FormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: Category
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          name: category.name,
          description: category.description,
          image: category.imageUrl,
        }
      : {
          image: "",
        },
  })

  const image = watch("image")

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      // Here you would typically:
      // 1. Upload the image to your storage service
      // 2. Get the URL back
      // 3. Save the category with the image URL
      console.log(data)
      toast.success(category ? "Category updated" : "Category created")
      router.push("/categories")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onRemove = () => {
    setValue("image", "", { shouldValidate: true })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <ImageUpload
              value={image}
              disabled={isLoading}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
              onRemove={onRemove}
              maxImages={1}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : category ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}