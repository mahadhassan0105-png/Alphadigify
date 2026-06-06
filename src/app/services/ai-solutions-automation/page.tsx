import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import AIServicePage from "@/components/public/AIServicePage";

export const metadata = {
  title: "AI Solutions & Auto Service | Alphadigify",
  description: "Next-generation artificial intelligence and automation services to scale your business.",
};

export default function AISolutionsRoute() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-[#030712]">
      <Navbar />
      <AIServicePage />
      <Footer />
    </main>
  );
}
