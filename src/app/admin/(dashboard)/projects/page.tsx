import { Suspense } from "react";
import { db } from "@/lib/db";
import ProjectsClient from "@/components/admin/ProjectsClient";

export const dynamic = "force-dynamic";

async function ProjectsData() {
  try {
    const [projects, clients] = await Promise.all([
      db.project.findMany({
        orderBy: { createdAt: "desc" },
        include: { client: { select: { id: true, name: true, company: true } } },
      }),
      db.client.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, company: true },
      }),
    ]);

    const serializedProjects = projects.map((p) => ({
      id: p.id,
      clientId: p.clientId,
      client: {
        id: p.client.id,
        name: p.client.name,
        company: p.client.company,
      },
      service: p.service,
      title: p.title,
      status: p.status,
      startDate: p.startDate.toISOString(),
      deadline: p.deadline ? p.deadline.toISOString() : null,
      notes: p.notes,
    }));

    const serializedClients = clients.map((c) => ({
      id: c.id,
      name: c.name,
      company: c.company,
    }));

    return <ProjectsClient initialItems={serializedProjects} clients={serializedClients} />;
  } catch (err) {
    console.error("ERROR FETCHING PROJECTS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load projects. Check your database connection.
      </div>
    );
  }
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading projects...
        </div>
      }
    >
      <ProjectsData />
    </Suspense>
  );
}

