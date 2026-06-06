/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

interface EditCaseStudyPageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const caseStudy = await db.caseStudy.findUnique({
    where: { id: params.id },
  });

  if (!caseStudy) {
    notFound();
  }

  // Parse and serialize metrics & other fields
  const serialized = {
    id: caseStudy.id,
    slug: caseStudy.slug,
    client: caseStudy.client,
    title: caseStudy.title,
    category: caseStudy.category,
    service: caseStudy.service,
    timeline: caseStudy.timeline,
    industry: caseStudy.industry,
    heroImage: caseStudy.heroImage,
    challenge: caseStudy.challenge,
    solution: caseStudy.solution,
    metrics: (caseStudy.metrics as any) || [],
    results: caseStudy.results,
    featured: caseStudy.featured,
  };

  return <CaseStudyForm initialData={serialized} mode="edit" />;
}
