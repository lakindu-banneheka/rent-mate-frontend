import React from 'react';
import Image, { StaticImageData } from 'next/image';

const LifestyleImageGrid = ({ images }: {images: StaticImageData[]}) => {
  // Make sure we have enough images, or use placeholders
  const safeImages = images?.length >= 7 
    ? images 
    : Array(7).fill('/placeholder.jpg');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-12 gap-4">
        {/* Left column - 1/3 width */}
        <div className="col-span-12 sm:col-span-4 flex flex-col gap-4">
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[0]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[4]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>

        {/* Middle column - 1/3 width */}
        <div className="col-span-12 sm:col-span-4 flex flex-col gap-4">
          <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[1]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative w-full h-64 sm:h-56 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[5]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>

        {/* Right column - 1/3 width */}
        <div className="col-span-12 sm:col-span-4 flex flex-col gap-4">
          <div className="relative w-full h-64 sm:h-56 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[2]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative w-full h-64 sm:h-64 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[3]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden">
            <Image 
              src={safeImages[6]} 
              alt="Lifestyle image" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleImageGrid;