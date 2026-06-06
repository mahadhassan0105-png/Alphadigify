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
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const existing = await db.chatSession.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Chat session not found." },
        { status: 404 }
      );
    }

    // Delete chat session. Cascade delete is configured on the database level via Prisma schema
    await db.chatSession.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Chat session and cascading messages successfully deleted.",
    });
  } catch (error: any) {
    console.error("DELETE CHAT SESSION ERROR:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete chat session." },
      { status: 500 }
    );
  }
}
