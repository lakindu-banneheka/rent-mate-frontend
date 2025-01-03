import { NextRequest, NextResponse } from "next/server";
import { deleteFromS3, uploadToS3 } from "@/utils/s3";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    const url = await uploadToS3(buffer, fileName);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: "Request body is null" }, { status: 400 });
  }
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    await deleteFromS3(url);
    return NextResponse.json({});
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
}