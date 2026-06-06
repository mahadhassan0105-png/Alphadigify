import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true }
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { clientId, title, service, status, deadline, notes, startDate } = body;

    if (!clientId || !title || !service) {
      return NextResponse.json({ success: false, error: "Missing required fields: clientId, title, and service." }, { status: 400 });
    }

    const newProject = await db.project.create({
      data: {
        clientId,
        title,
        service,
        status: status || "Discovery",
        startDate: startDate ? new Date(startDate) : new Date(),
        deadline: deadline ? new Date(deadline) : null,
        notes: notes || null,
      },
      include: { client: true }
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("POST PROJECT ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to create project." }, { status: 500 });
  }
}
