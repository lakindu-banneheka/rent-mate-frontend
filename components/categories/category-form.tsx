'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Category } from "@/types/categoryTypes"
import { ImageUpload } from "../image/image-upload"
import { AppDispatch, RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { createCategory, deleteCategory, updateCategory } from "@/lib/features/categorySlice"
import { useToast } from "@/hooks/use-toast"

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
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false)
    const [s3ImgUrl, setS3ImgUrl] = useState<string | null>(null)
    const dispatch: AppDispatch = useDispatch();
    const error = useSelector((state: RootState) => state.category.error);


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

    const image = watch("image");

    console.log(image, '- image,, ', s3ImgUrl, ' s3ImgUrl');
    useEffect(() => {
        if(s3ImgUrl){
            setValue("image", s3ImgUrl, { shouldValidate: true })
        }
    },[s3ImgUrl])

    const onSubmit = async (data: FormData) => {

        // Here you would typically:
        // 1. Upload the image to your storage service
        // 2. Get the URL back
        // 3. Save the category with the image URL
        // const imageUrl = "";
        console.log(data)
        try {
            setIsLoading(true)
            if(s3ImgUrl){
                if (category) {
                    const categoryData: Category = {
                        id: category ? category.id : "",
                        name: data.name,
                        description: data.description,
                        imageUrl: s3ImgUrl,
                        itemCount: category ? category.itemCount : 0,
                        createdAt: category ? category.createdAt : new Date(),
                        updatedAt: new Date()
                    }
                    await dispatch(updateCategory(categoryData));
                } else {
                    const categoryData = {
                        name: data.name,
                        description: data.description,
                        imageUrl: s3ImgUrl,
                        itemCount: 0
        
                    }
                    await dispatch(createCategory(categoryData));
                }
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Image is required"
                });
            }

            if (error) {
                toast({
                    variant: "destructive",
                    title: `Error ${category ? 'updating' : 'creating'} category`,
                    description: error
                });
            } else {
                toast({
                    variant: "default",
                    title: "Success",
                    description: `Category ${category ? 'updated' : 'created'} successfully`
                });
                router.push("/admin/categories")
                router.refresh()
            }
            
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                title: "Unexpected error",
                description: `Failed to ${category ? 'update' : 'create'} category`
            });
        } finally {
            setIsLoading(false)
        }
    }

    const onRemove = () => {
        setValue("image", "", { shouldValidate: true })
    }

    const handleDeleteCategory = async (id: string) => {
        try {
            setIsLoading(true);
            const result = await dispatch(deleteCategory(id));
            
            if (error) {
                toast({
                    variant: "destructive",
                    title: "Error deleting category",
                    description: result.payload as string
                });
            } else {
                toast({
                    title: "Success",
                    description: "Category deleted successfully"
                });
                router.push("/admin/categories")
                router.refresh()
            }
            
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                title: "Unexpected error",
                description: "Failed to delete category"
            });
        } finally {
            setIsLoading(false)
        }
    };

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
                            onChange={(url) => setS3ImgUrl(url)}
                            onRemove={onRemove}
                            s3ImgUrl={s3ImgUrl}
                            // maxImages={1}
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
                        {category && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => handleDeleteCategory(category.id)}
                                disabled={isLoading}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

