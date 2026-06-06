import TikTokServicePage from "@/components/public/TikTokServicePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";

export const metadata = {
  title: "TikTok Shop Management | Alphadigify",
  description: "End-to-end TikTok Shop management, affiliate networking, short video production, and live streaming services.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#121212] flex flex-col">
      <Navbar />
      <TikTokServicePage />
      <Footer />
    </main>
  );
}
