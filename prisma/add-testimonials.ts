import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Adding new testimonials...")

  await prisma.testimonial.createMany({
    data: [
      // --- FOREIGN CLIENTS ---
      {
        quote: "AlphaDigify turned our TikTok Shop from zero to $180K GMV in just 45 days. The live streaming strategy they executed was flawless. Every session sold out.",
        name: "Emily Hartwell",
        role: "Founder, Hartwell Beauty — USA",
        initials: "EH",
        avatarBg: "linear-gradient(135deg, #FE2C55, #C4003E)",
        service: "TikTok Shop",
        dotColor: "#FE2C55",
        stars: 5
      },
      {
        quote: "We went from 3 Amazon reviews to 847 in 90 days. Our listing ranking jumped to page 1 for all major keywords. The A+ content completely transformed our conversion rate.",
        name: "Daniel Müller",
        role: "Private Label Seller — Germany",
        initials: "DM",
        avatarBg: "linear-gradient(135deg, #FF9900, #E67700)",
        service: "Amazon",
        dotColor: "#FF9900",
        stars: 5
      },
      {
        quote: "After 3 failed appeals with other agencies, AlphaDigify reinstated our suspended Amazon account in 6 days. Their Plan of Action was incredibly detailed and precise.",
        name: "Sophie Laurent",
        role: "E-Commerce Brand Owner — France",
        initials: "SL",
        avatarBg: "linear-gradient(135deg, #6366F1, #4338CA)",
        service: "Reinstatement",
        dotColor: "#A5B4FC",
        stars: 5
      },
      {
        quote: "Our Google Ads were bleeding money at 0.9x ROAS. In 10 weeks, AlphaDigify rebuilt every campaign and we're now at 4.2x ROAS. The ROI on hiring them is insane.",
        name: "Liam O'Brien",
        role: "Digital Retailer — Ireland",
        initials: "LO",
        avatarBg: "linear-gradient(135deg, #4285F4, #1A56DB)",
        service: "Google Ads",
        dotColor: "#93C5FD",
        stars: 5
      },
      {
        quote: "AlphaDigify managed our entire Amazon FBA operation for 8 months. Revenue scaled from $30K to $210K/month. They're not just an agency — they're a true growth partner.",
        name: "Javier Torres",
        role: "Amazon FBA Seller — Spain",
        initials: "JT",
        avatarBg: "linear-gradient(135deg, #10B981, #047857)",
        service: "Amazon",
        dotColor: "#6EE7B7",
        stars: 5
      },
      {
        quote: "The website they built for us is absolutely stunning. PageSpeed went to 98, bounce rate dropped 40%, and demo bookings tripled in the first month. Worth every penny.",
        name: "Charlotte Davies",
        role: "SaaS Startup CEO — Australia",
        initials: "CD",
        avatarBg: "linear-gradient(135deg, #14B8A6, #0F766E)",
        service: "Web Development",
        dotColor: "#5EEAD4",
        stars: 5
      },
      {
        quote: "We hired AlphaDigify for social media management and they grew our Instagram from 4K to 62K followers in 5 months. Engagement rate is through the roof.",
        name: "Ava Thompson",
        role: "Fashion Brand Owner — Canada",
        initials: "AT",
        avatarBg: "linear-gradient(135deg, #EC4899, #9D174D)",
        service: "Social Media",
        dotColor: "#F9A8D4",
        stars: 5
      },
      {
        quote: "Organic traffic increased 1,100% in 6 months. We rank #1 for 31 commercial keywords in our niche. AlphaDigify's SEO team is the real deal — not just promises.",
        name: "Noah Jensen",
        role: "D2C Brand — Denmark",
        initials: "NJ",
        avatarBg: "linear-gradient(135deg, #8B5CF6, #5B21B6)",
        service: "SEO",
        dotColor: "#C4B5FD",
        stars: 5
      },
      {
        quote: "Their video ads team produced 12 creatives that absolutely dominated TikTok. One video alone got 8.3 million views organically and drove $95K in direct sales.",
        name: "Marcus Williams",
        role: "Brand Owner — USA",
        initials: "MW",
        avatarBg: "linear-gradient(135deg, #F59E0B, #B45309)",
        service: "Video Ads",
        dotColor: "#FDE68A",
        stars: 5
      },
      {
        quote: "Affiliate creator program was set up in 2 weeks. By month 2, we had 200+ creators driving consistent daily sales. AlphaDigify's TikTok network is unmatched.",
        name: "Yuki Tanaka",
        role: "TikTok Shop Seller — Japan",
        initials: "YT",
        avatarBg: "linear-gradient(135deg, #25F4EE, #0891B2)",
        service: "TikTok Shop",
        dotColor: "#25F4EE",
        stars: 5
      },
      // --- PAKISTANI CLIENTS ---
      {
        quote: "AlphaDigify نے ہمارے Amazon store کو 3 گنا grow کیا۔ ان کی team نے listings، PPC اور A+ content سب کچھ سنبھالا۔ Pakistan میں ایسی professional agency ملنا مشکل ہے۔",
        name: "Bilal Chaudhry",
        role: "Amazon Seller — Lahore, Pakistan",
        initials: "BC",
        avatarBg: "linear-gradient(135deg, #22C55E, #15803D)",
        service: "Amazon",
        dotColor: "#86EFAC",
        stars: 5
      },
      {
        quote: "Our e-commerce brand was struggling with brand identity. AlphaDigify delivered a complete brand kit — logo, packaging, social media templates — in just one week. The quality is world class.",
        name: "Sana Mirza",
        role: "Clothing Brand Owner — Karachi, Pakistan",
        initials: "SM",
        avatarBg: "linear-gradient(135deg, #E879F9, #A21CAF)",
        service: "Graphic Design",
        dotColor: "#F0ABFC",
        stars: 5
      }
    ]
  })

  console.log("✅ Successfully added 12 new testimonials!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
