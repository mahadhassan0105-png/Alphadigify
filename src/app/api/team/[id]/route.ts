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
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Team member not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const updated = await db.teamMember.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        role: body.role ?? existing.role,
        email: body.email ?? existing.email,
        avatar: body.avatar !== undefined ? body.avatar : existing.avatar,
      },
    });

    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    console.error("PUT TEAM MEMBER ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update team member." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Team member not found." },
        { status: 404 }
      );
    }

    await db.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Team member deleted." });
  } catch (error: any) {
    console.error("DELETE TEAM MEMBER ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete team member." },
      { status: 500 }
    );
  }
}
