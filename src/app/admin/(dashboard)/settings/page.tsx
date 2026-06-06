import { Suspense } from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/admin/SettingsClient";

export const dynamic = "force-dynamic";

async function SettingsData() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      redirect("/admin/login");
    }

    // Load active administrators list
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const serializedCurrentUser = {
      id: session.user.id,
      name: session.user.name || "",
      email: session.user.email || "",
      role: session.user.role || "admin",
    };

    const serializedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
    }));

    return (
      <SettingsClient
        currentUser={serializedCurrentUser}
        initialUsers={serializedUsers}
      />
    );
  } catch (err) {
    console.error("ERROR LOAD SETTINGS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load security directory. Check your database connection.
      </div>
    );
  }
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading system settings...
        </div>
      }
    >
      <SettingsData />
    </Suspense>
  );
}
