'use client'

import * as React from "react"
import Image from "next/image"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
  disabled?: boolean
  onRemove: () => void
  // maxImages?: number
}

export function ImageUpload({
  onChange,
  value,
  disabled,
  onRemove,
  // maxImages = 1
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <Label>Image</Label>
      {value ? (
        <div className="relative h-[200px] w-[200px]">
          <div className="absolute right-2 top-2 z-10">
            <Button
              type="button"
              onClick={onRemove}
              variant="destructive"
              size="icon"
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Image
            fill
            src={value}
            alt="Category image"
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <Input
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={handleUpload}
          className="cursor-pointer"
        />
      )}
      <div className="mt-1 text-xs text-muted-foreground">
        Supported formats: PNG, JPG, JPEG. Max file size: 5MB
      </div>
    </div>
  )
}

