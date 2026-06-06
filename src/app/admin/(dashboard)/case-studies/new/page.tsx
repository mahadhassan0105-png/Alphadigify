import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const dynamic = "force-dynamic";

export default function NewCaseStudyPage() {
  return (
    <div className="min-h-full bg-slate-50 dark:bg-black">
      <CaseStudyForm mode="create" />
    </div>
  );
}
