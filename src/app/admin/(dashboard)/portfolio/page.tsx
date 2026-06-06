import { Suspense } from "react";
import { db } from "@/lib/db";
import PortfolioClient from "@/components/admin/PortfolioClient";

export const dynamic = "force-dynamic";

async function PortfolioList() {
  try {
    const portfolio = await db.portfolioItem.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serializedItems = portfolio.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return <PortfolioClient initialItems={serializedItems} />;
  } catch (error) {
    console.error("ADMIN PORTFOLIO DATA FETCH ERROR:", error);
    return <div className="p-4 text-red-400">Database connection failed or could not fetch portfolio items.</div>;
  }
}

export default function PortfolioAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 animate-pulse">Loading portfolio assets...</div>}>
      <PortfolioList />
    </Suspense>
  );
}
