import { Suspense } from "react";
import { db } from "@/lib/db";
import ChatsClient from "@/components/admin/ChatsClient";

export const dynamic = "force-dynamic";

async function ChatsData() {
  try {
    const sessions = await db.chatSession.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const leads = await db.lead.findMany();
    const leadsMap = new Map(leads.map((l) => [l.id, l]));

    const serializedSessions = sessions.map((s) => {
      const linkedLead = s.leadId ? leadsMap.get(s.leadId) : null;
      return {
        id: s.id,
        ipAddress: s.ipAddress,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
        leadId: s.leadId,
        lead: linkedLead
          ? {
              id: linkedLead.id,
              name: linkedLead.name,
              email: linkedLead.email,
              service: linkedLead.service,
              budget: linkedLead.budget || "Not Specified",
              status: linkedLead.status,
            }
          : null,
        messages: s.messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          createdAt: m.createdAt.toISOString(),
        })),
      };
    });

    return <ChatsClient initialSessions={serializedSessions} />;
  } catch (err) {
    console.error("ERROR FETCHING CHAT SESSIONS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load chat sessions. Check your database connection.
      </div>
    );
  }
}

export default function ChatsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading AI conversations...
        </div>
      }
    >
      <ChatsData />
    </Suspense>
  );
}
