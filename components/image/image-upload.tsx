"use client";

import * as React from "react";
import axios from "axios";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  s3ImgUrl: string | null;
  disabled?: boolean;
  onRemove: () => void;
}

export function ImageUpload({
  onChange,
  value,
  disabled,
  onRemove,
  s3ImgUrl,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ url: string }>("/api/upload", formData);
      if (response.data.url) {
        onChange(response.data.url); // Set the S3 image URL as the value
      }
    } catch (error) {
      toast.error("Error uploading image");
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!isMounted) {
    return null;
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
            alt="Uploaded image"
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <div>
          <Input
            type="file"
            accept="image/*"
            disabled={disabled || uploading }
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <Button
            onClick={handleUpload}
            disabled={!file || uploading || (file && s3ImgUrl?true:false)}
            className="mt-2"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
      )}
      <div className="mt-1 text-xs text-muted-foreground">
        Supported formats: PNG, JPG, JPEG. Max file size: 5MB
      </div>
    </div>
  );
}
