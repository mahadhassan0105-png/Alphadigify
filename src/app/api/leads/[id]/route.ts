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
    const { status } = body;

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
    }

    const updated = await db.lead.update({
      where: { id },
      data: {
        status: status ?? existing.status,
      },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error("PUT LEAD ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead status." }, { status: 500 });
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
    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
    }

    await db.lead.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Lead inquiry deleted successfully." });
  } catch (error: any) {
    console.error("DELETE LEAD ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead." }, { status: 500 });
  }
}
