import CaseStudiesPage from "@/components/public/CaseStudiesPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";

export const metadata = {
  title: "Case Studies & Our Work | Alphadigify",
  description: "Explore our high-converting case studies. We engineer growth using data-backed frameworks across Web Design, TikTok Ads, and Amazon FBA.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0c0c16] flex flex-col">
      <Navbar />
      <CaseStudiesPage />
      <Footer />
    </main>
  );
}
