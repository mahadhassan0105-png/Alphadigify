/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (category && category !== "All") {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }

    const caseStudies = await db.caseStudy.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, caseStudies });
  } catch (error: any) {
    console.error("GET CASE STUDIES ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch case studies." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    // Validate required fields
    if (
      !slug ||
      !client ||
      !title ||
      !category ||
      !service ||
      !timeline ||
      !industry ||
      !heroImage ||
      !challenge ||
      !solution ||
      !metrics ||
      !results
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existing = await db.caseStudy.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "A case study with this slug already exists." },
        { status: 400 }
      );
    }

    // If setting as featured, optionally unfeature other case studies
    if (featured) {
      await db.caseStudy.updateMany({
        where: { featured: true },
        data: { featured: false },
      });
    }

    const caseStudy = await db.caseStudy.create({
      data: {
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
        featured: !!featured,
      },
    });

    return NextResponse.json({ success: true, caseStudy });
  } catch (error: any) {
    console.error("POST CASE STUDY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create case study." },
      { status: 500 }
    );
  }
}
