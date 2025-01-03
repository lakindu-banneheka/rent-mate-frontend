'use client'

import { useState, useCallback, useEffect } from "react"
import { Upload, X } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (urls: string[]) => void
  className?: string;
}

export function ImageUpload({ images, onImagesChange, className }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string>(() => images[0] || '');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!images.includes(selectedImage)) {
      setSelectedImage(images[0] || '')
    }
  }, [images])

  const handleUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      const response = await axios.post<{ url: string }>("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: progress
            }))
          }
        }
      })
      
      if (response.data.url) {
        return response.data.url
      }
      return null
    } catch (error) {
      toast.error(`Error uploading ${file.name}`)
      console.error("Error uploading image:", error)
      return null
    }
  }

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setUploading(true)
    const files = Array.from(e.target.files)
    
    try {
      // Upload files simultaneously but track them individually
      const uploadPromises = files.map(file => handleUpload(file))
      const uploadedUrls = await Promise.all(uploadPromises)
      
      // Filter out any failed uploads (null values)
      const successfulUrls = uploadedUrls.filter((url): url is string => url !== null)
      
      if (successfulUrls.length > 0) {
        const updatedImages = [...images, ...successfulUrls]
        onImagesChange(updatedImages)
        // setS3ImgUrls(updatedImages);

        // Select the first new image if nothing is currently selected
        if (!selectedImage) {
          setSelectedImage(successfulUrls[0])
        }

        toast.success(`Successfully uploaded ${successfulUrls.length} image${successfulUrls.length > 1 ? 's' : ''}`)
      }
    } catch (error) {
      toast.error("Failed to upload one or more images")
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
      setUploadProgress({})
    }
  }, [images, onImagesChange, selectedImage])

  const handleImageDelete = useCallback((urlToDelete: string) => {
    const updatedImages = images.filter(url => url !== urlToDelete)
    onImagesChange(updatedImages)

    setDeleting(true);
    axios.delete("/api/delete", { data: { url: urlToDelete } })
      .then(() => {
        toast.success("Image deleted successfully");
        if (selectedImage === urlToDelete) {
          setSelectedImage(updatedImages[0] || '');
        }
      })
      .catch((error) => {
      toast.error("Failed to delete image")
      console.error("Delete error:", error)
      })
      .finally(() => {
        setDeleting(false);
      });
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
              {url === selectedImage && deleting && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Deleting...</span>
                </div>
              )}
              {!deleting && (
                <>
                  <Image
                    src={url}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </>
              )}
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
              disabled={deleting && selectedImage === url}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Upload button */}
        <label className="aspect-square relative rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer transition-colors">
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-xs text-center">
              {uploading ? "Uploading..." : "Add Image"}
            </span>
            {uploading && Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename} className="w-full px-2 mt-1">
                <div className="h-1 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-primary rounded" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}