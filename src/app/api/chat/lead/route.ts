/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, name, email, service, budget, message } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return Response.json({ error: "Please provide a valid name (2-100 characters)." }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (message && (typeof message !== 'string' || message.length > 5000)) {
       return Response.json({ error: "Message is too long (max 5000 characters)." }, { status: 400 });
    }

    // Rate limiting: Prevent spamming from the same email (max 3 per day)
    const recentLeads = await db.lead.count({
      where: {
        email: email,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });

    if (recentLeads >= 3) {
      return Response.json({ error: "You have submitted too many inquiries recently. Please try again later." }, { status: 429 });
    }

    // 1. Create the lead in the Lead table
    const lead = await db.lead.create({
      data: {
        name,
        email,
        service: service || "General Inquiry",
        budget: budget || "Not Specified",
        message: message || "Lead generated via AI Chatbot conversation.",
        status: "New",
      },
    });

    // 2. Link to ChatSession if sessionId is provided
    if (sessionId) {
      const sessionExists = await db.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (sessionExists) {
        await db.chatSession.update({
          where: { id: sessionId },
          data: {
            leadId: lead.id,
          },
        });
      }
    }

    return Response.json({
      success: true,
      leadId: lead.id,
      message: "Lead registered and linked successfully.",
    });
  } catch (err: any) {
    console.error("API /api/chat/lead error:", err);
    return Response.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
