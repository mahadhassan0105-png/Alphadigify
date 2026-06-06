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
    const { clientId, projectId, amount, currency, status, dueDate, paidAt, notes } = body;

    const existing = await db.invoice.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Invoice not found." }, { status: 404 });
    }

    const updated = await db.invoice.update({
      where: { id },
      data: {
        clientId: clientId ?? existing.clientId,
        projectId: projectId !== undefined ? (projectId || null) : existing.projectId,
        amount: amount !== undefined ? parseFloat(amount) : existing.amount,
        currency: currency ?? existing.currency,
        status: status ?? existing.status,
        dueDate: dueDate ? new Date(dueDate) : existing.dueDate,
        paidAt: paidAt !== undefined ? (paidAt ? new Date(paidAt) : null) : existing.paidAt,
        notes: notes !== undefined ? notes : existing.notes,
      },
      include: {
        client: true,
        project: true
      }
    });

    return NextResponse.json({ success: true, invoice: updated });
  } catch (error: any) {
    console.error("PUT INVOICE ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to update invoice." }, { status: 500 });
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
    const existing = await db.invoice.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Invoice not found." }, { status: 404 });
    }

    await db.invoice.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Invoice deleted successfully." });
  } catch (error: any) {
    console.error("DELETE INVOICE ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to delete invoice." }, { status: 500 });
  }
}
