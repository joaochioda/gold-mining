import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { promises as fs } from "fs";

export async function GET() {
  const imagePath = join(process.cwd(), "public", "images", `1.jpg`);

  try {
    const imageBuffer = await fs.readFile(imagePath);
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    return new NextResponse("Image not found", { status: 404 });
  }
}
