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

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing item ID." },
        { status: 400 }
      );
    }

    await db.portfolioItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Item deleted successfully." });
  } catch (error: any) {
    console.error("DELETE PORTFOLIO ITEM ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete portfolio item." },
      { status: 500 }
    );
  }
}
