/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing case study identifier." },
        { status: 400 }
      );
    }

    // Try finding by id first, then by slug
    let caseStudy = await db.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      caseStudy = await db.caseStudy.findUnique({
        where: { slug: id },
      });
    }

    if (!caseStudy) {
      return NextResponse.json(
        { success: false, error: "Case study not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, caseStudy });
  } catch (error: any) {
    console.error("GET CASE STUDY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch case study." },
      { status: 500 }
    );
  }
}

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
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing case study ID." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      slug,
      client,
      title,
      category,
      service,
      timeline,
      industry,
      heroImage,
      challenge,
      solution,
      metrics,
      results,
      featured,
    } = body;

    // Verify item exists
    const existing = await db.caseStudy.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Case study not found." },
        { status: 404 }
      );
    }

    // If slug is changed, verify new slug uniqueness
    if (slug && slug !== existing.slug) {
      const slugExists = await db.caseStudy.findUnique({
        where: { slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: "A case study with this slug already exists." },
          { status: 400 }
        );
      }
    }

    // If setting as featured, unfeature all other studies
    if (featured) {
      await db.caseStudy.updateMany({
        where: {
          NOT: { id },
          featured: true,
        },
        data: { featured: false },
      });
    }

    const updated = await db.caseStudy.update({
      where: { id },
      data: {
        slug: slug ?? existing.slug,
        client: client ?? existing.client,
        title: title ?? existing.title,
        category: category ?? existing.category,
        service: service ?? existing.service,
        timeline: timeline ?? existing.timeline,
        industry: industry ?? existing.industry,
        heroImage: heroImage ?? existing.heroImage,
        challenge: challenge ?? existing.challenge,
        solution: solution ?? existing.solution,
        metrics: metrics ?? existing.metrics,
        results: results ?? existing.results,
        featured: featured !== undefined ? !!featured : existing.featured,
      },
    });

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error: any) {
    console.error("PUT CASE STUDY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update case study." },
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

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing case study ID." },
        { status: 400 }
      );
    }

    // Verify it exists
    const existing = await db.caseStudy.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Case study not found." },
        { status: 404 }
      );
    }

    await db.caseStudy.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Case study deleted successfully." });
  } catch (error: any) {
    console.error("DELETE CASE STUDY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete case study." },
      { status: 500 }
    );
  }
}
