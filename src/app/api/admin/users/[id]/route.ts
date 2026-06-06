/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const targetId = params.id;
    const currentUserId = session.user.id;

    // Safeguard: Prevent self-deletion
    if (targetId === currentUserId) {
      return NextResponse.json({ success: false, error: "Access denied. You cannot revoke your own administrator account." }, { status: 403 });
    }

    const existing = await db.user.findUnique({ where: { id: targetId } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Administrator account not found." }, { status: 404 });
    }

    // Double Safeguard: Ensure we don't accidentally leave the system with ZERO users
    const adminCount = await db.user.count();
    if (adminCount <= 1) {
      return NextResponse.json({ success: false, error: "Forbidden. System must retain at least one administrator account." }, { status: 400 });
    }

    await db.user.delete({ where: { id: targetId } });

    return NextResponse.json({ success: true, message: "Administrator access revoked successfully." });
  } catch (error: any) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to revoke administrator access." }, { status: 500 });
  }
}
