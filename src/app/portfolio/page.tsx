import PortfolioPage from "@/components/public/PortfolioPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";

export const metadata = {
  title: "Creative Portfolio | Alphadigify",
  description: "A visual gallery of our highest-performing UI designs, brand identities, and video advertisements.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0c0c16] flex flex-col">
      <Navbar />
      <PortfolioPage />
      <Footer />
    </main>
  );
}
