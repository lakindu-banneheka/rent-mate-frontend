export interface UploadResponse {
    url: string;
  }
  
export interface ImageUploadProps {
    onUploadSuccess?: (url: string) => void;
}
  
  