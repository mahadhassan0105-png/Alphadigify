import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const invoices = await db.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        client: true,
        project: true
      }
    });

    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error("GET INVOICES ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch invoices." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { clientId, projectId, amount, currency, status, dueDate, paidAt, notes } = body;

    if (!clientId || amount === undefined || !dueDate) {
      return NextResponse.json({ success: false, error: "Missing required fields: clientId, amount, and dueDate." }, { status: 400 });
    }

    const newInvoice = await db.invoice.create({
      data: {
        clientId,
        projectId: projectId || null,
        amount: parseFloat(amount),
        currency: currency || "USD",
        status: status || "Unpaid",
        dueDate: new Date(dueDate),
        paidAt: paidAt ? new Date(paidAt) : null,
        notes: notes || null,
      },
      include: {
        client: true,
        project: true
      }
    });

    return NextResponse.json({ success: true, invoice: newInvoice }, { status: 201 });
  } catch (error) {
    console.error("POST INVOICE ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to create invoice." }, { status: 500 });
  }
}
