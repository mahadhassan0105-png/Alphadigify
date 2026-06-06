import { Suspense } from "react";
import { db } from "@/lib/db";
import TestimonialsClient from "@/components/admin/TestimonialsClient";

export const dynamic = "force-dynamic";

async function TestimonialsData() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: "asc" },
    });

    const serialized = testimonials.map((t) => ({
      id: t.id,
      quote: t.quote,
      name: t.name,
      role: t.role,
      initials: t.initials,
      avatarBg: t.avatarBg,
      service: t.service,
      dotColor: t.dotColor,
      stars: t.stars,
      createdAt: t.createdAt.toISOString(),
    }));

    return <TestimonialsClient initialItems={serialized} />;
  } catch (err) {
    console.error("ERROR FETCHING TESTIMONIALS:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load testimonials. Check your database connection.
      </div>
    );
  }
}

export default function TestimonialsAdminPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading testimonials...
        </div>
      }
    >
      <TestimonialsData />
    </Suspense>
  );
}
