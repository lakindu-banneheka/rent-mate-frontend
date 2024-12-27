'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
}

export default function ProductGallery() {
  const images: GalleryImage[] = [
    { src: 'https://www-cdn.djiits.com/cms/uploads/ef97699c719414c2138ae8cca2806760.png', alt: 'Drone front view' },
    { src: 'https://survey.crkennedy.com.au/product_image/ts1704863785/raw/DJIFLYCART30/dji-flycart-30-drone--excludes-charger---battery-.jpg', alt: 'Drone side view' },
    { src: 'https://www-cdn.djiits.com/cms/uploads/892e39b4b76dc5a83b267ed12ce69b97.png', alt: 'Drone angle view' },
    { src: 'https://survey.crkennedy.com.au/product_image/ts1704863785/raw/DJIFLYCART30/dji-flycart-30-drone--excludes-charger---battery-.jpg', alt: 'Drone top view' },
  ]

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Image */}
      <div className="relative aspect-square w-full mb-4 bg-white rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
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
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

