import { Suspense } from "react";
import { db } from "@/lib/db";
import CaseStudiesClient from "@/components/admin/CaseStudiesClient";

export const dynamic = "force-dynamic";

async function CaseStudiesData() {
  try {
    const caseStudies = await db.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serialized = caseStudies.map((cs) => ({
      id: cs.id,
      slug: cs.slug,
      client: cs.client,
      title: cs.title,
      category: cs.category,
      service: cs.service,
      featured: cs.featured,
      createdAt: cs.createdAt.toISOString(),
    }));

    return <CaseStudiesClient initialItems={serialized} />;
  } catch (err) {
    console.error("ERROR FETCHING CASE STUDIES:", err);
    return (
      <div className="p-6 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        Failed to load case studies. Check your database connection.
      </div>
    );
  }
}

export default function CaseStudiesAdminPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading case studies...
        </div>
      }
    >
      <CaseStudiesData />
    </Suspense>
  );
}
