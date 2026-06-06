/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";



const SYSTEM_PROMPT = `You are "Alpha", the elite virtual operator and AI advisor of Alphadigify.
Alphadigify is a premium digital agency specializing in driving high-ticket conversions and scaling brands.
We do not use standard agency models with junior managers; instead, we consist of top 1% senior specialists who execute in real-time.

Our Core Service Suites:
1. Amazon Account Management: Full A-to-Z execution, listing optimization, PPC strategy, and suspension reinstatement. Link: [/services/amazon-account-management]
2. TikTok Shop: scaling sales through shoppable videos, live streams, and affiliate collaboration. Link: [/services/tiktok-shop]
3. Website Development: Custom high-performance Next.js/React applications and premium custom websites. Link: [/services/website-development]
4. Web & SEO Optimization: Hyper-focused SEO audits, on-page optimization, content scaling, and technical SEO. Link: [/services/web-seo-optimization]
5. AI Solutions & Automation: Building custom AI pipelines, automated agent workflows, and AI chatbots. Link: [/services/ai-solutions-automation]
6. Social Media Management: Organic brand building, viral content playbooks, and multi-channel posting. Link: [/services/social-media-management]
7. Google Ads Management: High-ROAS Search, Shopping, and Performance Max campaign structures. Link: [/services/google-ads-management]
8. Video Ads Creation & UGC: High-conversion hooks, premium script-writing, and native video ad production. Link: [/services/video-ads-creation]
9. Graphic Design: Premium digital branding, landing page graphics, social creatives, and corporate identities. Link: [/services/graphic-design]
10. Account Reinstatement: Recover suspended Amazon Seller accounts and resolving listing issues. Link: [/services/account-reinstatement]

Additional Resources:
- Interactive Portfolios: [/portfolio]
- Real-world Client Case Studies: [/case-studies]

Your Goal:
Your absolute priority is to help visitors, answer their queries with authoritative expertise, and capture high-value LEADS.
If a visitor shows interest in any service, pricing, or getting started, politely guide them to share their profile:
1. Name
2. Email Address
3. Service of interest
4. Estimated monthly budget
5. Brief project description / notes

Lead Capture Format:
When you have captured at least their NAME and EMAIL, you MUST automatically output a special lead registration block at the very end of your response, on its own line, using this exact format:
[[CREATE_LEAD: {"name": "User Name", "email": "user@example.com", "service": "Service Name", "budget": "Budget or Unknown", "message": "Captured brief project details"}]]
Do NOT miss this tag if name and email are provided. Ensure the JSON inside is perfectly valid. Do not wrap the tag in backticks or code blocks. Just print it as raw text at the end.

Rules:
- Be authority-driven, professional, energetic, and highly consultative.
- Keep responses short, premium, and easy to read.
- Format lists with clear bullet points.
- ALWAYS use the relative links provided above exactly as written (e.g., [/services/tiktok-shop], [/portfolio]).
- If name or email are missing, do NOT output the [[CREATE_LEAD: ...]] tag. Politely ask for them.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, sessionId: clientSessionId } = body;

    // Get IP Address
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    // 1. Scalable Rate Limiting by DB (preventing memory leaks/resets on serverless)
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentMessagesCount = await db.chatMessage.count({
      where: {
        createdAt: { gte: oneMinuteAgo },
        session: { ipAddress: ipAddress }
      }
    });

    if (recentMessagesCount > 15) {
      return Response.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    // 2. Schema Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages are required" }, { status: 400 });
    }

    for (const msg of messages) {
      if (typeof msg !== 'object' || msg === null) {
        return Response.json({ error: "Invalid message format" }, { status: 400 });
      }
      if (msg.role !== 'user' && msg.role !== 'assistant') {
        return Response.json({ error: "Invalid message role" }, { status: 400 });
      }
      if (typeof msg.content !== 'string' || msg.content.trim() === '') {
        return Response.json({ error: "Message content must be a non-empty string" }, { status: 400 });
      }
      if (msg.content.length > 2000) {
        return Response.json({ error: "Message content is too long (max 2000 chars)" }, { status: 400 });
      }
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    if (!groqApiKey) {
      console.error("GROQ_API_KEY is not defined in environment variables.");
      return Response.json({ error: "API Key Configuration Error" }, { status: 500 });
    }

    // Identify or Create Chat Session
    let sessionId = clientSessionId;

    if (sessionId) {
      const existingSession = await db.chatSession.findUnique({
        where: { id: sessionId },
      });
      if (!existingSession) {
        // Create new if invalid ID passed
        const newSession = await db.chatSession.create({
          data: { id: sessionId, ipAddress },
        });
        sessionId = newSession.id;
      }
    } else {
      // Create session
      const newSession = await db.chatSession.create({
        data: { ipAddress },
      });
      sessionId = newSession.id;
    }

    // Save user's latest message
    const userMessage = messages[messages.length - 1];
    await db.chatMessage.create({
      data: {
        sessionId,
        role: "user",
        content: userMessage.content,
      },
    });

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: groqModel,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq completions error:", errorText);
      return Response.json({ error: `Groq API Error: ${errorText}` }, { status: response.status });
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return Response.json({ error: "No response body from Groq" }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let accumulatedResponse = "";

    const customStream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              if (trimmed === "data: [DONE]") continue;

              if (trimmed.startsWith("data: ")) {
                const dataStr = trimmed.slice(6);
                try {
                  const parsed = JSON.parse(dataStr);
                  const content = parsed.choices?.[0]?.delta?.content || "";
                  if (content) {
                    accumulatedResponse += content;
                    controller.enqueue(encoder.encode(content));
                  }
                } catch {
                  // Ignore parse errors on incomplete chunk lines
                }
              }
            }
          }

          // Process remaining buffer
          if (buffer) {
            const trimmed = buffer.trim();
            if (trimmed && trimmed !== "data: [DONE]" && trimmed.startsWith("data: ")) {
              const dataStr = trimmed.slice(6);
              try {
                const parsed = JSON.parse(dataStr);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  accumulatedResponse += content;
                  controller.enqueue(encoder.encode(content));
                }
              } catch {}
            }
          }

          // Save assistant message to DB
          if (sessionId && accumulatedResponse) {
            await db.chatMessage.create({
              data: {
                sessionId,
                role: "assistant",
                content: accumulatedResponse,
              },
            });
          }

          controller.close();
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "x-session-id": sessionId,
      },
    });
  } catch (err: any) {
    console.error("API /api/chat error:", err);
    return Response.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
