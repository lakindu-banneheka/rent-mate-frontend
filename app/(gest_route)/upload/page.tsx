"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/image/img-upload";

export default function Home() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUploadSuccess = (url: string) => {
    setUploadedImageUrl(url);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload Example</h1>
      <ImageUpload onUploadSuccess={handleUploadSuccess} />
      {uploadedImageUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
          <img src={uploadedImageUrl} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
}

