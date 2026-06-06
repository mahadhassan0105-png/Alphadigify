import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Clean existing data
  await prisma.testimonial.deleteMany()
  await prisma.caseStudy.deleteMany()
  await prisma.portfolioItem.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.project.deleteMany()
  await prisma.client.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Admin User
  const password = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@alphadigify.com',
      name: 'Alpha Admin',
      password,
      role: 'admin',
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // 2. Create Team Members
  await prisma.teamMember.createMany({
    data: [
      { name: 'Wasim Akram', role: 'CEO', email: 'wasim@alphadigify.com' },
      { name: 'Sarah Jenkins', role: 'Head of Marketing', email: 'sarah@alphadigify.com' },
      { name: 'David Lee', role: 'Lead Developer', email: 'david@alphadigify.com' }
    ]
  })
  console.log("Created team members")

  // 7. Create Portfolio Items
  // Skip seeding mock portfolio items to keep the public showcase clean
  console.log("Skipping mock portfolio items seeding")

  // 8. Create Case Studies
  await prisma.caseStudy.create({
    data: {
      slug: 'techflow-apparel',
      client: 'TechFlow Apparel',
      title: 'Scaling a D2C Brand to $2M+ in Q4 Revenue',
      category: 'E-Commerce',
      service: 'TikTok Ads & UGC Production',
      timeline: '3 Months (Oct - Dec)',
      industry: 'E-Commerce / Fashion',
      heroImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
      challenge: 'TechFlow was heavily reliant on Meta ads, facing skyrocketing Customer Acquisition Costs (CAC) leading up to the Q4 holiday season. Their creative was fatiguing within 48 hours, and they were unable to profitably acquire new customers. They needed a massive disruption to scale their inventory.',
      solution: 'We pivoted 70% of their top-of-funnel budget to TikTok Ads. Our creative team sourced 15 micro-influencers and produced 45 pieces of authentic, native-looking User Generated Content (UGC). We implemented a rigorous rapid-testing framework to identify winning hooks, and ruthlessly scaled the top 3 variations using TikTok\'s Value-Based Optimization (VBO).',
      metrics: [
        { label: 'Return on Ad Spend', value: '340%', iconName: 'TrendingUp' },
        { label: 'Cost Per Acquisition', value: '-62%', iconName: 'Target' },
        { label: 'Total Revenue Generated', value: '$2.1M', iconName: 'Zap' }
      ],
      results: [
        'Achieved a blended CPA of $12.50 (down from $33 on Meta).',
        'Generated over 4.5 million organic views through TikTok SEO optimization.',
        'Completely sold out their flagship winter collection by December 15th.',
        'Maintained a 3.4x ROAS at $5,000/day ad spend.'
      ],
      featured: true
    }
  })

  await prisma.caseStudy.create({
    data: {
      slug: 'saasify-global',
      client: 'SaaSify Global',
      title: 'Tripling Enterprise Demo Bookings via UX Redesign',
      category: 'B2B SaaS',
      service: 'Web Engineering',
      timeline: '4 Months (Jan - Apr)',
      industry: 'B2B SaaS / Fintech',
      heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
      challenge: 'SaaSify Global had a complex enterprise SaaS product but their legacy landing pages were slow, cluttered, and confusing. Enterprise buyers were dropping off during the signup flow, resulting in an expensive cost-per-lead and a stagnant pipeline of demo bookings.',
      solution: 'We executed a complete UX overhaul, migrating their web architecture to a high-performance Next.js system. We restructured their navigation, integrated interactive product tour embeds, and deployed conversion-optimized psychological landing pages. We also implemented localized subdomains for key target market segments.',
      metrics: [
        { label: 'Demo Bookings', value: '3x Increase', iconName: 'Globe' },
        { label: 'Page Load Speed', value: '-45%', iconName: 'Zap' },
        { label: 'Conversion Rate', value: '+180%', iconName: 'TrendingUp' }
      ],
      results: [
        'Increased organic demo bookings by 300% in the first 90 days.',
        'Improved Google Lighthouse Performance score from 42 to 96.',
        'Reduced user drop-off rate on the sign-up form by 55%.',
        'Integrated HubSpot CRM pipelines dynamically for automated lead routing.'
      ],
      featured: false
    }
  })

  await prisma.caseStudy.create({
    data: {
      slug: 'healthvite',
      client: 'HealthVite',
      title: 'Scaling Amazon FBA Revenue to $2.4M ARR',
      category: 'Healthcare',
      service: 'Amazon FBA',
      timeline: '6 Months',
      industry: 'Healthcare / Supplements',
      heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop',
      challenge: 'HealthVite was struggling to stand out in the ultra-competitive Amazon supplements niche. Despite high-quality products, their listings suffered from low conversions, unoptimized keywords, and inefficient PPC campaigns that ate away all profit margins.',
      solution: 'We redesigned their listing with premium A+ content and custom infographics. We performed extensive keyword harvesting, targeting long-tail high-margin searches, and restructured their PPC campaigns using single-keyword ad groups (SKAGs). Additionally, we optimized their backend search terms and launched a review generation campaign.',
      metrics: [
        { label: 'Annual Run Rate', value: '$2.4M', iconName: 'ShoppingBag' },
        { label: 'Organic Keyword Rank', value: 'Top 3', iconName: 'TrendingUp' },
        { label: 'Advertising COS', value: '-35%', iconName: 'Target' }
      ],
      results: [
        'Reached a consistent $200k/month run rate ($2.4M ARR) within 6 months.',
        'Ranked on Page 1 for over 80 target keyword phrases.',
        'Decreased Advertising Cost of Sales (ACoS) from 48% to 31.2%.',
        'Increased unit conversion rate from 9.4% to 18.2%.'
      ],
      featured: false
    }
  })

  await prisma.caseStudy.create({
    data: {
      slug: 'law-firm',
      client: 'Elite Legal Partners',
      title: 'Dominating Organic Search for High-Value Leads',
      category: 'Local Business',
      service: 'SEO Mastery',
      timeline: '5 Months',
      industry: 'Local Business / Legal',
      heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop',
      challenge: 'Elite Legal Partners wanted to acquire high-net-worth commercial clients but were invisible in local Google searches. Paid Google Ads were costing upwards of $150 per click in their market, making digital client acquisition prohibitively expensive.',
      solution: 'We built a programmatic local SEO engine, creating authoritative location-specific landing pages and long-form thought-leadership content targeting complex legal queries. We ran a strict digital PR campaign to acquire high-quality contextual backlinks from legal portals and university publications.',
      metrics: [
        { label: 'High-Intent Keywords', value: 'Page 1', iconName: 'Search' },
        { label: 'Organic Leads', value: '+240%', iconName: 'TrendingUp' },
        { label: 'Domain Authority', value: '+25', iconName: 'Globe' }
      ],
      results: [
        'Captured #1 ranking for 18 primary high-commercial-intent keywords.',
        'Generated 120+ qualified corporate client leads per month organically.',
        'Reduced dependency on paid ads, saving over $18,000/month in PPC spend.',
        'Boosted website domain authority from 15 to 40.'
      ],
      featured: false
    }
  })

  await prisma.caseStudy.create({
    data: {
      slug: 'stylestore',
      client: 'StyleStore',
      title: 'Clearing Inventory with TikTok Shop & Live Campaigns',
      category: 'E-Commerce',
      service: 'TikTok Shop',
      timeline: '30 Days',
      industry: 'E-Commerce / Apparel',
      heroImage: 'https://images.unsplash.com/photo-1558769132-cb1fac084092?q=80&w=2000&auto=format&fit=crop',
      challenge: 'StyleStore was stuck with $150,000 in excess seasonal fashion inventory that was costing them warehousing fees. Traditional email marketing and social media posts weren\'t converting fast enough to offload the stock before the new season.',
      solution: 'We set up and optimized StyleStore\'s TikTok Shop integration, launching a massive affiliate creator campaign. We shipped samples to 120+ micro-influencers who generated content linked to the shop. We also scheduled and managed a series of daily 4-hour live shopping events with professional hosts.',
      metrics: [
        { label: 'Orders in 30 Days', value: '14,000+', iconName: 'TrendingUp' },
        { label: 'Influencer Collabs', value: '120+', iconName: 'Globe' },
        { label: 'Live Stream Revenue', value: '$180k', iconName: 'ShoppingBag' }
      ],
      results: [
        'Sold over 14,000 products in 30 days, clearing out 95% of excess stock.',
        'Generated $280,000 in total sales, turning a loss-making stock into a profitable launch.',
        'Achieved 22 million total impressions across all affiliate video posts.',
        'Built an active community of 45,000 new TikTok brand followers.'
      ],
      featured: false
    }
  })
  console.log("Created case studies")

  // 9. Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        quote: "AlphaDigify 3x'd our Amazon store revenue in just 60 days. They handled listings, PPC, A+ content — everything. Best agency we've ever worked with.",
        name: "Ahmed Khan",
        role: "Amazon Seller — UAE",
        initials: "AK",
        avatarBg: "linear-gradient(135deg, #00D4FF, #0099CC)",
        service: "Amazon",
        dotColor: "#FF9900",
        stars: 5
      },
      {
        quote: "My Walmart account was suspended for 3 months. AlphaDigify reinstated it in just 5 business days. They literally saved my entire business.",
        name: "Sarah Rahman",
        role: "E-Commerce Owner — UK",
        initials: "SR",
        avatarBg: "linear-gradient(135deg, #7B2FBE, #534AB7)",
        service: "Reinstatement",
        dotColor: "#A78BFA",
        stars: 5
      },
      {
        quote: "Facebook Ads ROAS went from 1.2x to 4.8x in 6 weeks. The team rebuilt every campaign from scratch. Our revenue doubled and costs dropped 62%.",
        name: "Michael Johnson",
        role: "Brand Owner — USA",
        initials: "MJ",
        avatarBg: "linear-gradient(135deg, #EC4899, #BE185D)",
        service: "Facebook Ads",
        dotColor: "#F472B6",
        stars: 5
      },
      {
        quote: "47 keywords on page 1 Google in 4 months. Organic traffic up 820%. We no longer depend on paid ads at all. Game changer.",
        name: "Tariq Ahmed",
        role: "Store Owner — UAE",
        initials: "TA",
        avatarBg: "linear-gradient(135deg, #10B981, #059669)",
        service: "SEO",
        dotColor: "#34D399",
        stars: 5
      },
      {
        quote: "Full brand identity — logo, social kit, pitch deck, packaging — all delivered in 7 days. Every piece was world-class. Our brand looks like a $1M company.",
        name: "Nadia Farooq",
        role: "Startup Founder — UAE",
        initials: "NF",
        avatarBg: "linear-gradient(135deg, #F59E0B, #D97706)",
        service: "Graphic Design",
        dotColor: "#FCD34D",
        stars: 5
      },
      {
        quote: "Section 3 Amazon suspension reversed on the first try. The appeal AlphaDigify wrote was bulletproof. $200K account value saved. Cannot thank them enough.",
        name: "James Lee",
        role: "Amazon Seller — USA",
        initials: "JL",
        avatarBg: "linear-gradient(135deg, #EF4444, #B91C1C)",
        service: "Reinstatement",
        dotColor: "#FCA5A5",
        stars: 5
      },
      {
        quote: "Our Walmart store scaled to $85K/month in 5 months. AlphaDigify's store management is on another level. Every metric improved dramatically.",
        name: "Raza Khan",
        role: "Walmart Seller — Canada",
        initials: "RK",
        avatarBg: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
        service: "Walmart",
        dotColor: "#60A5FA",
        stars: 5
      },
      {
        quote: "Google Ads ROAS went from 1.1x to 3.9x in 8 weeks. Our cost-per-acquisition dropped by 54%. Best marketing investment we've ever made.",
        name: "Priya Sharma",
        role: "D2C Brand — India",
        initials: "PS",
        avatarBg: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
        service: "Google Ads",
        dotColor: "#C4B5FD",
        stars: 5
      }
    ]
  })
  console.log("Created testimonials")

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
