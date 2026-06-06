/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    console.error("GET TESTIMONIALS ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { quote, name, role, initials, avatarBg, service, dotColor, stars } = body;

    if (!quote || !name || !role || !initials || !service) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const testimonial = await db.testimonial.create({
      data: {
        quote,
        name,
        role,
        initials,
        avatarBg: avatarBg || "linear-gradient(135deg, #3B82F6, #1D4ED8)",
        service,
        dotColor: dotColor || "#60A5FA",
        stars: stars ?? 5,
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    console.error("POST TESTIMONIAL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}
