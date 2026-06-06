/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const team = await db.teamMember.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, team });
  } catch (error: any) {
    console.error("GET TEAM ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members." },
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
    const { name, role, email, avatar } = body;

    if (!name || !role || !email) {
      return NextResponse.json(
        { success: false, error: "Name, role, and email are required." },
        { status: 400 }
      );
    }

    const member = await db.teamMember.create({
      data: { name, role, email, avatar: avatar || null },
    });

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    console.error("POST TEAM ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create team member." },
      { status: 500 }
    );
  }
}
