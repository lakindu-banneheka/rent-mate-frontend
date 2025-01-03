import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: Buffer, fileName: string): Promise<string> {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: "image/jpeg", // Adjust this based on the file type
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

export async function deleteFromS3(url: string): Promise<void> {
  const fileName = url.split("/").pop()!;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  };

  // @ts-ignore
  await s3Client.send(new DeleteObjectCommand(params));
}