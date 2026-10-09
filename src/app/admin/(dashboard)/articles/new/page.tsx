import ArticleForm from "@/components/admin/ArticleForm";
import { Newspaper } from "lucide-react";

export const metadata = {
  title: "Write New Article | Admin Dashboard",
};

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-yellow-500" />
          Write New Article
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Craft high-value content, target keywords, and optimize for Google search.
        </p>
      </div>

      <ArticleForm />
    </div>
  );
}
