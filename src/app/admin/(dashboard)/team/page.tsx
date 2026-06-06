import { Suspense } from "react";
import { db } from "@/lib/db";
import TeamClient from "@/components/admin/TeamClient";

export const dynamic = "force-dynamic";

async function TeamData() {
  try {
    const team = await db.teamMember.findMany({
      orderBy: { createdAt: "asc" },
    });

    const serialized = team.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      email: member.email,
      avatar: member.avatar,
      createdAt: member.createdAt.toISOString(),
    }));

    return <TeamClient initialItems={serialized} />;
  } catch (err) {
    console.error("ERROR FETCHING TEAM:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load team members. Check your database connection.
      </div>
    );
  }
}

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading team roster...
        </div>
      }
    >
      <TeamData />
    </Suspense>
  );
}
