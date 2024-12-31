'use client'

import { useState, useCallback } from "react"
import { Upload, X } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (urls: string[]) => void
  className?: string
}

export function ImageUpload({ images, onImagesChange, className }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string>(() => images[0] || '')

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    // Create object URLs for the new images
    const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
    const updatedImages = [...images, ...newImages]
    onImagesChange(updatedImages)

    // Keep the current selected image if it exists, otherwise select the first new image
    if (!selectedImage && newImages.length > 0) {
      setSelectedImage(newImages[0])
    }
  }, [images, onImagesChange, selectedImage])

  const handleImageDelete = useCallback((urlToDelete: string) => {
    const updatedImages = images.filter(url => url !== urlToDelete)
    onImagesChange(updatedImages)
    
    // If we deleted the selected image, select the first available image
    if (selectedImage === urlToDelete) {
      setSelectedImage(updatedImages[0] || '')
    }
  }, [images, onImagesChange, selectedImage])

  const handleImageSelect = useCallback((url: string) => {
    setSelectedImage(url)
  }, [])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main preview area */}
      <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected product image"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Upload className="h-12 w-12 mb-2" />
            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((url, index) => (
          <div key={url} className="group relative aspect-square">
            <button
              type="button"
              onClick={() => handleImageSelect(url)}
              className={cn(
                "w-full h-full relative rounded-lg overflow-hidden border-2 transition-colors",
                url === selectedImage 
                  ? "border-primary ring-2 ring-primary ring-offset-2" 
                  : "border-muted hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  Image {index + 1}
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleImageDelete(url)}
              className="absolute -top-1.5 -right-1.5 h-6 w-6 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label={`Delete image ${index + 1}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Upload button */}
        <label className="aspect-square relative rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer transition-colors">
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-xs text-center">Add Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  )
}