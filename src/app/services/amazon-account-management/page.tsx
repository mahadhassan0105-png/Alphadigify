import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import AmazonServicePage from "@/components/public/AmazonServicePage";

export const metadata: Metadata = {
  title: "Amazon Account Management",
  description:
    "End-to-end Amazon Seller Central management — listing optimization, PPC scaling, inventory forecasting, and global marketplace expansion by Alphadigify.",
  openGraph: {
    title: "Amazon Account Management | Alphadigify",
    description:
      "Dominate Amazon with full-spectrum account management. 350+ brands managed, $40M+ revenue generated.",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col">
      <Navbar />
      <AmazonServicePage />
      <Footer />
    </main>
  );
}
