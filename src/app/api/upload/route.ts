/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const BUCKET = "portfolio-uploads";

function isValidImageSignature(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return true; // JPEG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return true; // PNG
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return true; // GIF
  if (buffer.length >= 12 &&
      buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return true; // WEBP
  return false;
}

function isValidVideoSignature(buffer: Buffer): boolean {
  if (buffer.length < 8) return false;
  const isMp4 = buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70;
  const isWebm = buffer[0] === 0x1A && buffer[1] === 0x45 && buffer[2] === 0xDF && buffer[3] === 0xA3;
  const isMov = (buffer[4] === 0x6d && buffer[5] === 0x6f && buffer[6] === 0x6f && buffer[7] === 0x76);
  return isMp4 || isWebm || isMov;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: "No files uploaded." }, { status: 400 });
    }

    const uploadedItems = [];

    for (const file of files) {
      if (!file || !(file instanceof File)) continue;

      const mime = file.type;
      let mediaType = "image";

      if (mime.startsWith("image/")) {
        mediaType = "image";
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json({ success: false, error: `Image ${file.name} exceeds 10MB limit.` }, { status: 400 });
        }
      } else if (mime.startsWith("video/")) {
        mediaType = "video";
        if (file.size > 100 * 1024 * 1024) {
          return NextResponse.json({ success: false, error: `Video ${file.name} exceeds 100MB limit.` }, { status: 400 });
        }
      } else {
        return NextResponse.json({ success: false, error: `Unsupported file type: ${mime}` }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      // Validate magic bytes
      if (mediaType === "image" && !isValidImageSignature(buffer)) {
        return NextResponse.json({ success: false, error: `Invalid image signature for ${file.name}.` }, { status: 400 });
      }
      if (mediaType === "video" && !isValidVideoSignature(buffer)) {
        return NextResponse.json({ success: false, error: `Invalid video signature for ${file.name}.` }, { status: 400 });
      }

      // Build unique path
      const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storagePath = `${uniquePrefix}-${sanitizedName}`;

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, buffer, { contentType: mime, upsert: false });

      if (error) {
        console.error("Supabase upload error:", error);
        return NextResponse.json({ success: false, error: `Upload failed: ${error.message}` }, { status: 500 });
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

      // Build default title from filename
      const dotIndex = file.name.lastIndexOf(".");
      const baseName = dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name;
      const defaultTitle = baseName.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      uploadedItems.push({
        url: urlData.publicUrl,
        type: mediaType,
        title: defaultTitle,
      });
    }

    return NextResponse.json({ success: true, uploadedItems });
  } catch (error: any) {
    console.error("UPLOAD API ERROR:", error);
    return NextResponse.json({ success: false, error: "Internal server error during upload." }, { status: 500 });
  }
}
