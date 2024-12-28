"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt?: string;
}

export default function ProductGallery({
  images,
  alt = "image",
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Image */}
      <div className="relative aspect-square w-full mb-4 bg-white rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square w-full rounded-lg overflow-hidden border-2",
              selectedImage === index ? "border-primary" : "border-transparent"
            )}
          >
            <Image src={image} alt={alt} fill className="object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
