import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import ServicesGrid from "@/components/public/ServicesGrid";
import StatsCounter from "@/components/public/StatsCounter";
import Testimonials from "@/components/public/Testimonials";
import TeamSnapshot from "@/components/public/TeamSnapshot";
import Footer from "@/components/public/Footer";
import OperationalBlueprint from "@/components/public/OperationalBlueprint";
import BrandsMarquee from "@/components/public/BrandsMarquee";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSlider />
      
      {/* Visual spacer blending into operations */}
      <div className="h-[5vh] dark:bg-[#0c0c16] bg-white w-full relative z-0"></div>

      <div className="relative z-10">
        <StatsCounter />
        <OperationalBlueprint />
        <BrandsMarquee />
        <ServicesGrid />
        <Testimonials />
        <TeamSnapshot />
      </div>

      <Footer />
    </main>
  );
}
