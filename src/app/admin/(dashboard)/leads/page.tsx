import { Suspense } from "react";
import { db } from "@/lib/db";
import LeadsClient from "@/components/admin/LeadsClient";

export const dynamic = "force-dynamic";

async function LeadsData() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serialized = leads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.phone,
      service: l.service,
      message: l.message,
      budget: l.budget,
      status: l.status,
      createdAt: l.createdAt.toISOString(),
    }));

    return <LeadsClient initialItems={serialized} />;
  } catch (err) {
    console.error("ERROR FETCHING LEADS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load leads. Check your database connection.
      </div>
    );
  }
}

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading leads...
        </div>
      }
    >
      <LeadsData />
    </Suspense>
  );
}

