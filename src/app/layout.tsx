import type { Metadata } from "next";
import { Montserrat, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Chatbot from "@/components/public/Chatbot";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alphadigify.com"),
  title: {
    template: "%s | Alphadigify",
    default: "Alphadigify | Driving Revenue & Scaling Brands",
  },
  description: "We are a top digital agency driving revenue and scaling brands. Explore our innovative marketing solutions, client portfolio growth, and live performance metrics.",
  keywords: ["Digital Marketing", "Agency", "Scaling Brands", "Revenue", "Performance Metrics", "Conversion Rate", "Market Growth"],
  authors: [{ name: "Alphadigify Team" }],
  openGraph: {
    title: "Alphadigify | Driving Revenue & Scaling Brands",
    description: "Digital Agency specialized in Conversion Rate, Ad Spend Optimization, and Market Growth.",
    url: "https://www.alphadigify.com",
    siteName: "Alphadigify",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alphadigify Marketing Dashboard Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alphadigify | Digital Agency",
    description: "We are a top digital agency driving revenue and scaling brands.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${greatVibes.variable} font-sans antialiased overflow-x-hidden min-h-screen dark:bg-gradient-to-br dark:from-[#0c0c16] dark:via-[#10101c] dark:to-[#090911] bg-gradient-to-br from-slate-100 via-gray-50 to-white transition-colors duration-500`}>
        <ThemeProvider>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
