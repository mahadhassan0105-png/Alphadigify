import VideoAdsServicePage from "@/components/public/VideoAdsServicePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";

export const metadata = {
  title: "Video Ads Creation | Alphadigify",
  description: "High-converting, psychologically-driven video advertisements engineered to drastically lower your CPA and skyrocket your ROAS.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0c0c16] flex flex-col">
      <Navbar />
      <VideoAdsServicePage />
      <Footer />
    </main>
  );
}
