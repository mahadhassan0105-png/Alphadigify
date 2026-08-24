import ReviewsClient from "@/components/services/reviews/ReviewsClient";

export const metadata = {
  title: "Reviews Management | AlphaDigify",
  description:
    "93% of buyers read reviews before purchasing. AlphaDigify engineers a relentless flow of authentic 5-star reviews across Amazon, Walmart, eBay, TikTok Shop, and Google — and protects your rating like a fortress.",
};

export default function ReviewsManagementPage() {
  return <ReviewsClient />;
}
