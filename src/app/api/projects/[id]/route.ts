/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = params;
    const body = await req.json();
    const { clientId, title, service, status, startDate, deadline, notes } = body;

    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }

    const updated = await db.project.update({
      where: { id },
      data: {
        clientId: clientId ?? existing.clientId,
        title: title ?? existing.title,
        service: service ?? existing.service,
        status: status ?? existing.status,
        startDate: startDate ? new Date(startDate) : existing.startDate,
        deadline: deadline !== undefined ? (deadline ? new Date(deadline) : null) : existing.deadline,
        notes: notes !== undefined ? notes : existing.notes,
      },
      include: { client: true }
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    console.error("PUT PROJECT ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = params;
    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }

    // Clean up dependent child invoices first
    await db.invoice.deleteMany({ where: { projectId: id } });

    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Project and all related invoices deleted." });
  } catch (error: any) {
    console.error("DELETE PROJECT ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project." }, { status: 500 });
  }
}
