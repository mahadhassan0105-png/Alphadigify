import { Suspense } from "react";
import { db } from "@/lib/db";
import InvoicesClient from "@/components/admin/InvoicesClient";

export const dynamic = "force-dynamic";

async function InvoicesData() {
  try {
    const [invoices, clients, projects] = await Promise.all([
      db.invoice.findMany({
        orderBy: { createdAt: "desc" },
        include: { 
          client: { select: { id: true, name: true, company: true } },
          project: { select: { id: true, clientId: true, title: true } }
        }
      }),
      db.client.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, company: true },
      }),
      db.project.findMany({
        orderBy: { title: "asc" },
        select: { id: true, clientId: true, title: true },
      })
    ]);

    const serializedInvoices = invoices.map((inv) => ({
      id: inv.id,
      clientId: inv.clientId,
      client: {
        id: inv.client.id,
        name: inv.client.name,
        company: inv.client.company
      },
      projectId: inv.projectId,
      project: inv.project ? {
        id: inv.project.id,
        clientId: inv.project.clientId,
        title: inv.project.title
      } : null,
      amount: inv.amount,
      currency: inv.currency,
      status: inv.status,
      dueDate: inv.dueDate.toISOString(),
      paidAt: inv.paidAt ? inv.paidAt.toISOString() : null,
      notes: inv.notes,
      createdAt: inv.createdAt.toISOString()
    }));

    const serializedClients = clients.map((c) => ({
      id: c.id,
      name: c.name,
      company: c.company,
    }));

    const serializedProjects = projects.map((p) => ({
      id: p.id,
      clientId: p.clientId,
      title: p.title,
    }));

    return (
      <InvoicesClient 
        initialItems={serializedInvoices} 
        clients={serializedClients} 
        projects={serializedProjects} 
      />
    );
  } catch (err) {
    console.error("ERROR FETCHING INVOICES:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load invoices. Check your database connection.
      </div>
    );
  }
}

export default function InvoicesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading invoices...
        </div>
      }
    >
      <InvoicesData />
    </Suspense>
  );
}

