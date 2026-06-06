import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let settings = await db.companySettings.findUnique({
      where: { id: "global" }
    });

    if (!settings) {
      settings = {
        id: "global",
        email: "strategy@alphadigify.com",
        phone: null,
        location: "Islamabad, Pakistan & Global Remote",
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null,
        updatedAt: new Date(),
      };
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    return NextResponse.json({
      success: false,
      settings: {
        email: "strategy@alphadigify.com",
        location: "Islamabad, Pakistan & Global Remote",
      }
    });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { email, phone, location, facebook, twitter, instagram, linkedin } = body;

    const settings = await db.companySettings.upsert({
      where: { id: "global" },
      update: { email, phone: phone || null, location, facebook: facebook || null, twitter: twitter || null, instagram: instagram || null, linkedin: linkedin || null },
      create: { id: "global", email, phone: phone || null, location, facebook: facebook || null, twitter: twitter || null, instagram: instagram || null, linkedin: linkedin || null },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("PUT SETTINGS ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to save settings." }, { status: 500 });
  }
}
