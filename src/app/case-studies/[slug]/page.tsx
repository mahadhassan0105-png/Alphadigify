import CaseStudyDetail from "@/components/public/CaseStudyDetail";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real app, fetch metadata based on slug
  return {
    title: `Case Study: ${params.slug} | Alphadigify`,
    description: "Detailed breakdown of how we engineered growth and scaled revenue for this partner.",
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0c0c16] flex flex-col">
      <Navbar />
      <CaseStudyDetail slug={params.slug} />
      <Footer />
    </main>
  );
}
