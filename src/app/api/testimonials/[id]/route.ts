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
    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const updated = await db.testimonial.update({
      where: { id },
      data: {
        quote: body.quote ?? existing.quote,
        name: body.name ?? existing.name,
        role: body.role ?? existing.role,
        initials: body.initials ?? existing.initials,
        avatarBg: body.avatarBg ?? existing.avatarBg,
        service: body.service ?? existing.service,
        dotColor: body.dotColor ?? existing.dotColor,
        stars: body.stars !== undefined ? body.stars : existing.stars,
      },
    });

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error: any) {
    console.error("PUT TESTIMONIAL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial." },
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
    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Testimonial deleted." });
  } catch (error: any) {
    console.error("DELETE TESTIMONIAL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}
