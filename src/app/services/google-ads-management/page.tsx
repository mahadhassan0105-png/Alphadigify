import GoogleAdsClient from "@/components/services/google-ads/GoogleAdsClient";

export const metadata = {
  title: "Google Ads Management | AlphaDigify",
  description:
    "Stop burning ad budget. AlphaDigify engineers high-ROAS Google Ads campaigns — Search, Shopping, PMax, and Remarketing — that turn every dollar into predictable revenue.",
};

export default function GoogleAdsManagementRoute() {
  return (
    <>
      <GoogleAdsClient />
    </>
  );
}
