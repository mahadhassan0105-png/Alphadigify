import { Suspense } from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import SettingsClient from "@/components/admin/SettingsClient";

export const dynamic = "force-dynamic";

async function SettingsData() {
  const session = await auth();

  try {
    // Load active administrators list
    const users = await (db.user as any).findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    // Find current user by id, email, or fall back to primary admin
    let userInDb = null;
    if (session?.user?.id) {
      userInDb = await (db.user as any).findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true, role: true, image: true },
      });
    }

    if (!userInDb && session?.user?.email) {
      userInDb = await (db.user as any).findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true, email: true, role: true, image: true },
      });
    }

    if (!userInDb && users.length > 0) {
      userInDb = users[0];
    }

    const serializedCurrentUser = {
      id: userInDb?.id || session?.user?.id || "admin",
      name: userInDb?.name || session?.user?.name || "Admin",
      email: userInDb?.email || session?.user?.email || "info@alphadigify.com",
      role: userInDb?.role || (session?.user as any)?.role || "admin",
      image: userInDb?.image || (session?.user as any)?.image || "",
    };

    const serializedUsers = users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      image: u.image || "",
      createdAt: u.createdAt.toISOString(),
    }));

    return (
      <SettingsClient
        currentUser={serializedCurrentUser}
        initialUsers={serializedUsers}
      />
    );
  } catch (err: any) {
    console.error("ERROR LOAD SETTINGS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load security directory: {err?.message || "Check your database connection."}
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
