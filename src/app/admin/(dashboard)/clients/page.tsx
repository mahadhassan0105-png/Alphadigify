import { Suspense } from "react";
import { db } from "@/lib/db";
import ClientsClient from "@/components/admin/ClientsClient";

export const dynamic = "force-dynamic";

async function ClientsData() {
  try {
    const clients = await db.client.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { projects: true } } },
    });

    const serialized = clients.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      company: c.company,
      service: c.service,
      status: c.status,
      createdAt: c.createdAt.toISOString(),
      _count: {
        projects: c._count.projects,
      },
    }));

    return <ClientsClient initialItems={serialized} />;
  } catch (err) {
    console.error("ERROR FETCHING CLIENTS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load clients. Check your database connection.
      </div>
    );
  }
}

export default function ClientsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading clients...
        </div>
      }
    >
      <ClientsData />
    </Suspense>
  );
}
