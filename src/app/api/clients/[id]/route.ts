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
    const { name, email, phone, company, service, status } = body;

    const existing = await db.client.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Client not found." }, { status: 404 });
    }

    const updated = await db.client.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        email: email ?? existing.email,
        phone: phone !== undefined ? phone : existing.phone,
        company: company !== undefined ? company : existing.company,
        service: service ?? existing.service,
        status: status ?? existing.status,
      },
    });

    return NextResponse.json({ success: true, client: updated });
  } catch (error: any) {
    console.error("PUT CLIENT ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to update client." }, { status: 500 });
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
    const existing = await db.client.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Client not found." }, { status: 404 });
    }

    // Clean up dependent child records to prevent foreign key constraint violations
    await db.invoice.deleteMany({ where: { clientId: id } });
    await db.project.deleteMany({ where: { clientId: id } });

    await db.client.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Client and all related records deleted." });
  } catch (error: any) {
    console.error("DELETE CLIENT ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to delete client." }, { status: 500 });
  }
}
