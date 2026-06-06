import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("GET LEADS ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads." }, { status: 500 });
  }
}

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  service: z.string(),
  message: z.string().min(10)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    const lead = await db.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
        budget: validatedData.budget,
        status: "New"
      }
    });

    // NOTE: In production, trigger Resend email notification here
    // import { resend } from "@/lib/resend";
    // await resend.emails.send({ ... })

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Lead submission error:", error);
    
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
      return NextResponse.json(
        { success: false, error: `Validation failed: ${errorMessages}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to process lead." },
      { status: 400 }
    );
  }
}
