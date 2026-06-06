import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: Request) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const clients = await db.client.findMany({
      include: { _count: { select: { projects: true } } }
    });

    return NextResponse.json({ success: true, clients });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch clients." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    
    // In production, validate with Zod
    const newClient = await db.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        status: "Active"
      }
    });

    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create client." }, { status: 500 });
  }
}
