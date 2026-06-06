import AccountReinstatementClient from "@/components/services/account-reinstatement/AccountReinstatementClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Reinstatement Services | Alphadigify",
  description: "Suspended Google Ads or Amazon account? Don't panic. Our ex-platform insiders and policy experts engineer appeals that get your accounts back online fast.",
};

export default function AccountReinstatementPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        <AccountReinstatementClient />
      </main>
      <Footer />
    </>
  );
}
