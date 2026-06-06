import WebSEOClient from "@/components/services/web-seo/WebSEOClient";

export const metadata = {
  title: "Web SEO Optimization | Alphadigify",
  description: "Advanced technical SEO, link building, and content strategies to drive massive organic traffic to your business.",
};

export default function SeoOptimizationRoute() {
  return (
    <>
      <WebSEOClient />
    </>
  );
}
